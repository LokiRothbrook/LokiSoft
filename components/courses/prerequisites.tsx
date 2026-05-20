"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { useCourseProgress } from "@/hooks/use-course-progress";
import type { Course } from "@/lib/courses";

function PrerequisiteItem({ course }: { course: Course }) {
  const { completionCount } = useCourseProgress(course.slug);
  const total = course.lessons.length;
  const done = total > 0 && completionCount >= total;

  const colorIcon: Record<string, string> = {
    pink: "text-neon-pink",
    purple: "text-neon-purple",
    blue: "text-neon-blue",
    cyan: "text-neon-cyan",
  };
  const iconColor = colorIcon[course.color] ?? "text-neon-cyan";

  return (
    <Link
      href={`/courses/${course.categorySlug}/${course.slug}`}
      className="flex items-center gap-3 p-3 rounded-xl glass border border-white/5 hover:border-white/10 transition-all group"
    >
      <div className={`shrink-0 ${iconColor}`}>
        <DynamicIcon name={course.icon} className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium group-hover:text-neon-cyan transition-colors line-clamp-1">
          {course.title}
        </p>
        {total > 0 && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {done ? "Completed" : `${completionCount} / ${total} lessons`}
          </p>
        )}
      </div>
      {done ? (
        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
      ) : (
        <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0" />
      )}
    </Link>
  );
}

interface PrerequisitesProps {
  prerequisites: Course[];
}

export function Prerequisites({ prerequisites }: PrerequisitesProps) {
  if (prerequisites.length === 0) return null;

  return (
    <div className="glass rounded-2xl border border-amber-500/20 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lock className="w-4 h-4 text-amber-400" />
        <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">Prerequisites</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Complete {prerequisites.length === 1 ? "this course" : "these courses"} before starting:
      </p>
      <div className="flex flex-col gap-2">
        {prerequisites.map((course) => (
          <PrerequisiteItem key={course.slug} course={course} />
        ))}
      </div>
    </div>
  );
}
