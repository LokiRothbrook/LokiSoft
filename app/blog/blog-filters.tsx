"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, X } from "lucide-react";
import type { Post } from "@/lib/blog";

type FilterType = "all" | "announcements" | "featured" | "category";

interface BlogFiltersProps {
  categories: { name: string; count: number }[];
  posts: Post[];
  onFilteredPostsChange: (posts: Post[]) => void;
}

export function BlogFilters({ categories, posts, onFilteredPostsChange }: BlogFiltersProps) {
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Filter posts based on current filter type and category
  const filterPosts = useCallback((type: FilterType, category: string, query: string) => {
    let filtered = [...posts];

    // Apply filter type
    switch (type) {
      case "announcements":
        filtered = filtered.filter((post) => post.announcement);
        break;
      case "featured":
        filtered = filtered.filter((post) => post.featured);
        break;
      case "category":
        if (category) {
          filtered = filtered.filter((post) =>
            post.categories.some((c) => c.toLowerCase() === category.toLowerCase())
          );
        }
        break;
    }

    // Apply search filter
    if (query.trim()) {
      const searchTerms = query.toLowerCase().trim().split(/\s+/);
      filtered = filtered.filter((post) => {
        const searchableText = `${post.title} ${post.excerpt}`.toLowerCase();
        return searchTerms.every((term) => searchableText.includes(term));
      });
    }

    return filtered;
  }, [posts]);

  // Update filtered posts when filters change
  useEffect(() => {
    const filtered = filterPosts(filterType, selectedCategory, searchQuery);
    onFilteredPostsChange(filtered);
  }, [filterType, selectedCategory, searchQuery, filterPosts, onFilteredPostsChange]);

  // Reset category when changing filter type away from category
  useEffect(() => {
    if (filterType !== "category") {
      setSelectedCategory("");
    }
  }, [filterType]);

  const handleFilterTypeChange = (type: FilterType) => {
    setFilterType(type);
    if (type === "category" && !selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0].name);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const filterOptions: { type: FilterType; label: string }[] = [
    { type: "all", label: "All Posts" },
    { type: "announcements", label: "Announcements" },
    { type: "featured", label: "Featured" },
    { type: "category", label: "Category" },
  ];

  return (
    <div className="space-y-4 flex flex-col items-center">
      {/* Filter type radio buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {filterOptions.map((option) => (
          <label
            key={option.type}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all ${
              filterType === option.type
                ? "bg-neon-pink text-white"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <input
              type="radio"
              name="filterType"
              value={option.type}
              checked={filterType === option.type}
              onChange={() => handleFilterTypeChange(option.type)}
              className="sr-only"
            />
            <span className="text-sm font-medium">{option.label}</span>
          </label>
        ))}

        {/* Category dropdown - only visible when category filter is selected */}
        <AnimatePresence>
          {filterType === "category" && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 transition-colors"
              >
                <span className="text-sm font-medium">
                  {selectedCategory || "Select category"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isCategoryDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown menu */}
              <AnimatePresence>
                {isCategoryDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 z-50 min-w-[200px] py-2 glass-strong rounded-xl shadow-xl border border-border/30"
                  >
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => handleCategorySelect(category.name)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          selectedCategory === category.name
                            ? "bg-neon-purple/20 text-neon-purple"
                            : "text-foreground hover:bg-muted/50"
                        }`}
                      >
                        {category.name}
                        <span className="text-muted-foreground ml-2">({category.count})</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-muted/50 border border-border/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon-pink/50 focus:border-neon-pink/50 transition-all"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
