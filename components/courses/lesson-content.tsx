"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  HelpCircle,
  Trophy,
} from "lucide-react";
import { BlogContent } from "@/components/blog/blog-content";
import { useCourseProgress } from "@/hooks/use-course-progress";
import type { Lesson, LessonMeta } from "@/lib/courses";

interface LessonContentProps {
  lesson: Lesson;
  courseSlug: string;
  courseTitle: string;
  prev: LessonMeta | null;
  next: LessonMeta | null;
}

export function LessonContent({ lesson, courseSlug, courseTitle, prev, next }: LessonContentProps) {
  const { isCompleted, markComplete, markIncomplete, saveQuizScore, setLastVisited, getQuizScore } =
    useCourseProgress(courseSlug);

  const completed = isCompleted(lesson.slug);
  const quizScore = lesson.isQuiz ? getQuizScore(lesson.slug) : null;

  // How many QuizGroups are on this page — counted from the rendered HTML
  const expectedGroups = lesson.isQuiz
    ? (lesson.contentHtml?.match(/data-quiz-group/g) ?? []).length
    : 0;

  // Live score while the user takes the quiz (resets on every page load)
  const [quizProgress, setQuizProgress] = useState<{
    correct: number;
    total: number;
    completedGroups: number;
  } | null>(null);

  // Guard so we only call saveQuizScore once per session, even if the component re-renders
  const quizSavedRef = useRef(false);

  // Split contentHtml at the score anchor so the banner renders inline between the quiz and the grading scale.
  // Regex is permissive: allows whitespace variations and optional attribute value formats.
  const SCORE_ANCHOR_RE = /<div[^>]*data-quiz-score-anchor[^>]*>\s*<\/div>/;
  const anchorMatch = lesson.isQuiz ? SCORE_ANCHOR_RE.exec(lesson.contentHtml ?? "") : null;
  const htmlBefore = anchorMatch
    ? (lesson.contentHtml ?? "").slice(0, anchorMatch.index)
    : (lesson.contentHtml ?? "");
  const htmlAfter = anchorMatch
    ? (lesson.contentHtml ?? "").slice(anchorMatch.index + anchorMatch[0].length)
    : "";

  // Track last visited lesson
  useEffect(() => {
    setLastVisited(lesson.slug);
  }, [lesson.slug, setLastVisited]);

  // Accumulate "quiz-group-result" events from individual QuizGroup components
  useEffect(() => {
    if (!lesson.isQuiz || expectedGroups === 0) return;

    const handler = (e: Event) => {
      const { correct, total } = (e as CustomEvent<{ correct: number; total: number }>).detail;
      setQuizProgress((prev) => ({
        correct: (prev?.correct ?? 0) + correct,
        total: (prev?.total ?? 0) + total,
        completedGroups: (prev?.completedGroups ?? 0) + 1,
      }));
    };

    document.addEventListener("quiz-group-result", handler);
    return () => document.removeEventListener("quiz-group-result", handler);
  }, [lesson.isQuiz, expectedGroups]);

  // Once all groups report, save one combined attempt
  useEffect(() => {
    if (
      !quizProgress ||
      quizProgress.completedGroups !== expectedGroups ||
      expectedGroups === 0 ||
      quizSavedRef.current
    )
      return;
    quizSavedRef.current = true;
    const combinedScore =
      quizProgress.total > 0
        ? Math.round((quizProgress.correct / quizProgress.total) * 100)
        : 0;
    saveQuizScore(lesson.slug, combinedScore);
    markComplete(lesson.slug);
  }, [quizProgress, expectedGroups, lesson.slug, saveQuizScore, markComplete]);

  const toggleComplete = () => {
    if (completed) {
      markIncomplete(lesson.slug);
    } else {
      markComplete(lesson.slug);
    }
  };

  return (
    <article className="flex-1 min-w-0 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
        <Link href="/courses" className="hover:text-neon-cyan transition-colors">Courses</Link>
        <span>/</span>
        <Link href={`/courses/${courseSlug}`} className="hover:text-neon-cyan transition-colors line-clamp-1 max-w-[200px]">
          {courseTitle}
        </Link>
        <span>/</span>
        <span className="text-foreground/70 line-clamp-1 max-w-[200px]">{lesson.title}</span>
      </nav>

      {/* Lesson header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {lesson.isQuiz ? (
            <span className="flex items-center gap-1.5 text-sm px-3 py-1 rounded-full bg-neon-cyan/15 text-neon-cyan font-medium">
              <HelpCircle className="w-4 h-4" />
              Quiz
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-sm px-3 py-1 rounded-full bg-neon-purple/10 text-neon-purple font-medium">
              Lesson {lesson.lessonNumber}
            </span>
          )}

          {completed && (
            <span className="flex items-center gap-1.5 text-sm px-3 py-1 rounded-full bg-green-500/10 text-green-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Complete
            </span>
          )}

          {quizScore && !quizProgress && (
            <span className="flex items-center gap-1.5 text-sm px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan font-medium">
              <Trophy className="w-4 h-4" />
              Best: {quizScore.bestScore}% · {quizScore.attempts} attempt{quizScore.attempts !== 1 ? "s" : ""}
            </span>
          )}

          {quizProgress && (() => {
            const allDone = quizProgress.completedGroups === expectedGroups;
            const pct = quizProgress.total > 0
              ? Math.round((quizProgress.correct / quizProgress.total) * 100)
              : 0;
            return (
              <span className={`flex items-center gap-1.5 text-sm px-3 py-1 rounded-full font-medium ${
                allDone
                  ? pct >= 70
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                  : "bg-neon-cyan/10 text-neon-cyan"
              }`}>
                <Trophy className="w-4 h-4" />
                {allDone
                  ? `${quizProgress.correct}/${quizProgress.total} — ${pct}%`
                  : `${quizProgress.correct}/${quizProgress.total} · ${quizProgress.completedGroups}/${expectedGroups} sections`}
              </span>
            );
          })()}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold gradient-text-animated mb-4">
          {lesson.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {lesson.readingTime} min read
          </div>
        </div>
      </header>

      {/* Lesson body — split at the score anchor so the banner renders inline */}
      <div className="glass rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 overflow-x-auto mb-10">
        <BlogContent contentHtml={htmlBefore} />

        {lesson.isQuiz && (() => {
          if (!quizProgress) {
            return (
              <div className="flex items-center justify-center gap-3 my-6 p-4 rounded-xl border font-medium bg-neon-cyan/5 border-neon-cyan/20 text-neon-cyan/50">
                <Trophy className="w-5 h-5 shrink-0" />
                Complete the sections above to see your score
              </div>
            );
          }
          const allDone = quizProgress.completedGroups === expectedGroups;
          const pct = quizProgress.total > 0
            ? Math.round((quizProgress.correct / quizProgress.total) * 100)
            : 0;
          return (
            <div className={`flex items-center justify-center gap-3 my-6 p-4 rounded-xl border font-medium ${
              allDone
                ? pct >= 70
                  ? "bg-green-500/10 border-green-500/30 text-green-400"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
                : "bg-neon-cyan/5 border-neon-cyan/20 text-neon-cyan"
            }`}>
              <Trophy className="w-5 h-5 shrink-0" />
              {allDone
                ? `Your score: ${quizProgress.correct} / ${quizProgress.total} — ${pct}%`
                : `${quizProgress.correct} / ${quizProgress.total} correct so far · ${quizProgress.completedGroups} of ${expectedGroups} sections complete`}
            </div>
          );
        })()}

        {htmlAfter && <BlogContent contentHtml={htmlAfter} />}
      </div>

      {/* Mark complete button (non-quiz lessons only; quizzes auto-complete on submission) */}
      {!lesson.isQuiz && (
        <div className="flex justify-center mb-10">
          <button
            onClick={toggleComplete}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
              completed
                ? "border-green-400/50 bg-green-400/10 text-green-400 hover:border-green-400/30 hover:bg-green-400/5"
                : "border-neon-cyan/40 bg-neon-cyan/5 text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            }`}
          >
            {completed ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Marked as Complete — click to undo
              </>
            ) : (
              <>
                <Circle className="w-5 h-5" />
                Mark as Complete
              </>
            )}
          </button>
        </div>
      )}

      {/* Prev / Next navigation */}
      <div className="flex gap-4 justify-between items-center border-t border-white/5 pt-8 mb-8">
        {prev ? (
          <Link href={`/courses/${courseSlug}/lessons/${prev.slug}`} className="flex-1 max-w-xs">
            <div className="group flex items-center gap-3 p-4 rounded-xl glass border border-white/5 hover:border-neon-purple/40 transition-all">
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-neon-purple group-hover:-translate-x-0.5 transition-all shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">Previous</p>
                <p className="text-sm font-medium line-clamp-2 group-hover:text-neon-purple transition-colors">
                  {prev.title}
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-1 max-w-xs" />
        )}

        {next ? (
          <Link href={`/courses/${courseSlug}/lessons/${next.slug}`} className="flex-1 max-w-xs ml-auto">
            <div className="group flex items-center gap-3 p-4 rounded-xl glass border border-white/5 hover:border-neon-cyan/40 transition-all">
              <div className="flex-1 min-w-0 text-right">
                <p className="text-xs text-muted-foreground mb-0.5">Next</p>
                <p className="text-sm font-medium line-clamp-2 group-hover:text-neon-cyan transition-colors">
                  {next.title}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-neon-cyan group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-xl glass border border-green-400/20 flex-1 max-w-xs ml-auto">
            <div className="flex-1 text-right">
              <p className="text-xs text-muted-foreground mb-0.5">You&apos;re at the end!</p>
              <Link href={`/courses/${courseSlug}`} className="text-sm font-medium text-green-400 hover:text-green-300 transition-colors">
                Back to course overview
              </Link>
            </div>
            <Trophy className="w-5 h-5 text-green-400 shrink-0" />
          </div>
        )}
      </div>
    </article>
  );
}
