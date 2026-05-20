import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

const coursesDirectory = path.join(process.cwd(), "courses");

const sanitizeSchema: typeof defaultSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [
      ...(defaultSchema.attributes?.div || []),
      "data-info-box", "data-title", "data-toggle-box",
      "data-quiz-group", "data-quiz-question", "data-quiz-option",
      "data-correct", "data-explanation",
      "data-quiz-score-anchor",
      "dataInfoBox", "dataTitle", "dataToggleBox",
      "dataQuizScoreAnchor",
      "dataQuizGroup", "dataQuizQuestion", "dataQuizOption",
      "dataCorrect", "dataExplanation", "className",
    ],
    a: [...(defaultSchema.attributes?.a || []), "class", "className"],
    span: [...(defaultSchema.attributes?.span || []), "className"],
    h1: [...(defaultSchema.attributes?.h1 || []), "id", "className"],
    h2: [...(defaultSchema.attributes?.h2 || []), "id", "className"],
    h3: [...(defaultSchema.attributes?.h3 || []), "id", "className"],
    h4: [...(defaultSchema.attributes?.h4 || []), "id", "className"],
    h5: [...(defaultSchema.attributes?.h5 || []), "id", "className"],
    h6: [...(defaultSchema.attributes?.h6 || []), "id", "className"],
    th: [...(defaultSchema.attributes?.th || []), "align"],
    td: [...(defaultSchema.attributes?.td || []), "align"],
    code: [...(defaultSchema.attributes?.code || []), "className", "class"],
    pre: [...(defaultSchema.attributes?.pre || []), "className", "class"],
    math: ["xmlns", "display"],
    annotation: ["encoding"],
    p: [...(defaultSchema.attributes?.p || []), "className"],
    ul: [...(defaultSchema.attributes?.ul || []), "className"],
    ol: [...(defaultSchema.attributes?.ol || []), "className"],
    li: [...(defaultSchema.attributes?.li || []), "className"],
    input: ["type", "checked", "disabled"],
    "*": [...(defaultSchema.attributes?.["*"] || []), "id"],
  },
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "br", "input",
    "math", "semantics", "mrow", "mi", "mo", "mn", "msup", "msub", "mfrac",
    "msqrt", "mroot", "mtable", "mtr", "mtd", "mtext", "mspace", "annotation",
    "mover", "munder", "munderover", "menclose", "mpadded", "mphantom",
  ],
  protocols: {
    ...defaultSchema.protocols,
    href: ["http", "https", "mailto"],
    src: ["http", "https"],
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CategoryMeta {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  body: string;
}

export interface CourseMeta {
  slug: string;
  categorySlug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  difficulty: number;
  estimatedHours: number;
  /** Each entry is "categorySlug/courseSlug" */
  prerequisites: string[];
  order: number;
  body: string;
}

export interface LessonMeta {
  slug: string;
  title: string;
  lessonNumber: number;
  isQuiz: boolean;
  excerpt: string;
  readingTime: number;
  coverImage?: string;
}

export interface Lesson extends LessonMeta {
  content: string;
  contentHtml?: string;
}

export interface Course extends CourseMeta {
  lessons: LessonMeta[];
}

export interface Category extends CategoryMeta {
  courses: Course[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

function parseLessonNumber(filename: string): number {
  const match = filename.match(/^(\d+)-/);
  return match ? parseInt(match[1], 10) : 999;
}

function isQuizFile(filename: string): boolean {
  return filename.toLowerCase().includes("quiz");
}

// ─── Parsers ─────────────────────────────────────────────────────────────────

function parseCategoryInfo(categorySlug: string): CategoryMeta | null {
  const infoPath = path.join(coursesDirectory, categorySlug, "category-info.md");
  if (!fs.existsSync(infoPath)) return null;

  const { data, content } = matter(fs.readFileSync(infoPath, "utf8"));
  return {
    slug: categorySlug,
    title: String(data.title || categorySlug),
    description: String(data.description || ""),
    icon: String(data.icon || "Folder"),
    color: String(data.color || "cyan"),
    body: content,
  };
}

function parseCourseInfo(categorySlug: string, courseSlug: string): CourseMeta | null {
  const infoPath = path.join(coursesDirectory, categorySlug, courseSlug, "course-info.md");
  if (!fs.existsSync(infoPath)) return null;

  const { data, content } = matter(fs.readFileSync(infoPath, "utf8"));
  return {
    slug: courseSlug,
    categorySlug,
    title: String(data.title || courseSlug),
    description: String(data.description || ""),
    icon: String(data.icon || "BookOpen"),
    color: String(data.color || "cyan"),
    difficulty: Math.min(5, Math.max(1, Number(data.difficulty) || 1)),
    estimatedHours: Number(data.estimatedHours) || 0,
    prerequisites: Array.isArray(data.prerequisites)
      ? data.prerequisites.map(String)
      : [],
    order: Number(data.order) || 999,
    body: content,
  };
}

function getLessonsForCourse(categorySlug: string, courseSlug: string): LessonMeta[] {
  const lessonsDir = path.join(coursesDirectory, categorySlug, courseSlug, "lessons");
  if (!fs.existsSync(lessonsDir)) return [];

  const files = fs.readdirSync(lessonsDir).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const fullPath = path.join(lessonsDir, filename);
      const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));

      return {
        slug,
        title: String(data.title || slug),
        lessonNumber: parseLessonNumber(filename),
        isQuiz: isQuizFile(filename),
        excerpt: String(data.excerpt || content.slice(0, 160) + "..."),
        readingTime: calculateReadingTime(content),
        coverImage: data.coverImage ? String(data.coverImage) : undefined,
      } satisfies LessonMeta;
    })
    .sort((a, b) => a.lessonNumber - b.lessonNumber);
}

// ─── Cache ────────────────────────────────────────────────────────────────────

let _categoriesCache: Category[] | undefined;

// ─── Public API ───────────────────────────────────────────────────────────────

export function getAllCategories(): Category[] {
  if (_categoriesCache) return _categoriesCache;
  if (!fs.existsSync(coursesDirectory)) {
    _categoriesCache = [];
    return _categoriesCache;
  }

  const entries = fs.readdirSync(coursesDirectory, { withFileTypes: true });

  _categoriesCache = entries
    .filter((e) => e.isDirectory())
    .map((e) => {
      const categoryMeta = parseCategoryInfo(e.name);
      if (!categoryMeta) return null;

      const courseEntries = fs.readdirSync(
        path.join(coursesDirectory, e.name),
        { withFileTypes: true }
      );

      const courses: Course[] = courseEntries
        .filter((ce) => ce.isDirectory())
        .map((ce) => {
          const meta = parseCourseInfo(e.name, ce.name);
          if (!meta) return null;
          return { ...meta, lessons: getLessonsForCourse(e.name, ce.name) };
        })
        .filter((c): c is Course => c !== null)
        .sort((a, b) => a.order - b.order);

      return { ...categoryMeta, courses };
    })
    .filter((c): c is Category => c !== null);

  return _categoriesCache;
}

export function getAllCourses(): Course[] {
  return getAllCategories().flatMap((cat) => cat.courses);
}

export function getCategoryBySlug(categorySlug: string): Category | null {
  return getAllCategories().find((c) => c.slug === categorySlug) ?? null;
}

export function getCourseBySlug(categorySlug: string, courseSlug: string): Course | null {
  const category = getCategoryBySlug(categorySlug);
  return category?.courses.find((c) => c.slug === courseSlug) ?? null;
}

/** Resolve prerequisite strings ("categorySlug/courseSlug") to Course objects. */
export function resolvePrerequisites(prerequisites: string[]): Course[] {
  return prerequisites
    .map((pre) => {
      const [catSlug, courseSlug] = pre.split("/");
      if (!catSlug || !courseSlug) return null;
      return getCourseBySlug(catSlug, courseSlug);
    })
    .filter((c): c is Course => c !== null);
}

export function getLessonBySlug(
  categorySlug: string,
  courseSlug: string,
  lessonSlug: string
): Lesson | null {
  const lessonPath = path.join(
    coursesDirectory, categorySlug, courseSlug, "lessons", `${lessonSlug}.md`
  );
  if (!fs.existsSync(lessonPath)) return null;

  const { data, content } = matter(fs.readFileSync(lessonPath, "utf8"));
  const filename = `${lessonSlug}.md`;

  return {
    slug: lessonSlug,
    title: String(data.title || lessonSlug),
    lessonNumber: parseLessonNumber(filename),
    isQuiz: isQuizFile(filename),
    excerpt: String(data.excerpt || content.slice(0, 160) + "..."),
    readingTime: calculateReadingTime(content),
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    content,
  };
}

const lessonHtmlCache = new Map<string, { html: string; mtime: number }>();

export async function getLessonWithHtml(
  categorySlug: string,
  courseSlug: string,
  lessonSlug: string
): Promise<Lesson | null> {
  const lesson = getLessonBySlug(categorySlug, courseSlug, lessonSlug);
  if (!lesson) return null;

  const lessonPath = path.join(
    coursesDirectory, categorySlug, courseSlug, "lessons", `${lessonSlug}.md`
  );
  const cacheKey = `${categorySlug}/${courseSlug}/${lessonSlug}`;

  let mtime = 0;
  try { mtime = fs.statSync(lessonPath).mtimeMs; } catch { /* ignore */ }

  const cached = lessonHtmlCache.get(cacheKey);
  if (cached && cached.mtime === mtime) {
    return { ...lesson, contentHtml: cached.html };
  }

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeKatex)
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(lesson.content);

  const html = processedContent.toString();
  lessonHtmlCache.set(cacheKey, { html, mtime });
  return { ...lesson, contentHtml: html };
}

export function getAdjacentLessons(
  categorySlug: string,
  courseSlug: string,
  lessonSlug: string
): { prev: LessonMeta | null; next: LessonMeta | null } {
  const lessons = getLessonsForCourse(categorySlug, courseSlug);
  const idx = lessons.findIndex((l) => l.slug === lessonSlug);
  return {
    prev: idx > 0 ? lessons[idx - 1] : null,
    next: idx < lessons.length - 1 ? lessons[idx + 1] : null,
  };
}
