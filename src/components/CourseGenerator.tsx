"use client";

import { useState, useRef } from "react";
import { useStream } from "@/hooks/useStream";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizView } from "@/components/QuizView";

export function CourseGenerator() {
  const [prompt, setPrompt] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileIds, setFileIds] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    modules,
    flashcardsByModule,
    quizzesByModule,
    isStreaming,
    error,
    start,
    stop,
  } = useStream();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/ingest", { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setFileIds((prev) => [...prev, data.fileId]);
    } catch {
      setFileName(null);
    } finally {
      setUploading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || isStreaming) return;
    void start({ prompt, fileIds: fileIds.length ? fileIds : undefined });
  }

  const hasOutput = modules.length > 0;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
          What do you want to learn
        </label>
        <Textarea
          rows={4}
          placeholder="e.g. Teach me the fundamentals of distributed systems, with an emphasis on consensus algorithms"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isStreaming}
        />

        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || isStreaming}
          >
            {uploading ? "Uploading…" : "Attach a PDF"}
          </Button>
          {fileName && (
            <span className="font-mono text-xs text-[var(--paper)]/60">
              {fileName}
            </span>
          )}

          <div className="ml-auto flex gap-2">
            {isStreaming && (
              <Button type="button" variant="ghost" size="sm" onClick={stop}>
                Stop
              </Button>
            )}
            <Button type="submit" disabled={!prompt.trim() || isStreaming}>
              {isStreaming ? "Generating…" : "Generate course"}
            </Button>
          </div>
        </div>

        {error && (
          <p className="font-mono text-xs text-red-400">
            Generation stopped: {error}
          </p>
        )}
      </form>

      {(hasOutput || isStreaming) && (
        <div className="flex flex-col gap-6 border-t border-[var(--rule)] pt-8">
          {modules.map((mod) => (
            <div key={mod.index} className="flex gap-4">
              <div className="flex w-10 shrink-0 flex-col items-center">
                <span className="font-mono text-xs text-[var(--accent)]">
                  {String(mod.index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 w-px flex-1 bg-[var(--rule)]" />
              </div>

              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>{mod.title}</CardTitle>
                  <p className="mt-1 text-sm text-[var(--paper)]/70">
                    {mod.summary}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--paper)]/90">
                    {mod.content}
                  </p>

                  {flashcardsByModule[mod.index] && (
                    <FlashcardRow cards={flashcardsByModule[mod.index]} />
                  )}

                  {quizzesByModule[mod.index] && (
                    <QuizView
                      moduleIndex={mod.index}
                      questions={quizzesByModule[mod.index]}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          ))}

          {isStreaming && (
            <div className="flex gap-4">
              <div className="w-10 shrink-0" />
              <p className="font-mono text-xs text-[var(--paper)]/50">
                <span className="animate-pulse">▍</span> drafting next module…
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FlashcardRow({ cards }: { cards: { id: string; front: string; back: string }[] }) {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
        Flashcards
      </span>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {cards.map((card) => {
          const isFlipped = !!flipped[card.id];
          return (
            <button
              key={card.id}
              type="button"
              onClick={() =>
                setFlipped((prev) => ({ ...prev, [card.id]: !prev[card.id] }))
              }
              className="rounded-md border border-[var(--rule)] bg-[var(--ink)] p-4 text-left text-sm text-[var(--paper)] transition-colors hover:border-[var(--accent)]"
            >
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-[var(--paper)]/40">
                {isFlipped ? "Answer" : "Prompt"}
              </span>
              {isFlipped ? card.back : card.front}
            </button>
          );
        })}
      </div>
    </div>
  );
}
