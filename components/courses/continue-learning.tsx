"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { useCourseProgress } from "@/hooks/use-course-progress";
import type { Category, Course } from "@/lib/courses";

const colorMap = {
  pink:   { icon: "text-neon-pink",   bg: "bg-neon-pink/10",   border: "border-neon-pink/20",   bar: "bg-neon-pink"   },
  purple: { icon: "text-neon-purple", bg: "bg-neon-purple/10", border: "border-neon-purple/20", bar: "bg-neon-purple" },
  blue:   { icon: "text-neon-blue",   bg: "bg-neon-blue/10",   border: "border-neon-blue/20",   bar: "bg-neon-blue"   },
  cyan:   { icon: "text-neon-cyan",   bg: "bg-neon-cyan/10",   border: "border-neon-cyan/20",   bar: "bg-neon-cyan"   },
};

function CourseCard({ course }: { course: Course }) {
  const { completionCount, isCompleted } = useCourseProgress(course.slug);
  const total = course.lessons.length;
  const pct = total > 0 ? Math.round((completionCount / total) * 100) : 0;
  const done = completionCount >= total && total > 0;
  const colors = colorMap[course.color as keyof typeof colorMap] ?? colorMap.cyan;

  if (done || completionCount === 0) return null;

  const nextLesson = course.lessons.find((l) => !isCompleted(l.slug));
  const href = nextLesson
    ? `/academy/${course.categorySlug}/${course.slug}/lessons/${nextLesson.slug}`
    : `/academy/${course.categorySlug}/${course.slug}`;

  return (
    <Link href={href} className="group shrink-0 w-64">
      <div className={`glass rounded-xl border ${colors.border} p-4 h-full hover:bg-white/5 transition-all duration-200 group-hover:border-opacity-60`}>
        <div className="flex items-start gap-3 mb-3">
          <div className={`p-2 rounded-lg ${colors.bg} ${colors.icon} shrink-0`}>
            <DynamicIcon name={course.icon} className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold line-clamp-2 group-hover:text-neon-cyan transition-colors">
              {course.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{pct}% complete</p>
          </div>
        </div>

        <div className="h-1 rounded-full bg-white/5 overflow-hidden mb-3">
          <div
            className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className={`flex items-center gap-1.5 text-xs font-medium ${colors.icon}`}>
          <RotateCcw className="w-3 h-3" />
          Continue
          <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
}

interface ContinueLearningProps {
  categories: Category[];
}

export function ContinueLearning({ categories }: ContinueLearningProps) {
  const allCourses = categories.flatMap((cat) => cat.courses);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {allCourses.map((course) => (
        <CourseCard key={course.slug} course={course} />
      ))}
    </div>
  );
}

interface ContinueLearningWrapperProps {
  categories: Category[];
}

export function ContinueLearningSection({ categories }: ContinueLearningWrapperProps) {
  const allCourses = categories.flatMap((cat) => cat.courses);
  // We render the section only when at least one course has progress < 100%.
  // The CourseCard components handle their own visibility — we just need to
  // check if ANY would render to avoid showing an empty section header.
  // Since we can't call hooks conditionally inside map, we use a client-side
  // approach: render the section unconditionally but use a sentinel inner component.
  if (allCourses.length === 0) return null;

  return (
    <InnerSection categories={categories} allCourses={allCourses} />
  );
}

function InnerSection({ categories, allCourses }: { categories: Category[]; allCourses: Course[] }) {
  // Track which courses are in-progress (> 0, < 100%) — one hook call per course
  const progressList = allCourses.map((c) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { completionCount } = useCourseProgress(c.slug);
    const total = c.lessons.length;
    return completionCount > 0 && completionCount < total;
  });

  const hasAny = progressList.some(Boolean);
  if (!hasAny) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-12"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <RotateCcw className="w-4 h-4 text-neon-cyan" />
        <h2 className="text-lg font-semibold text-neon-cyan">Continue Learning</h2>
      </div>
      <ContinueLearning categories={categories} />
    </motion.div>
  );
}
