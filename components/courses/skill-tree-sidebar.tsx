"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  ChevronLeft,
  Download,
  Upload,
  Menu,
  Map,
  List,
} from "lucide-react";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";
import type { LessonMeta } from "@/lib/courses";

type Tab = "tree" | "toc";

interface SkillTreeSidebarProps {
  courseSlug: string;
  courseTitle: string;
  lessons: LessonMeta[];
}

function LessonNode({
  lesson,
  courseSlug,
  isCompleted,
  isCurrent,
  isLast,
  onClick,
}: {
  lesson: LessonMeta;
  courseSlug: string;
  isCompleted: boolean;
  isCurrent: boolean;
  isLast: boolean;
  onClick?: () => void;
}) {
  const nodeColor = isCompleted
    ? "border-green-400 bg-green-400/20 text-green-400"
    : isCurrent
    ? "border-neon-cyan bg-neon-cyan/20 text-neon-cyan"
    : "border-neon-purple/50 bg-neon-purple/10 text-neon-purple/70";

  const lineColor = isCompleted ? "bg-green-400/60" : "bg-neon-purple/20";

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center shrink-0">
        <Link
          href={`/courses/${courseSlug}/lessons/${lesson.slug}`}
          onClick={onClick}
          className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110 ${nodeColor} ${
            isCurrent ? "shadow-[0_0_12px_rgba(34,211,238,0.6)]" : ""
          } ${isCompleted ? "shadow-[0_0_8px_rgba(74,222,128,0.4)]" : ""}`}
          title={lesson.title}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : lesson.isQuiz ? (
            <HelpCircle className="w-4 h-4" />
          ) : (
            <span className="text-xs font-bold">{lesson.lessonNumber}</span>
          )}
          {isCurrent && (
            <span className="absolute inset-0 rounded-full border-2 border-neon-cyan animate-ping opacity-40" />
          )}
        </Link>
        {!isLast && (
          <div className={`w-0.5 flex-1 min-h-4 mt-1 transition-colors ${lineColor}`} />
        )}
      </div>

      <div className="flex-1 min-w-0 pb-4">
        <Link
          href={`/courses/${courseSlug}/lessons/${lesson.slug}`}
          onClick={onClick}
          className={`group flex flex-col gap-0.5 rounded-lg px-2 py-1 transition-all hover:bg-white/5 ${
            isCurrent ? "text-neon-cyan" : isCompleted ? "text-green-400" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="text-sm font-medium leading-tight line-clamp-2">{lesson.title}</span>
          <div className="flex items-center gap-2">
            {lesson.isQuiz ? (
              <span className="text-xs px-1.5 py-0.5 rounded bg-neon-cyan/15 text-neon-cyan font-medium">
                Quiz
              </span>
            ) : (
              <span className="text-xs text-muted-foreground/60">{lesson.readingTime} min</span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}

function SidebarContent({
  courseSlug,
  courseTitle,
  lessons,
  onNavigate,
}: {
  courseSlug: string;
  courseTitle: string;
  lessons: LessonMeta[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<Tab>("tree");
  const { isCompleted, completionCount, exportProgress, importProgress } =
    useCourseProgress(courseSlug);
  const importRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);

  const currentLessonSlug = pathname.split("/lessons/")[1] ?? null;
  const totalLessons = lessons.length;
  const progressPercent =
    totalLessons > 0 ? Math.round((completionCount / totalLessons) * 100) : 0;

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError(null);
    try {
      await importProgress(file);
    } catch (err) {
      setImportError(err instanceof Error ? err.message : "Import failed.");
    } finally {
      if (importRef.current) importRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 p-4 border-b border-white/5">
        <Link
          href={`/courses/${courseSlug}`}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-cyan transition-colors mb-3 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Course overview
        </Link>
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-neon-cyan shrink-0" />
          <span className="text-sm font-semibold text-foreground line-clamp-2 leading-tight">
            {courseTitle}
          </span>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5 mb-4">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>{completionCount}/{totalLessons} complete</span>
            <span className={progressPercent === 100 ? "text-green-400" : "text-neon-cyan"}>
              {progressPercent}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className={`h-full rounded-full transition-colors ${
                progressPercent === 100
                  ? "bg-green-400"
                  : "bg-gradient-to-r from-neon-cyan to-neon-purple"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex rounded-lg bg-white/5 p-0.5 gap-0.5">
          <button
            onClick={() => setActiveTab("tree")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "tree"
                ? "bg-neon-cyan/20 text-neon-cyan shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            Course
          </button>
          <button
            onClick={() => setActiveTab("toc")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "toc"
                ? "bg-neon-pink/20 text-neon-pink shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            Contents
          </button>
        </div>
      </div>

      {/* Tab content — scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {activeTab === "tree" ? (
          <div className="p-4 space-y-0">
            {lessons.map((lesson, idx) => (
              <LessonNode
                key={lesson.slug}
                lesson={lesson}
                courseSlug={courseSlug}
                isCompleted={isCompleted(lesson.slug)}
                isCurrent={lesson.slug === currentLessonSlug}
                isLast={idx === lessons.length - 1}
                onClick={onNavigate}
              />
            ))}
          </div>
        ) : (
          <TableOfContents embedded />
        )}
      </div>

      {/* Footer: export / import (only visible on tree tab) */}
      {activeTab === "tree" && (
        <div className="shrink-0 p-4 border-t border-white/5 space-y-2">
          {importError && <p className="text-xs text-red-400">{importError}</p>}
          <div className="flex gap-2">
            <button
              onClick={exportProgress}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/10 border border-white/5 hover:border-neon-cyan/30 transition-all"
              title="Export your progress as a JSON file"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
            <button
              onClick={() => importRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-neon-purple hover:bg-neon-purple/10 border border-white/5 hover:border-neon-purple/30 transition-all"
              title="Import progress from a JSON file"
            >
              <Upload className="w-3.5 h-3.5" />
              Import
            </button>
            <input
              ref={importRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImport}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function SkillTreeSidebar({ courseSlug, courseTitle, lessons }: SkillTreeSidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop sidebar — sticky, full viewport height minus navbar */}
      <aside className="hidden lg:flex w-72 xl:w-80 shrink-0 sticky top-16 h-[calc(100vh-4rem)] flex-col glass border-r border-white/5 overflow-hidden">
        <SidebarContent
          courseSlug={courseSlug}
          courseTitle={courseTitle}
          lessons={lessons}
        />
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple text-white shadow-lg shadow-neon-cyan/20 hover:shadow-neon-cyan/40 hover:scale-105 transition-all"
        aria-label="Open course navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-80 max-w-[90vw] glass-strong border-r border-white/10 flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
                <span className="text-sm font-semibold text-foreground">Course Navigation</span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                <SidebarContent
                  courseSlug={courseSlug}
                  courseTitle={courseTitle}
                  lessons={lessons}
                  onNavigate={() => setIsMobileOpen(false)}
                />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
