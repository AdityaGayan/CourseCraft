import type { Metadata } from "next";
import { Source_Serif_4, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const displaySerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "CourseCraft",
  description: "Turn a prompt or a PDF into a structured course, with quizzes and flashcards.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${displaySerif.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-[var(--ink)] font-sans text-[var(--paper)] antialiased">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6">
          <header className="flex items-center justify-between border-b border-[var(--rule)] py-6">
            <a href="/" className="font-serif text-lg tracking-tight">
              CourseCraft
            </a>
            <nav className="flex gap-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--paper)]/60">
              <a href="/" className="hover:text-[var(--accent)]">
                New
              </a>
              <a href="/courses" className="hover:text-[var(--accent)]">
                Courses
              </a>
            </nav>
          </header>
          <main className="flex-1 py-12">{children}</main>
          <footer className="border-t border-[var(--rule)] py-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--paper)]/30">
            Generated courses, drafted module by module.
          </footer>
        </div>
      </body>
    </html>
  );
}
