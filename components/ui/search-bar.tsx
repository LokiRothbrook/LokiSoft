"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, Briefcase, Package, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { services } from "@/lib/data/services";
import { products } from "@/lib/data/products";

// Debounce hook for search performance
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export interface SearchResult {
  type: "page" | "blog" | "service" | "product" | "category";
  title: string;
  description?: string;
  url: string;
  category?: string;
}

interface SearchBarProps {
  posts?: {
    slug: string;
    title: string;
    excerpt?: string;
    categories?: string[];
  }[];
}

const staticPages: SearchResult[] = [
  { type: "page", title: "Home", url: "/", description: "Return to the homepage" },
  { type: "page", title: "Blog", url: "/blog", description: "Read our latest articles" },
  { type: "page", title: "Services", url: "/services", description: "Explore our services" },
  { type: "page", title: "Products", url: "/products", description: "Discover our products" },
  { type: "page", title: "About", url: "/about", description: "Learn about LokiSoft" },
  { type: "page", title: "Contact", url: "/contact", description: "Get in touch with us" },
];

function getTypeIcon(type: SearchResult["type"]) {
  switch (type) {
    case "page":
      return <FileText className="w-4 h-4" />;
    case "blog":
      return <FileText className="w-4 h-4" />;
    case "service":
      return <Briefcase className="w-4 h-4" />;
    case "product":
      return <Package className="w-4 h-4" />;
    case "category":
      return <Tag className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
}

function getTypeColor(type: SearchResult["type"]) {
  switch (type) {
    case "page":
      return "text-neon-cyan";
    case "blog":
      return "text-neon-pink";
    case "service":
      return "text-neon-purple";
    case "product":
      return "text-neon-blue";
    case "category":
      return "text-neon-cyan";
    default:
      return "text-muted-foreground";
  }
}

export function SearchBar({ posts = [] }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Debounce search query for better performance
  const debouncedQuery = useDebounce(query, 150);

  // Memoize all searchable results - only recompute when posts change
  const allResults = useMemo((): SearchResult[] => {
    const results: SearchResult[] = [...staticPages];

    // Add services
    services.forEach((service) => {
      results.push({
        type: "service",
        title: service.name,
        description: service.shortDescription,
        url: `/services/${service.slug}`,
      });
    });

    // Add products
    products.forEach((product) => {
      results.push({
        type: "product",
        title: product.name,
        description: product.shortDescription,
        url: `/products/${product.slug}`,
      });
    });

    // Add blog posts
    const seenCategories = new Set<string>();
    posts.forEach((post) => {
      results.push({
        type: "blog",
        title: post.title,
        description: post.excerpt,
        url: `/blog/${post.slug}`,
        category: post.categories?.join(", "),
      });

      // Add categories from posts (deduplicated)
      post.categories?.forEach((cat) => {
        if (!seenCategories.has(cat.toLowerCase())) {
          seenCategories.add(cat.toLowerCase());
          results.push({
            type: "category",
            title: cat,
            description: `View all posts in ${cat}`,
            url: `/blog?category=${encodeURIComponent(cat)}`,
          });
        }
      });
    });

    return results;
  }, [posts]);

  // Memoized search function
  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return [];
    }

    const words = debouncedQuery.toLowerCase().split(/\s+/).filter(Boolean);

    const scored = allResults
      .map((result) => {
        const titleLower = result.title.toLowerCase();
        const descLower = (result.description || "").toLowerCase();
        const categoryLower = (result.category || "").toLowerCase();

        let score = 0;

        words.forEach((word) => {
          // Exact title match gets highest score
          if (titleLower === word) {
            score += 100;
          } else if (titleLower.startsWith(word)) {
            score += 50;
          } else if (titleLower.includes(word)) {
            score += 25;
          }

          // Description match
          if (descLower.includes(word)) {
            score += 10;
          }

          // Category match
          if (categoryLower.includes(word)) {
            score += 15;
          }
        });

        return { result, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ result }) => result);

    return scored;
  }, [debouncedQuery, allResults]);

  // Update results when search completes
  useEffect(() => {
    setResults(searchResults);
    setSelectedIndex(0);
  }, [searchResults]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      router.push(results[selectedIndex].url);
      setIsOpen(false);
      setQuery("");
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-32 sm:w-48 lg:w-64 h-9 pl-9 pr-8 rounded-lg bg-muted/50 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-neon-pink/50 focus:ring-1 focus:ring-neon-pink/30 transition-all"
          role="combobox"
          aria-expanded={isOpen && results.length > 0}
          aria-haspopup="listbox"
          aria-controls="search-results"
          aria-label="Search the site"
          aria-autocomplete="list"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 w-80 max-h-96 overflow-auto glass-strong rounded-xl shadow-xl z-50"
            role="listbox"
            id="search-results"
            aria-label="Search results"
          >
            <div className="p-2" role="presentation">
              {results.map((result, index) => (
                <Link
                  key={`${result.type}-${result.url}`}
                  href={result.url}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                >
                  <motion.div
                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                      index === selectedIndex
                        ? "bg-neon-pink/10 border border-neon-pink/30"
                        : "hover:bg-muted/50"
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <div className={`mt-0.5 ${getTypeColor(result.type)}`}>
                      {getTypeIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm truncate">{result.title}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${getTypeColor(result.type)} bg-current/10`}>
                          {result.type}
                        </span>
                      </div>
                      {result.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {result.description}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {isOpen && query && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 right-0 w-80 glass-strong rounded-xl shadow-xl z-50 p-4"
          >
            <p className="text-sm text-muted-foreground text-center">
              No results found for &quot;{query}&quot;
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
