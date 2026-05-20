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
  ChevronRight,
  Download,
  Upload,
  Menu,
  Map,
  List,
} from "lucide-react";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { cn } from "@/lib/utils";
import type { LessonMeta } from "@/lib/courses";

const SIDEBAR_COLLAPSED_KEY = "lesson-sidebar-collapsed";

type Tab = "tree" | "toc";

interface SkillTreeSidebarProps {
  categorySlug: string;
  courseSlug: string;
  courseTitle: string;
  lessons: LessonMeta[];
}

function LessonNode({
  lesson,
  categorySlug,
  courseSlug,
  isCompleted,
  isCurrent,
  isLast,
  onClick,
}: {
  lesson: LessonMeta;
  categorySlug: string;
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
          href={`/courses/${categorySlug}/${courseSlug}/lessons/${lesson.slug}`}
          onClick={onClick}
          className={cn(
            "relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 hover:scale-110",
            nodeColor,
            isCurrent && "shadow-[0_0_12px_rgba(34,211,238,0.6)]",
            isCompleted && "shadow-[0_0_8px_rgba(74,222,128,0.4)]"
          )}
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
          href={`/courses/${categorySlug}/${courseSlug}/lessons/${lesson.slug}`}
          onClick={onClick}
          className={cn(
            "group flex flex-col gap-0.5 rounded-lg px-2 py-1 transition-all hover:bg-white/5",
            isCurrent ? "text-neon-cyan" : isCompleted ? "text-green-400" : "text-muted-foreground hover:text-foreground"
          )}
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

function CollapsedRail({
  lessons,
  categorySlug,
  courseSlug,
  currentLessonSlug,
  onToggle,
}: {
  lessons: LessonMeta[];
  categorySlug: string;
  courseSlug: string;
  currentLessonSlug: string | null;
  onToggle: () => void;
}) {
  const { isCompleted, completionCount } = useCourseProgress(courseSlug);
  const totalLessons = lessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completionCount / totalLessons) * 100) : 0;

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 py-3 border-b border-white/5 flex justify-center">
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-neon-cyan transition-colors"
          title="Expand sidebar"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overscroll-contain min-h-0 flex flex-col items-center gap-1.5 py-3 px-1">
        {lessons.map((lesson) => {
          const completed = isCompleted(lesson.slug);
          const current = lesson.slug === currentLessonSlug;
          return (
            <Link
              key={lesson.slug}
              href={`/courses/${categorySlug}/${courseSlug}/lessons/${lesson.slug}`}
              title={lesson.title}
              className={cn(
                "relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all hover:scale-110 shrink-0",
                completed
                  ? "border-green-400 bg-green-400/20 text-green-400"
                  : current
                  ? "border-neon-cyan bg-neon-cyan/20 text-neon-cyan"
                  : "border-neon-purple/50 bg-neon-purple/10 text-neon-purple/70",
                current && "shadow-[0_0_12px_rgba(34,211,238,0.6)]",
                completed && "shadow-[0_0_8px_rgba(74,222,128,0.4)]"
              )}
            >
              {completed ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : lesson.isQuiz ? (
                <HelpCircle className="w-3.5 h-3.5" />
              ) : (
                <span className="text-xs font-bold">{lesson.lessonNumber}</span>
              )}
              {current && (
                <span className="absolute inset-0 rounded-full border-2 border-neon-cyan animate-ping opacity-40" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="shrink-0 px-2 py-3 border-t border-white/5 space-y-1.5">
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className={cn(
              "h-full rounded-full",
              progressPercent === 100 ? "bg-green-400" : "bg-gradient-to-r from-neon-cyan to-neon-purple"
            )}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <p className={cn(
          "text-[10px] font-medium text-center tabular-nums",
          progressPercent === 100 ? "text-green-400" : "text-muted-foreground"
        )}>
          {progressPercent}%
        </p>
      </div>
    </div>
  );
}

function SidebarContent({
  categorySlug,
  courseSlug,
  courseTitle,
  lessons,
  activeTab,
  onTabChange,
  onNavigate,
  onCollapseToggle,
}: {
  categorySlug: string;
  courseSlug: string;
  courseTitle: string;
  lessons: LessonMeta[];
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onNavigate?: () => void;
  onCollapseToggle?: () => void;
}) {
  const pathname = usePathname();
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

  const showTree = activeTab === "tree";

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 p-4 border-b border-white/5">
        <div className="flex items-center justify-between mb-3">
          <Link
            href={`/courses/${categorySlug}/${courseSlug}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-neon-cyan transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Course overview
          </Link>
          {onCollapseToggle && (
            <button
              onClick={onCollapseToggle}
              className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-neon-cyan transition-colors"
              title="Collapse sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

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
              className={cn(
                "h-full rounded-full transition-colors",
                progressPercent === 100
                  ? "bg-green-400"
                  : "bg-gradient-to-r from-neon-cyan to-neon-purple"
              )}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex rounded-lg bg-white/5 p-0.5 gap-0.5">
          <button
            onClick={() => onTabChange("tree")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all",
              activeTab === "tree"
                ? "bg-neon-cyan/20 text-neon-cyan shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Map className="w-3.5 h-3.5" />
            Course
          </button>
          <button
            onClick={() => onTabChange("toc")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all",
              activeTab === "toc"
                ? "bg-neon-pink/20 text-neon-pink shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="w-3.5 h-3.5" />
            Contents
          </button>
        </div>
      </div>

      {/* Tab content — scrollable */}
      <div className="flex-1 overflow-y-auto overscroll-contain min-h-0">
        <div className={showTree ? "block" : "hidden"}>
          <div className="p-4 space-y-0">
            {lessons.map((lesson, idx) => (
              <LessonNode
                key={lesson.slug}
                lesson={lesson}
                categorySlug={categorySlug}
                courseSlug={courseSlug}
                isCompleted={isCompleted(lesson.slug)}
                isCurrent={lesson.slug === currentLessonSlug}
                isLast={idx === lessons.length - 1}
                onClick={onNavigate}
              />
            ))}
          </div>
        </div>

        {/* ToC: mounted lazily so the DOM scan runs after the article is in the DOM. */}
        <div className={!showTree ? "block" : "hidden"}>
          {!showTree && <TableOfContents embedded />}
        </div>
      </div>

      {/* Footer: export / import — only visible on tree tab */}
      <div
        className={cn(
          "shrink-0 p-4 border-t border-white/5 space-y-2",
          !showTree ? "hidden" : "block"
        )}
      >
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
    </div>
  );
}

export function SkillTreeSidebar({ categorySlug, courseSlug, courseTitle, lessons }: SkillTreeSidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("tree");

  useEffect(() => {
    const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    if (stored === "true") setIsCollapsed(true);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileOpen(false);
  }, [pathname]);

  const currentLessonSlug = pathname.split("/lessons/")[1] ?? null;

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      return next;
    });
  };

  return (
    <>
      {/* Desktop sidebar — sticky, full viewport height minus navbar */}
      <aside
        className={cn(
          "hidden lg:flex shrink-0 sticky top-16 h-[calc(100vh-4rem)] flex-col glass border-r border-white/5 overflow-hidden transition-[width] duration-300",
          isCollapsed ? "w-14" : "w-72 xl:w-80"
        )}
      >
        {isCollapsed ? (
          <CollapsedRail
            lessons={lessons}
            categorySlug={categorySlug}
            courseSlug={courseSlug}
            currentLessonSlug={currentLessonSlug}
            onToggle={toggleCollapse}
          />
        ) : (
          <SidebarContent
            categorySlug={categorySlug}
            courseSlug={courseSlug}
            courseTitle={courseTitle}
            lessons={lessons}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onCollapseToggle={toggleCollapse}
          />
        )}
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
                  categorySlug={categorySlug}
                  courseSlug={courseSlug}
                  courseTitle={courseTitle}
                  lessons={lessons}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
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
