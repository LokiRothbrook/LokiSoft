import { NextRequest, NextResponse } from "next/server";
import { searchPosts } from "@/lib/blog";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  // Parse query parameters
  const query = searchParams.get("q") || "";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));

  // Perform search
  const result = searchPosts(query, page, limit);

  return NextResponse.json({
    posts: result.data,
    pagination: result.pagination,
    query,
  });
}
