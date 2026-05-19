"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PaginationInfo } from "@/lib/blog";

interface PaginationControlsProps {
  pagination: PaginationInfo;
  baseUrl?: string;
}

export function PaginationControls({ pagination, baseUrl = "/blog" }: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { page, totalPages, total, hasNext, hasPrev } = pagination;

  const createPageUrl = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newPage === 1) {
        params.delete("page");
      } else {
        params.set("page", String(newPage));
      }
      const queryString = params.toString();
      return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    },
    [searchParams, baseUrl]
  );

  const goToPage = useCallback(
    (newPage: number) => {
      router.push(createPageUrl(newPage));
    },
    [router, createPageUrl]
  );

  // Don't render if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      // Show all pages if there aren't many
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (page > 3) {
        pages.push("ellipsis");
      }

      // Show pages around current page
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 2) {
        pages.push("ellipsis");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {/* Post count info */}
      <p className="text-sm text-muted-foreground">
        Showing page {page} of {totalPages} ({total} total posts)
      </p>

      {/* Pagination controls */}
      <div className="flex items-center gap-1">
        {/* First page */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => goToPage(1)}
          disabled={!hasPrev}
          className="h-9 w-9"
          aria-label="Go to first page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Previous page */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => goToPage(page - 1)}
          disabled={!hasPrev}
          className="h-9 w-9"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-2">
          {pageNumbers.map((pageNum, index) =>
            pageNum === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-muted-foreground"
              >
                ...
              </span>
            ) : (
              <Button
                key={pageNum}
                variant={pageNum === page ? "default" : "ghost"}
                size="icon"
                onClick={() => goToPage(pageNum)}
                className={`h-9 w-9 ${
                  pageNum === page
                    ? "bg-neon-pink text-white hover:bg-neon-pink/90"
                    : ""
                }`}
                aria-label={`Go to page ${pageNum}`}
                aria-current={pageNum === page ? "page" : undefined}
              >
                {pageNum}
              </Button>
            )
          )}
        </div>

        {/* Next page */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => goToPage(page + 1)}
          disabled={!hasNext}
          className="h-9 w-9"
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Last page */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => goToPage(totalPages)}
          disabled={!hasNext}
          className="h-9 w-9"
          aria-label="Go to last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
