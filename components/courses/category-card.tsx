"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { CourseCard } from "@/components/courses/course-card";
import type { Category } from "@/lib/courses";

const colorMap = {
  pink:   { icon: "text-neon-pink",   bg: "bg-neon-pink/10",   border: "border-neon-pink/30",   heading: "text-neon-pink"   },
  purple: { icon: "text-neon-purple", bg: "bg-neon-purple/10", border: "border-neon-purple/30", heading: "text-neon-purple" },
  blue:   { icon: "text-neon-blue",   bg: "bg-neon-blue/10",   border: "border-neon-blue/30",   heading: "text-neon-blue"   },
  cyan:   { icon: "text-neon-cyan",   bg: "bg-neon-cyan/10",   border: "border-neon-cyan/30",   heading: "text-neon-cyan"   },
};

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const colors = colorMap[category.color as keyof typeof colorMap] ?? colorMap.cyan;
  const totalHours = category.courses.reduce((sum, c) => sum + (c.estimatedHours ?? 0), 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      {/* Category header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${colors.bg} ${colors.icon} shrink-0`}>
            <DynamicIcon name={category.icon} className="w-7 h-7" />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${colors.heading}`}>{category.title}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">{category.description}</p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            {category.courses.length} {category.courses.length === 1 ? "course" : "courses"}
          </span>
          {totalHours > 0 && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              ~{totalHours}h total
            </span>
          )}
          <Link
            href={`/courses/${category.slug}`}
            className={`flex items-center gap-1 font-medium transition-colors ${colors.icon} hover:opacity-80`}
          >
            View track
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Course grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {category.courses.map((course, i) => (
          <CourseCard key={course.slug} course={course} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
