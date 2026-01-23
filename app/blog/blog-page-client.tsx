"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Calendar, User, Clock, Star, ArrowRight, Tag } from "lucide-react";
import { GlassCard } from "@/components/ui/hero-card";
import { CoverImage } from "@/components/ui/cover-image";
import { PaginationControls } from "@/components/blog";
import { BlogFilters } from "./blog-filters";
import type { Post, PaginationInfo, PostFilterType, SortOption } from "@/lib/blog";

interface BlogPageClientProps {
  initialPosts: Post[];
  pagination: PaginationInfo;
  categories: { name: string; count: number }[];
  initialFilters: {
    filterType: PostFilterType;
    category: string | null;
    difficulty: number | null;
    sort: SortOption;
  };
}

function DifficultyStars({ difficulty }: { difficulty: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground">Difficulty</span>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < difficulty
                ? "fill-neon-cyan text-neon-cyan"
                : "fill-transparent text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Highlight matching search terms in text
function HighlightedText({ text, searchQuery }: { text: string; searchQuery: string }) {
  if (!searchQuery.trim()) {
    return <>{text}</>;
  }

  const terms = searchQuery.toLowerCase().trim().split(/\s+/).filter(t => t.length > 0);
  if (terms.length === 0) {
    return <>{text}</>;
  }

  // Create regex pattern for all terms
  const pattern = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = terms.some(term => part.toLowerCase() === term);
        return isMatch ? (
          <mark key={i} className="bg-neon-pink/30 text-foreground rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

export function BlogPageClient({
  initialPosts,
  pagination,
  categories,
  initialFilters,
}: BlogPageClientProps) {
  // Posts to display - can be overridden by search results
  const [displayPosts, setDisplayPosts] = useState<Post[]>(initialPosts);
  const [displayPagination, setDisplayPagination] = useState<PaginationInfo>(pagination);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Reset display when initial posts change (page navigation)
  useEffect(() => {
    if (!isSearchMode) {
      setDisplayPosts(initialPosts);
      setDisplayPagination(pagination);
    }
  }, [initialPosts, pagination, isSearchMode]);

  // Handle search results from BlogFilters
  const handleSearchResults = useCallback((posts: Post[], paginationInfo: PaginationInfo | null, searching: boolean, query?: string) => {
    setIsSearchMode(searching);
    setSearchQuery(query || "");
    if (searching && paginationInfo) {
      setDisplayPosts(posts);
      setDisplayPagination(paginationInfo);
    } else {
      setDisplayPosts(initialPosts);
      setDisplayPagination(pagination);
    }
  }, [initialPosts, pagination]);

  const categoryColors = ["neon-pink", "neon-purple", "neon-blue", "neon-cyan"];

  return (
    <>
      {/* Filters */}
      <div className="mb-8">
        <BlogFilters
          categories={categories}
          initialFilters={initialFilters}
          onSearchResults={handleSearchResults}
        />
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <GlassCard className="h-full group cursor-pointer" glow="purple">
              {/* Cover Image */}
              <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
                <CoverImage
                  src={post.coverImage}
                  alt={post.title}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.announcement && (
                  <span className="text-xs px-2 py-1 rounded-full bg-neon-pink/20 text-neon-pink font-medium">
                    Announcement
                  </span>
                )}
                {post.featured && (
                  <span className="text-xs px-2 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan font-medium">
                    Featured
                  </span>
                )}
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.categories.slice(0, 3).map((category, i) => (
                  <span
                    key={category}
                    className={`text-xs px-2 py-1 rounded-full bg-${categoryColors[i % categoryColors.length]}/10 text-${categoryColors[i % categoryColors.length]}`}
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold mb-2 group-hover:text-neon-pink transition-colors line-clamp-2">
                <HighlightedText text={post.title} searchQuery={searchQuery} />
              </h2>

              {/* Excerpt */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                <HighlightedText text={post.excerpt} searchQuery={searchQuery} />
              </p>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readingTime} min</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <DifficultyStars difficulty={post.difficulty} />
                <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-neon-pink transition-colors">
                  Read more
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>

      {displayPosts.length === 0 && (
        <div className="text-center py-12">
          <Tag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No posts found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}

      {/* Pagination - only show when not in search mode */}
      {!isSearchMode && displayPosts.length > 0 && (
        <PaginationControls pagination={displayPagination} />
      )}

      {/* Search results pagination */}
      {isSearchMode && displayPosts.length > 0 && displayPagination.totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 mt-8">
          <p className="text-sm text-muted-foreground">
            Found {displayPagination.total} results (showing page {displayPagination.page} of {displayPagination.totalPages})
          </p>
        </div>
      )}
    </>
  );
}
