"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "lokisoft-course-progress";
const SCHEMA_VERSION = 1;

export interface QuizAttempt {
  bestScore: number;   // 0–100 percentage
  attempts: number;
  lastAttempt: string; // ISO date string
}

interface CourseProgressData {
  completedLessons: string[];
  quizScores: Record<string, QuizAttempt>;
  lastVisited: string | null;
}

interface ProgressStore {
  version: typeof SCHEMA_VERSION;
  courses: Record<string, CourseProgressData>;
}

function defaultStore(): ProgressStore {
  return { version: SCHEMA_VERSION, courses: {} };
}

function defaultCourseData(): CourseProgressData {
  return { completedLessons: [], quizScores: {}, lastVisited: null };
}

function loadStore(): ProgressStore {
  if (typeof window === "undefined") return defaultStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStore();
    const parsed = JSON.parse(raw) as ProgressStore;
    if (parsed.version !== SCHEMA_VERSION) return defaultStore();
    return parsed;
  } catch {
    return defaultStore();
  }
}

function saveStore(store: ProgressStore): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // quota exceeded or private browsing — silently ignore
  }
}

export function useCourseProgress(courseSlug: string) {
  const [store, setStore] = useState<ProgressStore>(defaultStore);

  // Load from localStorage on mount
  useEffect(() => {
    setStore(loadStore());
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

  const exportProgress = useCallback(() => {
    const data = loadStore();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lokisoft-progress-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const importProgress = useCallback(
    (file: File): Promise<void> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const parsed = JSON.parse(e.target?.result as string) as ProgressStore;
            if (parsed.version !== SCHEMA_VERSION) {
              reject(new Error("Incompatible progress file version."));
              return;
            }
            saveStore(parsed);
            setStore(parsed);
            resolve();
          } catch {
            reject(new Error("Invalid progress file."));
          }
        };
        reader.onerror = () => reject(new Error("Failed to read file."));
        reader.readAsText(file);
      });
    },
    []
  );

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
