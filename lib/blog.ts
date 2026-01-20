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

// Custom sanitization schema that extends the default GitHub schema
// SECURITY: This schema is carefully designed to allow only necessary attributes
// while protecting against XSS, CSS injection, and other attacks
// Note: data-* attributes in HTML are converted to camelCase in HAST (e.g., data-info-box -> dataInfoBox)
const sanitizeSchema: typeof defaultSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    // Allow ONLY our specific custom data attributes on divs (no style to prevent CSS injection)
    div: [
      ...(defaultSchema.attributes?.div || []),
      // Kebab-case (as written in HTML)
      "data-info-box",
      "data-title",
      "data-toggle-box",
      "data-quiz-group",
      "data-quiz-question",
      "data-quiz-option",
      "data-correct",
      "data-explanation",
      // CamelCase (as parsed by rehype)
      "dataInfoBox",
      "dataTitle",
      "dataToggleBox",
      "dataQuizGroup",
      "dataQuizQuestion",
      "dataQuizOption",
      "dataCorrect",
      "dataExplanation",
      "className",
    ],
    // Allow class on <a> tags for styling (href is already allowed by default schema)
    a: [...(defaultSchema.attributes?.a || []), "class", "className"],
    // Allow className on span for inline styling classes only
    span: [...(defaultSchema.attributes?.span || []), "className"],
    // Headings: allow id for anchor links, className for styling
    h1: [...(defaultSchema.attributes?.h1 || []), "id", "className"],
    h2: [...(defaultSchema.attributes?.h2 || []), "id", "className"],
    h3: [...(defaultSchema.attributes?.h3 || []), "id", "className"],
    h4: [...(defaultSchema.attributes?.h4 || []), "id", "className"],
    h5: [...(defaultSchema.attributes?.h5 || []), "id", "className"],
    h6: [...(defaultSchema.attributes?.h6 || []), "id", "className"],
    // Allow align on table elements (GFM tables) - no style
    th: [...(defaultSchema.attributes?.th || []), "align"],
    td: [...(defaultSchema.attributes?.td || []), "align"],
    // Allow class on code for syntax highlighting
    code: [...(defaultSchema.attributes?.code || []), "className", "class"],
    pre: [...(defaultSchema.attributes?.pre || []), "className", "class"],
    // Allow KaTeX-related attributes (math rendering)
    math: ["xmlns", "display"],
    annotation: ["encoding"],
    // Paragraphs and lists - only className, no style
    p: [...(defaultSchema.attributes?.p || []), "className"],
    ul: [...(defaultSchema.attributes?.ul || []), "className"],
    ol: [...(defaultSchema.attributes?.ol || []), "className"],
    li: [...(defaultSchema.attributes?.li || []), "className"],
    // Input for task lists (checkboxes)
    input: ["type", "checked", "disabled"],
    // SECURITY: Only allow id globally, NO wildcard data-* pattern
    // This prevents arbitrary data attribute injection
    "*": [
      ...(defaultSchema.attributes?.["*"] || []),
      "id",
    ],
  },
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "br",     // Allow break tag
    "input",  // Allow for task list checkboxes
    // KaTeX elements for math rendering
    "math", "semantics", "mrow", "mi", "mo", "mn", "msup", "msub", "mfrac",
    "msqrt", "mroot", "mtable", "mtr", "mtd", "mtext", "mspace", "annotation",
    "mover", "munder", "munderover", "menclose", "mpadded", "mphantom",
  ],
  // SECURITY: Disallow dangerous protocols in URLs
  protocols: {
    ...defaultSchema.protocols,
    href: ["http", "https", "mailto"],
    src: ["http", "https"],
  },
};

const postsDirectory = path.join(process.cwd(), "posts");

// In-memory cache for processed HTML content
// Cache is invalidated when the server restarts (which is fine for static blog posts)
const htmlCache = new Map<string, { html: string; headings: TocHeading[]; mtime: number }>();

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  categories: string[];
  difficulty: number;
  featured: boolean;
  announcement: boolean;
  coverImage?: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  categories: string[];
  difficulty: number;
  featured: boolean;
  announcement: boolean;
  coverImage?: string;
  readingTime: number;
  content: string;
  contentHtml?: string;
  headings?: TocHeading[];
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function ensurePostsDirectory(): void {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

function parseCategories(categories: unknown): string[] {
  if (!categories) return [];
  if (Array.isArray(categories)) return categories.map(String);
  if (typeof categories === "string") {
    return categories.split(",").map((c) => c.trim()).filter(Boolean);
  }
  return [];
}

function parseFrontmatter(data: Record<string, unknown>, content: string): Omit<Post, "slug" | "contentHtml" | "headings"> {
  return {
    title: String(data.title || "Untitled"),
    date: String(data.date || new Date().toISOString().split("T")[0]),
    author: String(data.author || "LokiSoft Team"),
    excerpt: String(data.excerpt || content.slice(0, 160) + "..."),
    categories: parseCategories(data.categories || data.category),
    difficulty: Math.min(5, Math.max(1, Number(data.difficulty) || 1)),
    featured: Boolean(data.featured),
    announcement: Boolean(data.announcement),
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    readingTime: calculateReadingTime(content),
    content,
  };
}

function extractHeadings(content: string): TocHeading[] {
  const headingRegex = /^(#{2,6})\s+(.+)$/gm;
  const headings: TocHeading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // Match github-slugger algorithm used by rehype-slug
    const id = text
      .toLowerCase()
      .trim()
      .replace(/[^a-z\d -]/g, "")
      .replace(/ /g, "-");
    headings.push({ id, text, level });
  }

  return headings;
}

export function getAllPosts(): Post[] {
  ensurePostsDirectory();

  const fileNames = fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md"));

  const posts = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        ...parseFrontmatter(data, content),
      };
    })
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  ensurePostsDirectory();

  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    ...parseFrontmatter(data, content),
  };
}

export async function getPostWithHtml(slug: string): Promise<Post | null> {
  const post = getPostBySlug(slug);

  if (!post) {
    return null;
  }

  const fullPath = path.join(postsDirectory, `${slug}.md`);

  // Check cache validity based on file modification time
  let mtime = 0;
  try {
    const stats = fs.statSync(fullPath);
    mtime = stats.mtimeMs;
  } catch {
    // File doesn't exist, proceed without caching
  }

  // Check if we have valid cached content
  const cached = htmlCache.get(slug);
  if (cached && cached.mtime === mtime) {
    return {
      ...post,
      contentHtml: cached.html,
      headings: cached.headings,
    };
  }

  // Process markdown
  const headings = extractHeadings(post.content);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeKatex)
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(post.content);

  const html = processedContent.toString();

  // Cache the result
  htmlCache.set(slug, { html, headings, mtime });

  return {
    ...post,
    contentHtml: html,
    headings,
  };
}

export function getFeaturedPosts(limit?: number): Post[] {
  const posts = getAllPosts().filter((post) => post.featured);
  return limit ? posts.slice(0, limit) : posts;
}

export function getAnnouncements(limit?: number): Post[] {
  const posts = getAllPosts().filter((post) => post.announcement);
  return limit ? posts.slice(0, limit) : posts;
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) =>
    post.categories.some((c) => c.toLowerCase() === category.toLowerCase())
  );
}

export function getAllCategories(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    post.categories.forEach((category) => {
      const normalized = category.toLowerCase();
      categoryMap.set(normalized, (categoryMap.get(normalized) || 0) + 1);
    });
  });

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsForSearch(): {
  slug: string;
  title: string;
  excerpt: string;
  categories: string[];
}[] {
  return getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    categories: post.categories,
  }));
}
