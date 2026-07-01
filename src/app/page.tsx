import { CourseGenerator } from "@/components/CourseGenerator";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-14">
      <section className="flex flex-col gap-4">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
          Prompt to syllabus
        </span>
        <h1 className="max-w-2xl font-serif text-4xl leading-tight text-[var(--paper)] sm:text-5xl">
          Describe what you want to learn. Watch the course write itself.
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--paper)]/60">
          CourseCraft drafts modules, flashcards, and quizzes as it goes —
          grounded in your own PDFs when you attach them, streamed in as soon
          as each piece is ready.
        </p>
      </section>

      <CourseGenerator />
    </div>
  );
}
