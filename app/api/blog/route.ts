import { NextRequest, NextResponse } from "next/server";
import { getPaginatedPosts, getAllCategories, type SortOption, type CategoryMatchMode } from "@/lib/blog";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Parse query parameters
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
  const categoriesParam = searchParams.get("categories");
  const selectedCategories = categoriesParam ? categoriesParam.split(",").filter(c => c.trim()) : undefined;
  const difficultyParam = searchParams.get("difficulty");
  const sortParam = searchParams.get("sort") as SortOption | null;
  const featuredParam = searchParams.get("featured") === "true";
  const announcementParam = searchParams.get("announcement") === "true";
  const matchParam = searchParams.get("match") as CategoryMatchMode | null;

  // Validate difficulty (1-5 or null)
  const difficulty = difficultyParam ? parseInt(difficultyParam, 10) : null;
  const safeDifficulty = difficulty && difficulty >= 1 && difficulty <= 5 ? difficulty : null;

  // Validate sort option
  const validSortOptions: SortOption[] = ["newest", "oldest", "reading_time_asc", "reading_time_desc"];
  const safeSort = sortParam && validSortOptions.includes(sortParam) ? sortParam : "newest";

  // Validate match mode
  const safeMatchMode: CategoryMatchMode = matchParam === "or" ? "or" : "and";

  const result = getPaginatedPosts(page, limit, {
    categories: selectedCategories,
    difficulty: safeDifficulty,
    sort: safeSort,
    featured: featuredParam || undefined,
    announcement: announcementParam || undefined,
    categoryMatchMode: safeMatchMode,
  });

  const categories = getAllCategories();

  return NextResponse.json({
    posts: result.data,
    pagination: result.pagination,
    categories,
  });
}
