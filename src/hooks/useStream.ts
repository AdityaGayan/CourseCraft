"use client";

import { useCallback, useRef, useState } from "react";
import type {
  StreamChunk,
  ModuleSection,
  FlashcardsSection,
  QuizSection,
  GenerateRequestBody,
} from "@/types";

interface UseStreamState {
  modules: ModuleSection[];
  flashcardsByModule: Record<number, FlashcardsSection["cards"]>;
  quizzesByModule: Record<number, QuizSection["questions"]>;
  isStreaming: boolean;
  error: string | null;
  courseId: string | null;
}

const initialState: UseStreamState = {
  modules: [],
  flashcardsByModule: {},
  quizzesByModule: {},
  isStreaming: false,
  error: null,
  courseId: null,
};

/**
 * Abstracts reading + parsing newline-delimited JSON chunks streamed from
 * POST /api/generate. The backend (Person B) writes one JSON object per line
 * as each module/flashcard-set/quiz finishes generating, so the UI can render
 * incrementally instead of waiting for the full course.
 */
export function useStream() {
  const [state, setState] = useState<UseStreamState>(initialState);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const applyChunk = useCallback((chunk: StreamChunk) => {
    setState((prev) => {
      switch (chunk.type) {
        case "module":
          return {
            ...prev,
            modules: [...prev.modules, chunk].sort((a, b) => a.index - b.index),
          };
        case "flashcards":
          return {
            ...prev,
            flashcardsByModule: {
              ...prev.flashcardsByModule,
              [chunk.moduleIndex]: chunk.cards,
            },
          };
        case "quiz":
          return {
            ...prev,
            quizzesByModule: {
              ...prev.quizzesByModule,
              [chunk.moduleIndex]: chunk.questions,
            },
          };
        case "done":
          return { ...prev, isStreaming: false, courseId: chunk.courseId };
        case "error":
          return { ...prev, isStreaming: false, error: chunk.message };
        default:
          return prev;
      }
    });
  }, []);

  const start = useCallback(
    async (body: GenerateRequestBody) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setState({ ...initialState, isStreaming: true });

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error(`Generation failed (${res.status})`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        // The stream is newline-delimited JSON (NDJSON), not strict SSE,
        // so chunks are split on "\n" and any partial line is buffered.
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            try {
              const parsed = JSON.parse(trimmed) as StreamChunk;
              applyChunk(parsed);
            } catch {
              // Skip malformed lines rather than killing the whole stream.
            }
          }
        }

        if (buffer.trim()) {
          try {
            applyChunk(JSON.parse(buffer.trim()) as StreamChunk);
          } catch {
            // ignore trailing partial fragment
          }
        }

        setState((prev) => ({ ...prev, isStreaming: false }));
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setState((prev) => ({
          ...prev,
          isStreaming: false,
          error: err instanceof Error ? err.message : "Something went wrong.",
        }));
      }
    },
    [applyChunk],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setState((prev) => ({ ...prev, isStreaming: false }));
  }, []);

  return { ...state, start, stop, reset };
}
