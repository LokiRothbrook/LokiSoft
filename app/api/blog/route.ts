import { NextRequest, NextResponse } from "next/server";
import { getPaginatedPosts, getAllCategories, type PostFilterType, type SortOption } from "@/lib/blog";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Parse query parameters
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
  const filterType = (searchParams.get("filter") || "all") as PostFilterType;
  const category = searchParams.get("category") || undefined;
  const categoriesParam = searchParams.get("categories");
  const selectedCategories = categoriesParam ? categoriesParam.split(",").filter(c => c.trim()) : undefined;
  const difficultyParam = searchParams.get("difficulty");
  const sortParam = searchParams.get("sort") as SortOption | null;

  // Validate filter type
  const validFilterTypes: PostFilterType[] = ["all", "featured", "announcements", "category"];
  const safeFilterType = validFilterTypes.includes(filterType) ? filterType : "all";

  // Validate difficulty (1-5 or null)
  const difficulty = difficultyParam ? parseInt(difficultyParam, 10) : null;
  const safeDifficulty = difficulty && difficulty >= 1 && difficulty <= 5 ? difficulty : null;

  // Validate sort option
  const validSortOptions: SortOption[] = ["newest", "oldest", "reading_time_asc", "reading_time_desc"];
  const safeSort = sortParam && validSortOptions.includes(sortParam) ? sortParam : "newest";

  // Get paginated posts
  const result = getPaginatedPosts(page, limit, {
    filterType: safeFilterType,
    category,
    categories: selectedCategories,
    difficulty: safeDifficulty,
    sort: safeSort,
  });

  // Get categories for the filters
  const categories = getAllCategories();

  return NextResponse.json({
    posts: result.data,
    pagination: result.pagination,
    categories,
    filters: {
      filterType: safeFilterType,
      category: category || null,
      difficulty: safeDifficulty,
      sort: safeSort,
    },
  });
}
