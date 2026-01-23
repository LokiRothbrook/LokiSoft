"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, X, Loader2, Star, SortAsc, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import type { Post, PaginationInfo, PostFilterType, SortOption } from "@/lib/blog";

interface BlogFiltersProps {
  categories: { name: string; count: number }[];
  initialFilters: {
    filterType: PostFilterType;
    category: string | null;
    difficulty: number | null;
    sort: SortOption;
  };
  onSearchResults: (posts: Post[], pagination: PaginationInfo | null, isSearching: boolean, query?: string) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "reading_time_asc", label: "Shortest Read" },
  { value: "reading_time_desc", label: "Longest Read" },
];

const difficultyLabels = ["Any", "Beginner", "Easy", "Intermediate", "Advanced", "Expert"];

export function BlogFilters({ categories, initialFilters, onSearchResults }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filterType, setFilterType] = useState<PostFilterType>(initialFilters.filterType);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilters.category || "");
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(initialFilters.difficulty);
  const [selectedSort, setSelectedSort] = useState<SortOption>(initialFilters.sort);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Build URL with all current filters
  const buildFilterUrl = useCallback((
    type: PostFilterType,
    category: string | null,
    difficulty: number | null,
    sort: SortOption
  ) => {
    const params = new URLSearchParams();

    if (type !== "all") {
      params.set("filter", type);
    }

    if (type === "category" && category) {
      params.set("category", category);
    }

    if (difficulty && difficulty >= 1 && difficulty <= 5) {
      params.set("difficulty", String(difficulty));
    }

    if (sort !== "newest") {
      params.set("sort", sort);
    }

    const queryString = params.toString();
    return queryString ? `/blog?${queryString}` : "/blog";
  }, []);

  // Navigate with updated filters
  const navigateWithFilters = useCallback((
    type: PostFilterType,
    category: string | null,
    difficulty: number | null,
    sort: SortOption
  ) => {
    setSearchQuery("");
    onSearchResults([], null, false, "");
    router.push(buildFilterUrl(type, category, difficulty, sort));
  }, [router, buildFilterUrl, onSearchResults]);

  // Handle filter type change
  const handleFilterTypeChange = useCallback((type: PostFilterType) => {
    setFilterType(type);
    let category: string | null = null;
    if (type === "category") {
      category = selectedCategory || (categories.length > 0 ? categories[0].name : null);
      if (category && !selectedCategory) {
        setSelectedCategory(category);
      }
    } else {
      setSelectedCategory("");
    }
    navigateWithFilters(type, category, selectedDifficulty, selectedSort);
  }, [selectedCategory, categories, selectedDifficulty, selectedSort, navigateWithFilters]);

  // Handle category selection
  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
    navigateWithFilters("category", category, selectedDifficulty, selectedSort);
  }, [selectedDifficulty, selectedSort, navigateWithFilters]);

  // Handle tag chip click (quick category filter)
  const handleTagClick = useCallback((category: string) => {
    setFilterType("category");
    setSelectedCategory(category);
    navigateWithFilters("category", category, selectedDifficulty, selectedSort);
  }, [selectedDifficulty, selectedSort, navigateWithFilters]);

  // Handle difficulty change
  const handleDifficultyChange = useCallback((difficulty: number | null) => {
    setSelectedDifficulty(difficulty);
    const category = filterType === "category" ? selectedCategory : null;
    navigateWithFilters(filterType, category, difficulty, selectedSort);
  }, [filterType, selectedCategory, selectedSort, navigateWithFilters]);

  // Handle sort change
  const handleSortChange = useCallback((sort: SortOption) => {
    setSelectedSort(sort);
    const category = filterType === "category" ? selectedCategory : null;
    navigateWithFilters(filterType, category, selectedDifficulty, sort);
  }, [filterType, selectedCategory, selectedDifficulty, navigateWithFilters]);

  // Debounced search
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      onSearchResults([], null, false, "");
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsSearching(true);

    try {
      const response = await fetch(
        `/api/blog/search?q=${encodeURIComponent(query)}&limit=20`,
        { signal: abortControllerRef.current.signal }
      );

      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();
      onSearchResults(data.posts, data.pagination, true, query);
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Search error:", error);
        onSearchResults([], null, false, "");
      }
    } finally {
      setIsSearching(false);
    }
  }, [onSearchResults]);

  // Handle search input with debounce
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!value.trim()) {
      onSearchResults([], null, false, "");
      return;
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  }, [performSearch, onSearchResults]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery("");
    onSearchResults([], null, false, "");
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, [onSearchResults]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Sync state with URL params
  useEffect(() => {
    const urlFilter = (searchParams.get("filter") || "all") as PostFilterType;
    const urlCategory = searchParams.get("category") || "";
    const urlDifficulty = searchParams.get("difficulty");
    const urlSort = (searchParams.get("sort") || "newest") as SortOption;

    setFilterType(urlFilter);
    setSelectedSort(urlSort);
    setSelectedDifficulty(urlDifficulty ? parseInt(urlDifficulty, 10) : null);
    if (urlFilter === "category" && urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [searchParams]);

  const filterOptions: { type: PostFilterType; label: string }[] = [
    { type: "all", label: "All Posts" },
    { type: "announcements", label: "Announcements" },
    { type: "featured", label: "Featured" },
    { type: "category", label: "Category" },
  ];

  return (
    <div className="space-y-4">
      {/* Compact filter bar */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {/* Main Filters Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border-border/30 hover:bg-muted transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
              {(filterType !== "all" || selectedDifficulty !== null || selectedCategory) && (
                <span className="w-2 h-2 bg-neon-pink rounded-full" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 glass-strong rounded-xl shadow-xl border border-border/30 p-2">
            {/* Filter Type */}
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Content Type
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup value={filterType} onValueChange={(value) => handleFilterTypeChange(value as PostFilterType)}>
                {filterOptions.map((option) => (
                  <DropdownMenuRadioItem
                    key={option.type}
                    value={option.type}
                    className="text-sm"
                  >
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>

            {/* Category Selection (only when category filter is active) */}
            {filterType === "category" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Category
                  </DropdownMenuLabel>
                  <div className="max-h-40 overflow-y-auto">
                    {categories.map((category) => (
                      <DropdownMenuItem
                        key={category.name}
                        onClick={() => handleCategorySelect(category.name)}
                        className={`text-sm ${
                          selectedCategory === category.name
                            ? "bg-neon-purple/20 text-neon-purple"
                            : ""
                        }`}
                      >
                        {category.name}
                        <span className="text-muted-foreground ml-auto">({category.count})</span>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuGroup>
              </>
            )}

            {/* Difficulty Filter */}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Difficulty
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleDifficultyChange(null)}
                className={`text-sm ${
                  selectedDifficulty === null ? "bg-neon-cyan/20 text-neon-cyan" : ""
                }`}
              >
                Any Level
              </DropdownMenuItem>
              {[1, 2, 3, 4, 5].map((level) => (
                <DropdownMenuItem
                  key={level}
                  onClick={() => handleDifficultyChange(level)}
                  className={`text-sm ${
                    selectedDifficulty === level ? "bg-neon-cyan/20 text-neon-cyan" : ""
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < level
                              ? "fill-neon-cyan text-neon-cyan"
                              : "fill-transparent text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2">{difficultyLabels[level]}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            {/* Quick Category Tags */}
            {categories.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Popular Tags
                  </DropdownMenuLabel>
                  <div className="grid grid-cols-2 gap-1">
                    {categories.slice(0, 6).map((category) => (
                      <DropdownMenuItem
                        key={category.name}
                        onClick={() => handleTagClick(category.name)}
                        className={`text-xs px-2 py-1 rounded-md ${
                          filterType === "category" && selectedCategory === category.name
                            ? "bg-neon-purple/20 text-neon-purple"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        {category.name}
                        <span className="text-muted-foreground ml-1">({category.count})</span>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuGroup>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border-border/30 hover:bg-muted transition-colors"
            >
              <SortAsc className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">
                {sortOptions.find(s => s.value === selectedSort)?.label}
              </span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 glass-strong rounded-xl shadow-xl border border-border/30">
            <DropdownMenuRadioGroup value={selectedSort} onValueChange={(value) => handleSortChange(value as SortOption)}>
              {sortOptions.map((option) => (
                <DropdownMenuRadioItem
                  key={option.value}
                  value={option.value}
                  className="text-sm"
                >
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search bar */}
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-9 pr-9 py-2 rounded-xl bg-muted/50 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-pink/50 focus:border-neon-pink/50 transition-all text-sm"
            />
            {isSearching ? (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
            ) : searchQuery ? (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {/* Active filters indicator */}
      {(filterType !== "all" || selectedDifficulty !== null || selectedCategory || searchQuery) && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-muted-foreground">Active filters:</span>

          {/* Filter type badge */}
          {filterType !== "all" && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neon-pink/20 text-neon-pink text-xs font-medium">
              {filterOptions.find(o => o.type === filterType)?.label}
              <button
                onClick={() => handleFilterTypeChange("all")}
                className="ml-1 hover:bg-neon-pink/30 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Category badge */}
          {selectedCategory && filterType === "category" && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neon-purple/20 text-neon-purple text-xs font-medium">
              {selectedCategory}
              <button
                onClick={() => handleCategorySelect("")}
                className="ml-1 hover:bg-neon-purple/30 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Difficulty badge */}
          {selectedDifficulty !== null && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan text-xs font-medium">
              {difficultyLabels[selectedDifficulty]}
              <button
                onClick={() => handleDifficultyChange(null)}
                className="ml-1 hover:bg-neon-cyan/30 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Search badge */}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neon-pink/20 text-neon-pink text-xs font-medium">
              Search: "{searchQuery}"
              <button
                onClick={clearSearch}
                className="ml-1 hover:bg-neon-pink/30 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Search mode indicator */}
      {searchQuery && (
        <p className="text-sm text-muted-foreground text-center">
          {isSearching ? "Searching..." : `Showing results for "${searchQuery}"`}
        </p>
      )}
    </div>
  );
}
