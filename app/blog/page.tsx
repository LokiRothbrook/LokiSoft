import { Metadata } from "next";
import { getPaginatedPosts, getAllCategories, type SortOption, type CategoryMatchMode } from "@/lib/blog";
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
    difficulty?: string;
    sort?: string;
    categories?: string;
    featured?: string;
    announcement?: string;
    match?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;

  // Parse URL parameters
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const difficultyParam = params.difficulty ? parseInt(params.difficulty, 10) : null;
  const sortParam = (params.sort || "newest") as SortOption;
  const categoriesParam = params.categories ? params.categories.split(",").filter(Boolean) : [];
  const featuredParam = params.featured === "true";
  const announcementParam = params.announcement === "true";
  const matchModeParam = (params.match || "and") as CategoryMatchMode;

  // Validate difficulty
  const safeDifficulty = difficultyParam && difficultyParam >= 1 && difficultyParam <= 5 ? difficultyParam : null;

  // Validate sort
  const validSortOptions: SortOption[] = ["newest", "oldest", "reading_time_asc", "reading_time_desc"];
  const safeSort = validSortOptions.includes(sortParam) ? sortParam : "newest";

  // Validate match mode
  const safeMatchMode: CategoryMatchMode = matchModeParam === "or" ? "or" : "and";

  // Get paginated posts with new filter system
  const { data: posts, pagination } = getPaginatedPosts(page, 20, {
    difficulty: safeDifficulty,
    sort: safeSort,
    categories: categoriesParam,
    categoryMatchMode: safeMatchMode,
    featured: featuredParam,
    announcement: announcementParam,
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
            difficulty: safeDifficulty,
            sort: safeSort,
            categories: categoriesParam,
            featured: featuredParam,
            announcement: announcementParam,
            categoryMatchMode: safeMatchMode,
          }}
        />
      </div>
    </div>
  );
}
