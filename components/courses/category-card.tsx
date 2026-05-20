"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Trophy, X, BookOpen } from "lucide-react";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { Button } from "@/components/ui/button";
import { useCourseProgress } from "@/hooks/use-course-progress";
import type { Category, Course } from "@/lib/courses";

// ─── Color map ────────────────────────────────────────────────────────────────

const colorMap = {
  pink:   { icon: "text-neon-pink",   bg: "bg-neon-pink/10",   border: "border-neon-pink/20",   bar: "bg-neon-pink",   ring: "ring-neon-pink/40",   glow: "shadow-[0_0_12px_rgba(236,72,153,0.4)]"   },
  purple: { icon: "text-neon-purple", bg: "bg-neon-purple/10", border: "border-neon-purple/20", bar: "bg-neon-purple", ring: "ring-neon-purple/40", glow: "shadow-[0_0_12px_rgba(168,85,247,0.4)]" },
  blue:   { icon: "text-neon-blue",   bg: "bg-neon-blue/10",   border: "border-neon-blue/20",   bar: "bg-neon-blue",   ring: "ring-neon-blue/40",   glow: "shadow-[0_0_12px_rgba(59,130,246,0.4)]"   },
  cyan:   { icon: "text-neon-cyan",   bg: "bg-neon-cyan/10",   border: "border-neon-cyan/20",   bar: "bg-neon-cyan",   ring: "ring-neon-cyan/40",   glow: "shadow-[0_0_12px_rgba(34,211,238,0.4)]"   },
};

function getColors(color: string) {
  return colorMap[color as keyof typeof colorMap] ?? colorMap.cyan;
}

// ─── Badge popup modal ────────────────────────────────────────────────────────

interface BadgeModalProps {
  course: Course;
  onClose: () => void;
}

function BadgeModal({ course, onClose }: BadgeModalProps) {
  const { completionCount, getQuizScore } = useCourseProgress(course.slug);
  const colors = getColors(course.color);
  const quizLessons = course.lessons.filter((l) => l.isQuiz);
  const total = course.lessons.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-sm glass-strong rounded-2xl border border-white/10 p-6 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 16 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge icon */}
        <div className="flex justify-center mb-4">
          <div className={`p-4 rounded-2xl ring-2 ${colors.ring} ${colors.bg} ${colors.glow}`}>
            <DynamicIcon name={course.icon} className={`w-10 h-10 ${colors.icon}`} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-green-400" />
            <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Course Complete</span>
          </div>
          <h3 className="text-lg font-bold">{course.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {completionCount} / {total} lessons completed
          </p>
        </div>

        {/* Quiz scores */}
        {quizLessons.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Quiz Scores</p>
            <div className="space-y-2">
              {quizLessons.map((quiz) => {
                const score = getQuizScore(quiz.slug);
                return (
                  <div key={quiz.slug} className="flex items-center justify-between gap-3 p-2.5 rounded-lg bg-white/3">
                    <span className="text-sm text-muted-foreground line-clamp-1 flex-1">{quiz.title}</span>
                    {score ? (
                      <span className={`text-sm font-semibold shrink-0 ${score.bestScore >= 70 ? "text-green-400" : "text-red-400"}`}>
                        {score.bestScore}%
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground/50 shrink-0">—</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Overall avg */}
            {(() => {
              const scores = quizLessons.map((q) => getQuizScore(q.slug)?.bestScore ?? 0);
              const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
              return (
                <div className="flex items-center justify-between mt-2 px-2.5">
                  <span className="text-xs text-muted-foreground">Overall average</span>
                  <span className={`text-sm font-bold ${avg >= 70 ? "text-green-400" : "text-red-400"}`}>{avg}%</span>
                </div>
              );
            })()}
          </div>
        )}

        {/* CTA */}
        <Link href={`/academy/${course.categorySlug}/${course.slug}`} onClick={onClose}>
          <Button className="w-full bg-neon-cyan hover:bg-neon-cyan/80 text-black font-semibold">
            <BookOpen className="w-4 h-4 mr-2" />
            Review Course
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

// ─── Completion badge (clickable icon in the badge row) ───────────────────────

function CompletionBadge({ course }: { course: Course }) {
  const [open, setOpen] = useState(false);
  const colors = getColors(course.color);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title={course.title}
        className={`group relative p-2.5 rounded-xl ring-1 ${colors.ring} ${colors.bg} ${colors.icon} hover:${colors.glow} transition-all duration-200`}
      >
        <DynamicIcon name={course.icon} className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-background flex items-center justify-center">
          <CheckCircle2 className="w-2.5 h-2.5 text-black" />
        </span>
      </button>

      <AnimatePresence>
        {open && <BadgeModal course={course} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

// ─── Single course row (for no-progress and in-progress states) ───────────────

function CourseRow({ course }: { course: Course }) {
  const { completionCount } = useCourseProgress(course.slug);
  const total = course.lessons.length;
  const pct = total > 0 ? Math.round((completionCount / total) * 100) : 0;
  const colors = getColors(course.color);

  const href = `/academy/${course.categorySlug}/${course.slug}`;

  return (
    <Link
      href={href}
      className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors"
    >
      <div className={`shrink-0 ${colors.icon}`}>
        <DynamicIcon name={course.icon} className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium group-hover:text-neon-cyan transition-colors line-clamp-1">
            {course.title}
          </span>
          <span className="text-xs text-muted-foreground shrink-0 ml-3">{pct > 0 ? `${pct}%` : "Not started"}</span>
        </div>
        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
    </Link>
  );
}

// ─── Smart card body — determines which state to render ──────────────────────

function SmartCardBody({ category }: { category: Category }) {
  const courses = category.courses;

  // Compute per-course progress (all hooks must be called unconditionally)
  const progressMap = Object.fromEntries(
    courses.map((c) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { completionCount } = useCourseProgress(c.slug);
      return [c.slug, completionCount];
    })
  );

  const total = (c: Course) => c.lessons.length;
  const isDone = (c: Course) => total(c) > 0 && progressMap[c.slug] >= total(c);
  const inProgress = (c: Course) => progressMap[c.slug] > 0 && !isDone(c);

  const doneCourses = courses.filter(isDone);
  const inProgressCourses = courses.filter(inProgress);
  const allDone = doneCourses.length === courses.length && courses.length > 0;
  const hasInProgress = inProgressCourses.length > 0;

  // State 3: all complete — show badge row only
  if (allDone) {
    return (
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-green-400" />
          All courses complete
        </p>
        <div className="flex flex-wrap gap-2">
          {courses.map((c) => (
            <CompletionBadge key={c.slug} course={c} />
          ))}
        </div>
      </div>
    );
  }

  // State 2: some in progress — show in-progress rows + completed badges
  if (hasInProgress) {
    return (
      <div>
        <div className="p-2">
          {inProgressCourses.map((c) => (
            <CourseRow key={c.slug} course={c} />
          ))}
        </div>
        {doneCourses.length > 0 && (
          <div className="px-4 pb-3 pt-1 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">Completed:</span>
            {doneCourses.map((c) => (
              <CompletionBadge key={c.slug} course={c} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // State 1: no progress — show first 3 courses by order
  const preview = courses.slice(0, 3);
  return (
    <div className="p-2">
      {preview.map((c) => (
        <CourseRow key={c.slug} course={c} />
      ))}
      {courses.length > 3 && (
        <p className="text-xs text-muted-foreground text-center pt-1 pb-2">
          +{courses.length - 3} more courses
        </p>
      )}
    </div>
  );
}

// ─── Category card ────────────────────────────────────────────────────────────

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const colors = getColors(category.color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`glass rounded-2xl border ${colors.border} overflow-hidden`}
    >
      {/* Category header links to category page */}
      <Link
        href={`/academy/${category.slug}`}
        className="group flex items-center gap-4 p-5 pb-4 hover:bg-white/[0.03] transition-colors"
      >
        <div className={`p-3 rounded-xl ${colors.bg} ${colors.icon} shrink-0`}>
          <DynamicIcon name={category.icon} className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className={`text-xl font-bold transition-colors group-hover:${colors.icon}`}>
            {category.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
            {category.description}
          </p>
        </div>
        <ArrowRight className={`w-5 h-5 ${colors.icon} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0`} />
      </Link>

      <div className="mx-5 h-px bg-white/5" />

      {/* Smart body */}
      {category.courses.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6 px-5">
          Courses coming soon — check back shortly.
        </p>
      ) : (
        <SmartCardBody category={category} />
      )}

      {/* Footer CTA */}
      {category.courses.length > 0 && (
        <div className="px-5 pb-5 pt-1">
          <Link
            href={`/academy/${category.slug}`}
            className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border ${colors.border} ${colors.icon} text-sm font-medium hover:${colors.bg} transition-colors`}
          >
            View all {category.title} courses
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </motion.div>
  );
}
