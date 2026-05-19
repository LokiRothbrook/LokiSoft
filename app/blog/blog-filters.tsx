"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  X,
  Loader2,
  Star,
  SlidersHorizontal,
  HelpCircle,
  Megaphone,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Post, PaginationInfo, SortOption, CategoryMatchMode } from "@/lib/blog";

interface BlogFiltersProps {
  categories: { name: string; count: number }[];
  initialFilters: {
    difficulty: number | null;
    sort: SortOption;
    categories?: string[];
    featured?: boolean;
    announcement?: boolean;
    categoryMatchMode?: CategoryMatchMode;
  };
  onSearchResults: (
    posts: Post[],
    pagination: PaginationInfo | null,
    isSearching: boolean,
    query?: string
  ) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "reading_time_asc", label: "Shortest Read" },
  { value: "reading_time_desc", label: "Longest Read" },
];

const difficultyOptions = [
  { value: "any", label: "Any Level" },
  { value: "1", label: "Beginner" },
  { value: "2", label: "Easy" },
  { value: "3", label: "Intermediate" },
  { value: "4", label: "Advanced" },
  { value: "5", label: "Expert" },
];

export function BlogFilters({
  categories,
  initialFilters,
  onSearchResults,
}: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter state
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(
    initialFilters.difficulty
  );
  const [selectedSort, setSelectedSort] = useState<SortOption>(
    initialFilters.sort
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters.categories || []
  );
  const [showFeatured, setShowFeatured] = useState<boolean>(
    initialFilters.featured || false
  );
  const [showAnnouncements, setShowAnnouncements] = useState<boolean>(
    initialFilters.announcement || false
  );
  const [categoryMatchMode, setCategoryMatchMode] = useState<CategoryMatchMode>(
    initialFilters.categoryMatchMode || "and"
  );

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!categorySearchQuery.trim()) return categories;
    const query = categorySearchQuery.toLowerCase();
    return categories.filter((cat) => cat.name.toLowerCase().includes(query));
  }, [categories, categorySearchQuery]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedDifficulty !== null) count++;
    if (selectedSort !== "newest") count++;
    if (selectedCategories.length > 0) count += selectedCategories.length;
    if (showFeatured) count++;
    if (showAnnouncements) count++;
    return count;
  }, [
    selectedDifficulty,
    selectedSort,
    selectedCategories,
    showFeatured,
    showAnnouncements,
  ]);

  // Build URL with all current filters
  const buildFilterUrl = useCallback(
    (
      difficulty: number | null,
      sort: SortOption,
      cats: string[],
      featured: boolean,
      announcement: boolean,
      matchMode: CategoryMatchMode
    ) => {
      const params = new URLSearchParams();

      if (difficulty && difficulty >= 1 && difficulty <= 5) {
        params.set("difficulty", String(difficulty));
      }

      if (sort !== "newest") {
        params.set("sort", sort);
      }

      if (cats.length > 0) {
        params.set("categories", cats.join(","));
      }

      if (featured) {
        params.set("featured", "true");
      }

      if (announcement) {
        params.set("announcement", "true");
      }

      if (matchMode !== "and") {
        params.set("match", matchMode);
      }

      const queryString = params.toString();
      return queryString ? `/blog?${queryString}` : "/blog";
    },
    []
  );

  // Navigate with updated filters
  const navigateWithFilters = useCallback(() => {
    setSearchQuery("");
    onSearchResults([], null, false, "");
    router.push(
      buildFilterUrl(
        selectedDifficulty,
        selectedSort,
        selectedCategories,
        showFeatured,
        showAnnouncements,
        categoryMatchMode
      )
    );
  }, [
    router,
    buildFilterUrl,
    onSearchResults,
    selectedDifficulty,
    selectedSort,
    selectedCategories,
    showFeatured,
    showAnnouncements,
    categoryMatchMode,
  ]);

  // Toggle category selection
  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSelectedDifficulty(null);
    setSelectedSort("newest");
    setSelectedCategories([]);
    setShowFeatured(false);
    setShowAnnouncements(false);
    setCategoryMatchMode("and");
    setSearchQuery("");
    setCategorySearchQuery("");
    onSearchResults([], null, false, "");
    router.push("/blog");
  }, [router, onSearchResults]);

  // Apply filters (called when dialog closes or Apply button clicked)
  const applyFilters = useCallback(() => {
    navigateWithFilters();
    setIsFilterDialogOpen(false);
  }, [navigateWithFilters]);

  // Remove a specific filter and navigate immediately with updated values
  const removeFilter = useCallback(
    (filterType: "featured" | "announcement" | "category" | "difficulty" | "sort", value?: string) => {
      let newFeatured = showFeatured;
      let newAnnouncement = showAnnouncements;
      let newCategories = selectedCategories;
      let newDifficulty = selectedDifficulty;
      let newSort = selectedSort;

      switch (filterType) {
        case "featured":
          newFeatured = false;
          setShowFeatured(false);
          break;
        case "announcement":
          newAnnouncement = false;
          setShowAnnouncements(false);
          break;
        case "category":
          newCategories = selectedCategories.filter((c) => c !== value);
          setSelectedCategories(newCategories);
          break;
        case "difficulty":
          newDifficulty = null;
          setSelectedDifficulty(null);
          break;
        case "sort":
          newSort = "newest";
          setSelectedSort("newest");
          break;
      }

      // Navigate immediately with the new values
      setSearchQuery("");
      onSearchResults([], null, false, "");
      router.push(
        buildFilterUrl(
          newDifficulty,
          newSort,
          newCategories,
          newFeatured,
          newAnnouncement,
          categoryMatchMode
        )
      );
    },
    [
      router,
      buildFilterUrl,
      onSearchResults,
      showFeatured,
      showAnnouncements,
      selectedCategories,
      selectedDifficulty,
      selectedSort,
      categoryMatchMode,
    ]
  );

  // Debounced search
  const performSearch = useCallback(
    async (query: string) => {
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
    },
    [onSearchResults]
  );

  // Handle search input with debounce
  const handleSearchChange = useCallback(
    (value: string) => {
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
    },
    [performSearch, onSearchResults]
  );

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
    const urlDifficulty = searchParams.get("difficulty");
    const urlSort = (searchParams.get("sort") || "newest") as SortOption;
    const urlCategories = searchParams.get("categories");
    const urlFeatured = searchParams.get("featured") === "true";
    const urlAnnouncement = searchParams.get("announcement") === "true";
    const urlMatchMode = (searchParams.get("match") || "and") as CategoryMatchMode;

    setSelectedDifficulty(urlDifficulty ? parseInt(urlDifficulty, 10) : null);
    setSelectedSort(urlSort);
    setSelectedCategories(urlCategories ? urlCategories.split(",") : []);
    setShowFeatured(urlFeatured);
    setShowAnnouncements(urlAnnouncement);
    setCategoryMatchMode(urlMatchMode);
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Search Bar with Filter Button inside */}
      <div className="flex items-center justify-center gap-2 w-full max-w-md">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search posts..."
            className="w-full pl-9 pr-9 py-2 rounded-xl bg-background/50 border border-border/30 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-neon-pink/50 focus:border-neon-pink/50 transition-all text-sm"
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

        {/* Filter Icon Button */}
        <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-10 w-10 rounded-xl border border-border/30 bg-background/50 hover:bg-background hover:border-neon-purple/50 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-semibold rounded-full bg-neon-pink text-white">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent
            showCloseButton={false}
            className="w-full max-w-[600px] p-0 glass-strong rounded-xl shadow-2xl border border-border/30 overflow-hidden gap-0"
          >
            {/* Header with DialogTitle for accessibility */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 bg-muted/30">
              <DialogTitle className="text-sm font-semibold">Filter Posts</DialogTitle>
              <div className="flex items-center gap-3">
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-muted-foreground hover:text-neon-pink transition-colors"
                  >
                    Clear all
                  </button>
                )}
                <button
                  onClick={() => setIsFilterDialogOpen(false)}
                  className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] divide-y md:divide-y-0 md:divide-x divide-border/30 max-h-[60vh] overflow-y-auto">
            {/* Left Column - Difficulty & Sort */}
            <div className="p-4 space-y-4">
              {/* Difficulty */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Difficulty
                </Label>
                <Select
                  value={selectedDifficulty?.toString() || "any"}
                  onValueChange={(value) =>
                    setSelectedDifficulty(value === "any" ? null : parseInt(value, 10))
                  }
                >
                  <SelectTrigger className="w-full rounded-lg bg-background/50 border-border/30">
                    <SelectValue placeholder="Any Level" />
                  </SelectTrigger>
                  <SelectContent className="glass-strong rounded-lg border-border/30">
                    {difficultyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          {option.value !== "any" && (
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < parseInt(option.value)
                                      ? "fill-neon-cyan text-neon-cyan"
                                      : "fill-transparent text-muted-foreground/30"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Sort By
                </Label>
                <Select value={selectedSort} onValueChange={(value) => setSelectedSort(value as SortOption)}>
                  <SelectTrigger className="w-full rounded-lg bg-background/50 border-border/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-strong rounded-lg border-border/30">
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column - Categories */}
            <div className="p-4 space-y-3">
              {/* Category Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  value={categorySearchQuery}
                  onChange={(e) => setCategorySearchQuery(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-background/50 border-border/30 text-sm"
                />
              </div>

              {/* AND/OR Toggle */}
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30 border border-border/20">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">Match Mode</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <HelpCircle className="w-3.5 h-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[250px]">
                      <p className="font-medium mb-1">Filter Logic</p>
                      <p><strong>Match All:</strong> Posts must have ALL selected tags</p>
                      <p><strong>Match Any:</strong> Posts must have at least ONE selected tag</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center gap-1 p-0.5 rounded-md bg-background/50 border border-border/30">
                  <button
                    onClick={() => setCategoryMatchMode("and")}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
                      categoryMatchMode === "and"
                        ? "bg-neon-purple text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Match All
                  </button>
                  <button
                    onClick={() => setCategoryMatchMode("or")}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-all ${
                      categoryMatchMode === "or"
                        ? "bg-neon-purple text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Match Any
                  </button>
                </div>
              </div>

              {/* Category List */}
              <div className="max-h-[240px] overflow-y-auto space-y-1 pr-1 scrollbar-thin">
                {/* Featured & Announcements - Special items at top */}
                <div className="pb-2 mb-2 border-b border-border/20 space-y-1">
                  <label
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                      showFeatured
                        ? "bg-neon-cyan/10 border border-neon-cyan/30"
                        : "hover:bg-muted/50 border border-transparent"
                    }`}
                  >
                    <Checkbox
                      checked={showFeatured}
                      onCheckedChange={(checked) => setShowFeatured(checked === true)}
                      className="data-checked:bg-neon-cyan data-checked:border-neon-cyan"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <Sparkles className="w-4 h-4 text-neon-cyan" />
                      <span className="text-sm font-medium">Featured</span>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                      showAnnouncements
                        ? "bg-neon-pink/10 border border-neon-pink/30"
                        : "hover:bg-muted/50 border border-transparent"
                    }`}
                  >
                    <Checkbox
                      checked={showAnnouncements}
                      onCheckedChange={(checked) => setShowAnnouncements(checked === true)}
                      className="data-checked:bg-neon-pink data-checked:border-neon-pink"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <Megaphone className="w-4 h-4 text-neon-pink" />
                      <span className="text-sm font-medium">Announcements</span>
                    </div>
                  </label>
                </div>

                {/* Regular Categories */}
                {filteredCategories.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No categories found
                  </p>
                ) : (
                  filteredCategories.map((category) => (
                    <label
                      key={category.name}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                        selectedCategories.includes(category.name)
                          ? "bg-neon-purple/10 border border-neon-purple/30"
                          : "hover:bg-muted/50 border border-transparent"
                      }`}
                    >
                      <Checkbox
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={() => toggleCategory(category.name)}
                        className="data-checked:bg-neon-purple data-checked:border-neon-purple"
                      />
                      <span className="text-sm flex-1">{category.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({category.count})
                      </span>
                    </label>
                  ))
                )}
              </div>
            </div>
            </div>

            {/* Footer with Apply button */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border/30 bg-muted/20">
              <div className="text-xs text-muted-foreground">
                {activeFilterCount > 0
                  ? `${activeFilterCount} filter${activeFilterCount === 1 ? "" : "s"} selected`
                  : "No filters selected"}
              </div>
              <Button
                onClick={applyFilters}
                className="px-4 py-2 rounded-lg bg-neon-purple hover:bg-neon-purple/90 text-white text-sm font-medium transition-colors"
              >
                Apply Filters
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Filters Summary - Below the controls */}
      {activeFilterCount > 0 && !isFilterDialogOpen && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {selectedDifficulty !== null && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neon-blue/20 text-neon-blue text-xs font-medium">
              <Star className="w-3 h-3" />
              {difficultyOptions.find((d) => d.value === String(selectedDifficulty))?.label}
              <button
                onClick={() => removeFilter("difficulty")}
                className="ml-1 hover:bg-neon-blue/30 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {showFeatured && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan text-xs font-medium">
              <Sparkles className="w-3 h-3" />
              Featured
              <button
                onClick={() => removeFilter("featured")}
                className="ml-1 hover:bg-neon-cyan/30 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {showAnnouncements && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neon-pink/20 text-neon-pink text-xs font-medium">
              <Megaphone className="w-3 h-3" />
              Announcements
              <button
                onClick={() => removeFilter("announcement")}
                className="ml-1 hover:bg-neon-pink/30 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedCategories.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neon-purple/20 text-neon-purple text-xs font-medium"
            >
              {cat}
              <button
                onClick={() => removeFilter("category", cat)}
                className="ml-1 hover:bg-neon-purple/30 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {selectedCategories.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{selectedCategories.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}
