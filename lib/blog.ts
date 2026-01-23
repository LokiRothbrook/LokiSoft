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

// ============================================
// Pagination Types and Helpers
// ============================================

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationInfo;
}

export type PostFilterType = "all" | "featured" | "announcements" | "category";
export type SortOption = "newest" | "oldest" | "reading_time_asc" | "reading_time_desc";

export interface PostFilters {
  filterType?: PostFilterType;
  category?: string;
  query?: string;
  difficulty?: number | null; // 1-5 or null for any
  sort?: SortOption;
}

/**
 * Get paginated posts with optional filtering
 */
export function getPaginatedPosts(
  page: number = 1,
  limit: number = 20,
  filters: PostFilters = {}
): PaginatedResult<Post> {
  let posts = getAllPosts();

  // Apply filter type
  if (filters.filterType === "featured") {
    posts = posts.filter((post) => post.featured);
  } else if (filters.filterType === "announcements") {
    posts = posts.filter((post) => post.announcement);
  }

  // Apply category filter
  if (filters.category) {
    const categoryLower = filters.category.toLowerCase();
    posts = posts.filter((post) =>
      post.categories.some((c) => c.toLowerCase() === categoryLower)
    );
  }

  // Apply difficulty filter
  if (filters.difficulty && filters.difficulty >= 1 && filters.difficulty <= 5) {
    posts = posts.filter((post) => post.difficulty === filters.difficulty);
  }

  // Apply search query (basic text search on title and excerpt)
  if (filters.query) {
    const searchTerms = filters.query.toLowerCase().trim().split(/\s+/);
    posts = posts.filter((post) => {
      const searchableText = `${post.title} ${post.excerpt}`.toLowerCase();
      return searchTerms.every((term) => searchableText.includes(term));
    });
  }

  // Apply sorting
  const sortOption = filters.sort || "newest";
  switch (sortOption) {
    case "oldest":
      posts = posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      break;
    case "reading_time_asc":
      posts = posts.sort((a, b) => a.readingTime - b.readingTime);
      break;
    case "reading_time_desc":
      posts = posts.sort((a, b) => b.readingTime - a.readingTime);
      break;
    case "newest":
    default:
      // Already sorted by newest in getAllPosts()
      break;
  }

  // Calculate pagination
  const total = posts.length;
  const totalPages = Math.ceil(total / limit);
  const safePage = Math.max(1, Math.min(page, totalPages || 1));
  const startIndex = (safePage - 1) * limit;
  const paginatedPosts = posts.slice(startIndex, startIndex + limit);

  return {
    data: paginatedPosts,
    pagination: {
      page: safePage,
      limit,
      total,
      totalPages,
      hasNext: safePage < totalPages,
      hasPrev: safePage > 1,
    },
  };
}

/**
 * Search posts with pagination - searches title, excerpt, and content
 */
export function searchPosts(
  query: string,
  page: number = 1,
  limit: number = 20
): PaginatedResult<Post> {
  if (!query.trim()) {
    return getPaginatedPosts(page, limit);
  }

  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  const allPosts = getAllPosts();

  // Score posts by relevance (title matches weighted higher)
  const scoredPosts = allPosts
    .map((post) => {
      const titleLower = post.title.toLowerCase();
      const excerptLower = post.excerpt.toLowerCase();
      const contentLower = post.content.toLowerCase();

      let score = 0;
      let allTermsMatch = true;

      for (const term of searchTerms) {
        const titleMatch = titleLower.includes(term);
        const excerptMatch = excerptLower.includes(term);
        const contentMatch = contentLower.includes(term);

        if (!titleMatch && !excerptMatch && !contentMatch) {
          allTermsMatch = false;
          break;
        }

        // Weight: title > excerpt > content
        if (titleMatch) score += 10;
        if (excerptMatch) score += 5;
        if (contentMatch) score += 1;
      }

      return { post, score, matches: allTermsMatch };
    })
    .filter((item) => item.matches)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.post);

  // Calculate pagination
  const total = scoredPosts.length;
  const totalPages = Math.ceil(total / limit);
  const safePage = Math.max(1, Math.min(page, totalPages || 1));
  const startIndex = (safePage - 1) * limit;
  const paginatedPosts = scoredPosts.slice(startIndex, startIndex + limit);

  return {
    data: paginatedPosts,
    pagination: {
      page: safePage,
      limit,
      total,
      totalPages,
      hasNext: safePage < totalPages,
      hasPrev: safePage > 1,
    },
  };
}

// ============================================
// Related Posts
// ============================================

/**
 * Calculate word overlap similarity between two strings (0-1)
 */
function calculateTitleSimilarity(title1: string, title2: string): number {
  const words1 = new Set(
    title1.toLowerCase().split(/\s+/).filter(w => w.length > 3)
  );
  const words2 = new Set(
    title2.toLowerCase().split(/\s+/).filter(w => w.length > 3)
  );

  if (words1.size === 0 || words2.size === 0) return 0;

  let overlap = 0;
  words1.forEach(word => {
    if (words2.has(word)) overlap++;
  });

  return overlap / Math.max(words1.size, words2.size);
}

/**
 * Calculate relevance score between two posts
 */
function calculateRelevanceScore(current: Post, candidate: Post): number {
  // Category overlap (10 points per shared category)
  const currentCategories = current.categories.map(c => c.toLowerCase());
  const candidateCategories = candidate.categories.map(c => c.toLowerCase());
  const sharedCategories = currentCategories.filter(c =>
    candidateCategories.includes(c)
  ).length;
  const categoryScore = sharedCategories * 10;

  // Title similarity (0-5 points)
  const titleScore = calculateTitleSimilarity(current.title, candidate.title) * 5;

  // Recency bonus (posts closer in date get bonus)
  const currentDate = new Date(current.date).getTime();
  const candidateDate = new Date(candidate.date).getTime();
  const daysDiff = Math.abs(currentDate - candidateDate) / (1000 * 60 * 60 * 24);
  const recencyScore = daysDiff < 30 ? 3 : daysDiff < 90 ? 1 : 0;

  // Same difficulty level bonus
  const difficultyScore = current.difficulty === candidate.difficulty ? 2 : 0;

  return categoryScore + titleScore + recencyScore + difficultyScore;
}

/**
 * Get related posts for a given post
 */
export function getRelatedPosts(currentSlug: string, limit: number = 4): Post[] {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find(p => p.slug === currentSlug);

  if (!currentPost) return [];

  return allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => ({
      post,
      score: calculateRelevanceScore(currentPost, post),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}
