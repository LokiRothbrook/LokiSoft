"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, BookOpen, ArrowRight, Trophy } from "lucide-react";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { DifficultyStars } from "@/components/blog/difficulty-stars";
import { useCourseProgress } from "@/hooks/use-course-progress";
import type { Course } from "@/lib/courses";

const colorClasses = {
  pink: {
    icon: "text-neon-pink",
    border: "border-neon-pink/30 hover:border-neon-pink/60",
    glow: "hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]",
    badge: "bg-neon-pink/10 text-neon-pink",
    button: "bg-neon-pink hover:bg-neon-pink/80",
    outline: "text-neon-pink border-neon-pink/40 hover:bg-neon-pink/10",
  },
  purple: {
    icon: "text-neon-purple",
    border: "border-neon-purple/30 hover:border-neon-purple/60",
    glow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
    badge: "bg-neon-purple/10 text-neon-purple",
    button: "bg-neon-purple hover:bg-neon-purple/80",
    outline: "text-neon-purple border-neon-purple/40 hover:bg-neon-purple/10",
  },
  blue: {
    icon: "text-neon-blue",
    border: "border-neon-blue/30 hover:border-neon-blue/60",
    glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    badge: "bg-neon-blue/10 text-neon-blue",
    button: "bg-neon-blue hover:bg-neon-blue/80",
    outline: "text-neon-blue border-neon-blue/40 hover:bg-neon-blue/10",
  },
  cyan: {
    icon: "text-neon-cyan",
    border: "border-neon-cyan/30 hover:border-neon-cyan/60",
    glow: "hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]",
    badge: "bg-neon-cyan/10 text-neon-cyan",
    button: "bg-neon-cyan hover:bg-neon-cyan/80",
    outline: "text-neon-cyan border-neon-cyan/40 hover:bg-neon-cyan/10",
  },
};

function CourseProgressBar({
  courseSlug,
  totalLessons,
  color,
}: {
  courseSlug: string;
  totalLessons: number;
  color: string;
}) {
  const { completionCount } = useCourseProgress(courseSlug);
  const pct = totalLessons > 0 ? Math.round((completionCount / totalLessons) * 100) : 0;
  const isDone = completionCount >= totalLessons && totalLessons > 0;

  const barColor: Record<string, string> = {
    pink: "bg-neon-pink",
    purple: "bg-neon-purple",
    blue: "bg-neon-blue",
    cyan: "bg-neon-cyan",
  };
  const bar = barColor[color] ?? "bg-neon-cyan";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{completionCount} / {totalLessons} lessons completed</span>
        {isDone ? (
          <span className="flex items-center gap-1 text-green-400 font-medium">
            <Trophy className="w-3 h-3" /> Completed!
          </span>
        ) : (
          <span>{pct}%</span>
        )}
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isDone ? "bg-green-400" : bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ContinueButton({ categorySlug, courseSlug, color }: { categorySlug: string; courseSlug: string; color: string }) {
  const { lastVisited, completionCount } = useCourseProgress(courseSlug);
  const classes = colorClasses[color as keyof typeof colorClasses] ?? colorClasses.cyan;

  const href = lastVisited
    ? `/courses/${categorySlug}/${courseSlug}/lessons/${lastVisited}`
    : `/courses/${categorySlug}/${courseSlug}`;

  const label = completionCount > 0 ? "Continue" : "Start";

  return (
    <Link
      href={href}
      className={`relative z-10 group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all ${classes.button}`}
    >
      {label}
      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
}

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const classes = colorClasses[course.color as keyof typeof colorClasses] ?? colorClasses.cyan;
  const lessonCount = course.lessons.length;
  const quizCount = course.lessons.filter((l) => l.isQuiz).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className={`relative glass rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-300 cursor-pointer ${classes.border} ${classes.glow}`}
    >
      {/* Stretched link — makes the whole card navigate to the course overview */}
      <Link href={`/courses/${course.categorySlug}/${course.slug}`} className="absolute inset-0 z-0 rounded-2xl" aria-label={`View ${course.title} overview`} />

      {/* Header */}
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl bg-muted/50 shrink-0 ${classes.icon}`}>
          <DynamicIcon name={course.icon} className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground leading-tight">{course.title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{lessonCount} lessons</span>
          {quizCount > 0 && <span className="text-muted-foreground/50">· {quizCount} quizzes</span>}
        </div>
        {course.estimatedHours > 0 && (
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>~{course.estimatedHours}h total</span>
          </div>
        )}
        <div className="ml-auto">
          <DifficultyStars difficulty={course.difficulty} size="sm" showName />
        </div>
      </div>

      {/* Progress bar */}
      <CourseProgressBar courseSlug={course.slug} totalLessons={lessonCount} color={course.color} />

      {/* CTAs */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/5">
        <Link
          href={`/courses/${course.categorySlug}/${course.slug}`}
          className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-neon-purple hover:bg-neon-purple/80 transition-colors"
        >
          Overview
        </Link>
        <ContinueButton categorySlug={course.categorySlug} courseSlug={course.slug} color={course.color} />
      </div>
    </motion.div>
  );
}
