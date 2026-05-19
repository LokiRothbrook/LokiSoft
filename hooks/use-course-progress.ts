"use client";

import { useState, useEffect, useCallback } from "react";
import {
  defaultStore,
  defaultCourseData,
  loadStore,
  saveStore,
  exportAllProgress,
  parseImportFile,
  PROGRESS_IMPORTED_EVENT,
} from "@/lib/course-progress-io";
import type { QuizAttempt, CourseProgressData, ProgressStore } from "@/lib/course-progress-io";

export type { QuizAttempt };

export function useCourseProgress(courseSlug: string) {
  const [store, setStore] = useState<ProgressStore>(defaultStore);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStore(loadStore());
    // Re-sync when another hook instance on the same page completes an import
    const handleImport = () => setStore(loadStore());
    window.addEventListener(PROGRESS_IMPORTED_EVENT, handleImport);
    return () => window.removeEventListener(PROGRESS_IMPORTED_EVENT, handleImport);
  }, []);

  const getCourseData = useCallback(
    (s: ProgressStore): CourseProgressData =>
      s.courses[courseSlug] ?? defaultCourseData(),
    [courseSlug]
  );

  const updateCourse = useCallback(
    (updater: (prev: CourseProgressData) => CourseProgressData) => {
      setStore((prev) => {
        const current = prev.courses[courseSlug] ?? defaultCourseData();
        const updated: ProgressStore = {
          ...prev,
          courses: { ...prev.courses, [courseSlug]: updater(current) },
        };
        saveStore(updated);
        return updated;
      });
    },
    [courseSlug]
  );

  const isCompleted = useCallback(
    (lessonSlug: string) =>
      getCourseData(store).completedLessons.includes(lessonSlug),
    [store, getCourseData]
  );

  const markComplete = useCallback(
    (lessonSlug: string) => {
      updateCourse((prev) => ({
        ...prev,
        completedLessons: prev.completedLessons.includes(lessonSlug)
          ? prev.completedLessons
          : [...prev.completedLessons, lessonSlug],
      }));
    },
    [updateCourse]
  );

  const markIncomplete = useCallback(
    (lessonSlug: string) => {
      updateCourse((prev) => ({
        ...prev,
        completedLessons: prev.completedLessons.filter((s) => s !== lessonSlug),
      }));
    },
    [updateCourse]
  );

  const getQuizScore = useCallback(
    (lessonSlug: string): QuizAttempt | null =>
      getCourseData(store).quizScores[lessonSlug] ?? null,
    [store, getCourseData]
  );

  const saveQuizScore = useCallback(
    (lessonSlug: string, score: number) => {
      updateCourse((prev) => {
        const existing = prev.quizScores[lessonSlug];
        return {
          ...prev,
          quizScores: {
            ...prev.quizScores,
            [lessonSlug]: {
              bestScore: Math.max(score, existing?.bestScore ?? 0),
              attempts: (existing?.attempts ?? 0) + 1,
              lastAttempt: new Date().toISOString(),
            },
          },
        };
      });
    },
    [updateCourse]
  );

  const lastVisited = getCourseData(store).lastVisited;

  const setLastVisited = useCallback(
    (lessonSlug: string) => {
      updateCourse((prev) => ({ ...prev, lastVisited: lessonSlug }));
    },
    [updateCourse]
  );

  const completedLessons = getCourseData(store).completedLessons;
  const completionCount = completedLessons.length;

  const exportProgress = useCallback(() => exportAllProgress(), []);

  const importProgress = useCallback(async (file: File): Promise<void> => {
    const parsed = await parseImportFile(file);
    saveStore(parsed);
    setStore(parsed);
    // Notify all other useCourseProgress instances on this page to re-sync
    window.dispatchEvent(new CustomEvent(PROGRESS_IMPORTED_EVENT));
  }, []);

  return {
    isCompleted,
    markComplete,
    markIncomplete,
    getQuizScore,
    saveQuizScore,
    lastVisited,
    setLastVisited,
    completionCount,
    completedLessons,
    exportProgress,
    importProgress,
  };
}
