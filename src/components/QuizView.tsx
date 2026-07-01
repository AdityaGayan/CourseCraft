"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { QuizQuestion, QuizScore } from "@/types";

interface QuizViewProps {
  moduleIndex: number;
  questions: QuizQuestion[];
  onComplete?: (score: QuizScore) => void;
}

export function QuizView({ moduleIndex, questions, onComplete }: QuizViewProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  function selectAnswer(questionId: string, choiceIndex: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
  }

  function handleSubmit() {
    setSubmitted(true);
    const attempts = questions.map((q) => ({
      questionId: q.id,
      selectedIndex: answers[q.id],
      correct: answers[q.id] === q.correctIndex,
    }));
    onComplete?.({
      moduleIndex,
      total: questions.length,
      correct: attempts.filter((a) => a.correct).length,
      attempts,
    });
  }

  const correctCount = questions.filter(
    (q) => answers[q.id] === q.correctIndex,
  ).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
          Quiz
        </span>
        {submitted && (
          <span className="font-mono text-xs text-[var(--paper)]/60">
            {correctCount} / {questions.length} correct
          </span>
        )}
      </div>

      <div className="flex flex-col gap-5">
        {questions.map((q, qi) => (
          <fieldset key={q.id} className="flex flex-col gap-2">
            <legend className="mb-1 text-sm text-[var(--paper)]">
              {qi + 1}. {q.question}
            </legend>
            <div className="flex flex-col gap-2">
              {q.choices.map((choice, ci) => {
                const selected = answers[q.id] === ci;
                const isCorrectChoice = ci === q.correctIndex;
                const showState = submitted && (selected || isCorrectChoice);

                return (
                  <button
                    type="button"
                    key={ci}
                    onClick={() => selectAnswer(q.id, ci)}
                    disabled={submitted}
                    className={cn(
                      "rounded-md border px-3 py-2 text-left text-sm transition-colors",
                      "border-[var(--rule)] text-[var(--paper)]/90",
                      !submitted && selected && "border-[var(--accent)]",
                      !submitted && "hover:border-[var(--accent)]/60",
                      showState && isCorrectChoice && "border-[var(--accent2)] bg-[var(--accent2)]/10",
                      showState && selected && !isCorrectChoice && "border-red-400/70 bg-red-400/10",
                    )}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
            {submitted && q.explanation && (
              <p className="font-mono text-xs leading-relaxed text-[var(--paper)]/50">
                {q.explanation}
              </p>
            )}
          </fieldset>
        ))}
      </div>

      {!submitted && (
        <Button
          type="button"
          size="sm"
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="self-start"
        >
          Check answers
        </Button>
      )}
    </div>
  );
}
