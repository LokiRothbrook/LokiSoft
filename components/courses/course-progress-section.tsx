"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  Download,
  HelpCircle,
  PlayCircle,
  RotateCcw,
  Trophy,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCourseProgress } from "@/hooks/use-course-progress";
import {
  exportAllProgress,
  parseImportFile,
  saveStore,
  PROGRESS_IMPORTED_EVENT,
} from "@/lib/course-progress-io";
import type { LessonMeta } from "@/lib/courses";

interface CourseProgressSectionProps {
  categorySlug: string;
  courseSlug: string;
  lessons: LessonMeta[];
}

// ─── Export / Import buttons ─────────────────────────────────────────────────
// Operates on the full progress store (all courses) — no courseSlug needed.

export function CourseProgressActions() {
  const importRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);

  const handleImport = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setImportError(null);
      try {
        const parsed = await parseImportFile(file);
        saveStore(parsed);
        window.dispatchEvent(new CustomEvent(PROGRESS_IMPORTED_EVENT));
      } catch (err) {
        setImportError(err instanceof Error ? err.message : "Import failed.");
      } finally {
        if (importRef.current) importRef.current.value = "";
      }
    },
    []
  );

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={exportAllProgress}
          className="border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan/60"
        >
          <Download className="w-3.5 h-3.5 mr-1.5" />
          Export Progress
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => importRef.current?.click()}
          className="border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10 hover:border-neon-purple/60"
        >
          <Upload className="w-3.5 h-3.5 mr-1.5" />
          Import Progress
        </Button>
        <input
          ref={importRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />
      </div>
      {importError && <p className="text-xs text-red-400">{importError}</p>}
    </div>
  );
}

// ─── Smart CTA button ────────────────────────────────────────────────────────

export function CourseCtaButton({ categorySlug, courseSlug, lessons }: CourseProgressSectionProps) {
  const { isCompleted, completionCount } = useCourseProgress(courseSlug);

  const total = lessons.length;
  const allDone = total > 0 && completionCount >= total;
  const nextLesson = lessons.find((l) => !isCompleted(l.slug));

  if (total === 0) return null;

  if (allDone) {
    return (
      <Link href={`/courses/${categorySlug}/${courseSlug}/lessons/${lessons[0].slug}`}>
        <Button className="bg-green-500 hover:bg-green-400 text-black font-semibold group">
          <Trophy className="w-4 h-4 mr-2" />
          Review Course
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </Link>
    );
  }

  if (!nextLesson || completionCount === 0) {
    return (
      <Link href={`/courses/${categorySlug}/${courseSlug}/lessons/${lessons[0].slug}`}>
        <Button className="bg-neon-cyan hover:bg-neon-cyan/80 text-black font-semibold group">
          <PlayCircle className="w-4 h-4 mr-2" />
          Start Course
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </Link>
    );
  }

  if (nextLesson.isQuiz) {
    return (
      <Link href={`/courses/${categorySlug}/${courseSlug}/lessons/${nextLesson.slug}`}>
        <Button className="bg-neon-cyan hover:bg-neon-cyan/80 text-black font-semibold group">
          <HelpCircle className="w-4 h-4 mr-2" />
          Start Quiz
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </Link>
    );
  }

  return (
    <Link href={`/courses/${categorySlug}/${courseSlug}/lessons/${nextLesson.slug}`}>
      <Button className="bg-neon-cyan hover:bg-neon-cyan/80 text-black font-semibold group">
        <RotateCcw className="w-4 h-4 mr-2" />
        Resume Course
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
      </Button>
    </Link>
  );
}

// ─── Progress-aware curriculum ────────────────────────────────────────────────

export function CourseCurriculum({ categorySlug, courseSlug, lessons }: CourseProgressSectionProps) {
  const { isCompleted, completionCount, getQuizScore } = useCourseProgress(courseSlug);

  const total = lessons.length;
  const nextLesson = lessons.find((l) => !isCompleted(l.slug));

  return (
    <>
      {/* Progress summary */}
      {completionCount > 0 && (
        <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-neon-cyan/5 border border-neon-cyan/20">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>{completionCount}/{total} lessons complete</span>
              <span className={completionCount >= total ? "text-green-400" : "text-neon-cyan"}>
                {Math.round((completionCount / total) * 100)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  completionCount >= total
                    ? "bg-green-400"
                    : "bg-gradient-to-r from-neon-cyan to-neon-purple"
                }`}
                style={{ width: `${Math.round((completionCount / total) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-0">
        {lessons.map((lesson, idx) => {
          const completed = isCompleted(lesson.slug);
          const isNext = nextLesson?.slug === lesson.slug;
          const quizScore = lesson.isQuiz ? getQuizScore(lesson.slug) : null;

          const nodeStyle = completed
            ? "border-green-400 bg-green-400/20 text-green-400 shadow-[0_0_8px_rgba(74,222,128,0.35)]"
            : isNext
            ? "border-neon-cyan bg-neon-cyan/20 text-neon-cyan shadow-[0_0_12px_rgba(34,211,238,0.5)]"
            : lesson.isQuiz
            ? "border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan"
            : "border-neon-purple/40 bg-neon-purple/10 text-neon-purple";

          const lineStyle = completed ? "bg-green-400/50" : "bg-white/5";

          return (
            <div key={lesson.slug} className="flex gap-4">
              {/* Node + connector line */}
              <div className="flex flex-col items-center shrink-0">
                <div className={`relative w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 ${nodeStyle}`}>
                  {completed ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : lesson.isQuiz ? (
                    <HelpCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-bold">{lesson.lessonNumber}</span>
                  )}
                  {isNext && (
                    <span className="absolute inset-0 rounded-full border-2 border-neon-cyan animate-ping opacity-30" />
                  )}
                </div>
                {idx < lessons.length - 1 && (
                  <div className={`w-0.5 flex-1 min-h-4 mt-1 transition-colors ${lineStyle}`} />
                )}
              </div>

              {/* Row content */}
              <div className="flex-1 pb-6">
                <Link
                  href={`/courses/${categorySlug}/${courseSlug}/lessons/${lesson.slug}`}
                  className={`group flex items-start justify-between gap-4 rounded-xl p-3 transition-colors ${
                    isNext ? "bg-neon-cyan/5 hover:bg-neon-cyan/10" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {isNext && !completed && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-neon-cyan/20 text-neon-cyan font-medium">
                          Up next
                        </span>
                      )}
                      {lesson.isQuiz && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-neon-cyan/15 text-neon-cyan font-medium">
                          Quiz
                        </span>
                      )}
                      {completed && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 font-medium">
                          Complete
                        </span>
                      )}
                      <span className={`font-medium transition-colors ${
                        completed
                          ? "text-green-400 group-hover:text-green-300"
                          : isNext
                          ? "text-neon-cyan"
                          : "text-foreground group-hover:text-neon-cyan"
                      }`}>
                        {lesson.title}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{lesson.excerpt}</p>

                    {/* Quiz score row */}
                    {quizScore && (
                      <div className="flex items-center gap-2 mt-1.5">
                        <Trophy className="w-3 h-3 text-neon-cyan" />
                        <span className={`text-xs font-medium ${
                          quizScore.bestScore >= 70 ? "text-green-400" : "text-red-400"
                        }`}>
                          Best score: {quizScore.bestScore}%
                        </span>
                        <span className="text-xs text-muted-foreground/60">
                          · {quizScore.attempts} attempt{quizScore.attempts !== 1 ? "s" : ""}
                        </span>
                        {quizScore.bestScore < 100 && (
                          <span className="text-xs text-neon-cyan/60 hover:text-neon-cyan transition-colors">
                            Retake →
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-xs text-muted-foreground mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    {lesson.readingTime} min
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      {lessons.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/5 flex justify-center">
          <BottomCtaButton categorySlug={categorySlug} courseSlug={courseSlug} lessons={lessons} />
        </div>
      )}
    </>
  );
}

function BottomCtaButton({ categorySlug, courseSlug, lessons }: CourseProgressSectionProps) {
  const { isCompleted, completionCount } = useCourseProgress(courseSlug);

  const total = lessons.length;
  const allDone = total > 0 && completionCount >= total;
  const nextLesson = lessons.find((l) => !isCompleted(l.slug));

  if (allDone) {
    return (
      <Link href={`/courses/${categorySlug}/${courseSlug}/lessons/${lessons[0].slug}`}>
        <Button variant="outline" className="border-green-400/40 text-green-400 hover:bg-green-400/10 group">
          <Trophy className="w-4 h-4 mr-2" />
          Course Complete — Review from Start
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </Link>
    );
  }

  if (!nextLesson || completionCount === 0) {
    return (
      <Link href={`/courses/${categorySlug}/${courseSlug}/lessons/${lessons[0].slug}`}>
        <Button variant="outline" className="border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/10 group">
          <PlayCircle className="w-4 h-4 mr-2" />
          Begin with Lesson 1
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </Link>
    );
  }

  return (
    <Link href={`/courses/${categorySlug}/${courseSlug}/lessons/${nextLesson.slug}`}>
      <Button variant="outline" className="border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/10 group">
        {nextLesson.isQuiz ? (
          <><HelpCircle className="w-4 h-4 mr-2" />Continue to Quiz</>
        ) : (
          <><Circle className="w-4 h-4 mr-2" />Continue: {nextLesson.title}</>
        )}
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
      </Button>
    </Link>
  );
}
