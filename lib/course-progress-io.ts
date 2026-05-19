export const STORAGE_KEY = "lokisoft-course-progress";
export const SCHEMA_VERSION = 1 as const;

/** Fired on the window after a successful import so all hook instances re-sync. */
export const PROGRESS_IMPORTED_EVENT = "lokisoft-progress-imported";

const MAX_IMPORT_BYTES = 512 * 1024; // 512 KB
const MAX_COURSES = 100;
const MAX_LESSONS_PER_COURSE = 500;
const SLUG_RE = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]$/;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QuizAttempt {
  bestScore: number;   // 0–100 percentage
  attempts: number;
  lastAttempt: string; // ISO date string
}

export interface CourseProgressData {
  completedLessons: string[];
  quizScores: Record<string, QuizAttempt>;
  lastVisited: string | null;
}

export interface ProgressStore {
  version: typeof SCHEMA_VERSION;
  courses: Record<string, CourseProgressData>;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

export function defaultStore(): ProgressStore {
  return { version: SCHEMA_VERSION, courses: {} };
}

export function defaultCourseData(): CourseProgressData {
  return { completedLessons: [], quizScores: {}, lastVisited: null };
}

// ─── localStorage helpers ─────────────────────────────────────────────────────

export function loadStore(): ProgressStore {
  if (typeof window === "undefined") return defaultStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStore();
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== SCHEMA_VERSION) return defaultStore();
    return parsed as ProgressStore;
  } catch {
    return defaultStore();
  }
}

export function saveStore(store: ProgressStore): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // quota exceeded or private browsing — silently ignore
  }
}

// ─── Validation / sanitisation ────────────────────────────────────────────────

function isSlug(v: unknown): v is string {
  return typeof v === "string" && v.length >= 1 && v.length <= 200 && SLUG_RE.test(v);
}

function isISODate(v: unknown): v is string {
  if (typeof v !== "string" || v.length > 30) return false;
  const d = new Date(v);
  return !isNaN(d.getTime());
}

function sanitizeAttempt(v: unknown): QuizAttempt | null {
  if (!v || typeof v !== "object" || Array.isArray(v)) return null;
  const o = v as Record<string, unknown>;

  const bestScore =
    typeof o.bestScore === "number" && isFinite(o.bestScore)
      ? Math.min(100, Math.max(0, Math.round(o.bestScore)))
      : 0;

  const attempts =
    typeof o.attempts === "number" && isFinite(o.attempts) && o.attempts >= 0
      ? Math.floor(o.attempts)
      : 0;

  const lastAttempt = isISODate(o.lastAttempt)
    ? (o.lastAttempt as string)
    : new Date().toISOString();

  return { bestScore, attempts, lastAttempt };
}

function sanitizeCourseData(v: unknown): CourseProgressData {
  if (!v || typeof v !== "object" || Array.isArray(v)) return defaultCourseData();
  const o = v as Record<string, unknown>;

  const completedLessons: string[] = Array.isArray(o.completedLessons)
    ? o.completedLessons.filter(isSlug).slice(0, MAX_LESSONS_PER_COURSE)
    : [];

  const quizScores: Record<string, QuizAttempt> = {};
  if (o.quizScores && typeof o.quizScores === "object" && !Array.isArray(o.quizScores)) {
    let count = 0;
    for (const [slug, attempt] of Object.entries(o.quizScores as Record<string, unknown>)) {
      if (!isSlug(slug)) continue;
      const s = sanitizeAttempt(attempt);
      if (s) {
        quizScores[slug] = s;
        if (++count >= MAX_LESSONS_PER_COURSE) break;
      }
    }
  }

  const lastVisited = isSlug(o.lastVisited) ? (o.lastVisited as string) : null;

  return { completedLessons, quizScores, lastVisited };
}

/**
 * Parses an unknown value and returns a sanitized ProgressStore.
 * Throws a user-readable Error if the top-level structure is invalid.
 * Individual malformed fields are silently dropped/clamped rather than
 * causing the entire import to fail.
 */
export function validateProgressStore(raw: unknown): ProgressStore {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error("Invalid progress file format.");
  }
  const obj = raw as Record<string, unknown>;

  if (obj.version !== SCHEMA_VERSION) {
    throw new Error("Incompatible progress file version.");
  }

  if (!obj.courses || typeof obj.courses !== "object" || Array.isArray(obj.courses)) {
    throw new Error("Invalid progress file format.");
  }

  const courses: Record<string, CourseProgressData> = {};
  let courseCount = 0;
  for (const [slug, data] of Object.entries(obj.courses as Record<string, unknown>)) {
    if (!isSlug(slug)) continue;
    courses[slug] = sanitizeCourseData(data);
    if (++courseCount >= MAX_COURSES) break;
  }

  return { version: SCHEMA_VERSION, courses };
}

// ─── Export / Import ──────────────────────────────────────────────────────────

/** Downloads the full progress store (all courses) as a JSON file. */
export function exportAllProgress(): void {
  const data = loadStore();
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `lokisoft-progress-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Reads a File, validates its contents, and returns a sanitized ProgressStore.
 * Rejects with a user-readable Error on any problem.
 */
export function parseImportFile(file: File): Promise<ProgressStore> {
  return new Promise((resolve, reject) => {
    if (file.size > MAX_IMPORT_BYTES) {
      reject(new Error(`File too large (max ${MAX_IMPORT_BYTES / 1024} KB).`));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const raw = JSON.parse(e.target?.result as string);
        resolve(validateProgressStore(raw));
      } catch (err) {
        reject(err instanceof Error ? err : new Error("Invalid progress file."));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsText(file);
  });
}
