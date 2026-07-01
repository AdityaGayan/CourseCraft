// Shared type contracts between the streaming API (Person B) and the UI (Person A).
// These mirror the structured JSON schema the backend streams section-by-section.

export type StreamSectionType = "module" | "flashcards" | "quiz" | "done" | "error";

export interface ModuleSection {
  type: "module";
  index: number;
  title: string;
  summary: string;
  content: string;
  sourceRefs?: string[]; // PDF chunk references from the RAG pipeline
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface FlashcardsSection {
  type: "flashcards";
  moduleIndex: number;
  cards: Flashcard[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation?: string;
}

export interface QuizSection {
  type: "quiz";
  moduleIndex: number;
  questions: QuizQuestion[];
}

export interface DoneSection {
  type: "done";
  courseId: string;
}

export interface ErrorSection {
  type: "error";
  message: string;
}

export type StreamChunk =
  | ModuleSection
  | FlashcardsSection
  | QuizSection
  | DoneSection
  | ErrorSection;

export interface Course {
  id: string;
  title: string;
  prompt: string;
  modules: ModuleSection[];
  flashcardsByModule: Record<number, Flashcard[]>;
  quizzesByModule: Record<number, QuizQuestion[]>;
  createdAt: string;
}

export interface GenerateRequestBody {
  prompt: string;
  fileIds?: string[]; // Files already uploaded/ingested via /api/ingest
}

export interface QuizAttempt {
  questionId: string;
  selectedIndex: number;
  correct: boolean;
}

export interface QuizScore {
  moduleIndex: number;
  total: number;
  correct: number;
  attempts: QuizAttempt[];
}
