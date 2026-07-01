import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Person B's db.ts / generate route own persistence. This view assumes a
// server fetch of saved courses; placeholder shape shown for the frontend slice.
interface CourseSummary {
  id: string;
  title: string;
  prompt: string;
  moduleCount: number;
  createdAt: string;
}

async function getCourses(): Promise<CourseSummary[]> {
  // Replace with a real fetch to the backend once the persistence layer is wired up.
  return [];
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
          Library
        </span>
        <h1 className="font-serif text-3xl text-[var(--paper)]">Your courses</h1>
      </div>

      {courses.length === 0 ? (
        <Card className="border-dashed bg-transparent">
          <CardContent className="flex flex-col gap-2 py-10 text-center">
            <p className="text-sm text-[var(--paper)]/70">
              Nothing here yet. Generate your first course from a prompt.
            </p>
            <a
              href="/"
              className="mx-auto font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)] hover:underline"
            >
              Start a course
            </a>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {courses.map((course) => (
            <a key={course.id} href={`/courses/${course.id}`}>
              <Card className="h-full transition-colors hover:border-[var(--accent)]">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <p className="mt-1 line-clamp-2 text-sm text-[var(--paper)]/60">
                    {course.prompt}
                  </p>
                </CardHeader>
                <CardContent className="font-mono text-xs text-[var(--paper)]/40">
                  {course.moduleCount} modules · {new Date(course.createdAt).toLocaleDateString()}
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
