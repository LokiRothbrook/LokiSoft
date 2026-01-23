import { Metadata } from "next";
import { getPaginatedPosts, getAllCategories, type PostFilterType, type SortOption } from "@/lib/blog";
import { SectionTitle } from "@/components/ui/hero-card";
import { BlogPageClient } from "./blog-page-client";

export const metadata: Metadata = {
  title: "Blog",
  description: "Explore our latest articles, tutorials, and insights on web development, self-hosting, and more.",
};

// ISR: Revalidate every hour
export const revalidate = 3600;

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    filter?: string;
    category?: string;
    difficulty?: string;
    sort?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;

  // Parse URL parameters
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const filterType = (params.filter || "all") as PostFilterType;
  const category = params.category || undefined;
  const difficultyParam = params.difficulty ? parseInt(params.difficulty, 10) : null;
  const sortParam = (params.sort || "newest") as SortOption;

  // Validate filter type
  const validFilterTypes: PostFilterType[] = ["all", "featured", "announcements", "category"];
  const safeFilterType = validFilterTypes.includes(filterType) ? filterType : "all";

  // Validate difficulty
  const safeDifficulty = difficultyParam && difficultyParam >= 1 && difficultyParam <= 5 ? difficultyParam : null;

  // Validate sort
  const validSortOptions: SortOption[] = ["newest", "oldest", "reading_time_asc", "reading_time_desc"];
  const safeSort = validSortOptions.includes(sortParam) ? sortParam : "newest";

  // Get paginated posts
  const { data: posts, pagination } = getPaginatedPosts(page, 20, {
    filterType: safeFilterType,
    category,
    difficulty: safeDifficulty,
    sort: safeSort,
  });

  // Get categories for filters
  const categories = getAllCategories();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Blog"
          subtitle="Explore our latest articles, tutorials, and insights"
        />

        <BlogPageClient
          initialPosts={posts}
          pagination={pagination}
          categories={categories}
          initialFilters={{
            filterType: safeFilterType,
            category: category || null,
            difficulty: safeDifficulty,
            sort: safeSort,
          }}
        />
      </div>
    </div>
  );
}
