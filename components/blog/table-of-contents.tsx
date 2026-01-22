"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, ChevronRight } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Find headings from the DOM on mount - DOM measurement pattern
  useEffect(() => {
    const articleElement = document.querySelector("article");
    if (!articleElement) return;

    const headingElements = articleElement.querySelectorAll("h2, h3, h4, h5, h6");
    const foundHeadings: Heading[] = [];

    headingElements.forEach((el) => {
      const id = el.id;
      const text = el.textContent?.trim() || "";
      const level = parseInt(el.tagName.charAt(1), 10);

      if (id && text) {
        foundHeadings.push({ id, text, level });
      }
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(foundHeadings);
  }, []);

  // Set up intersection observer for active heading tracking
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -70% 0px",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsDrawerOpen(false);
  }, []);

  if (headings.length === 0) {
    return null;
  }

  const tocContent = (
    <nav className="space-y-0.5">
      {headings.map((heading) => (
        <button
          key={heading.id}
          onClick={() => handleClick(heading.id)}
          className={`group block w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-300 ${
            activeId === heading.id
              ? "bg-neon-pink/15 text-neon-pink"
              : "text-muted-foreground hover:text-foreground hover:bg-white/5"
          }`}
          style={{ paddingLeft: `${(heading.level - 2) * 14 + 12}px` }}
        >
          <span className="flex items-center gap-2">
            {heading.level > 2 && (
              <ChevronRight
                className={`w-3 h-3 transition-colors ${
                  activeId === heading.id ? "text-neon-pink" : "text-muted-foreground/50"
                }`}
              />
            )}
            <span className="line-clamp-2">{heading.text}</span>
          </span>
        </button>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop TOC - Sticky sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 self-stretch">
        <div className="sticky top-24">
          <div className="glass rounded-xl p-4 max-h-[calc(100vh-8rem)] overflow-y-auto border border-white/5">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 gradient-text">
              <List className="w-4 h-4 text-neon-pink" />
              Table of Contents
            </h3>
            <div className="relative">
              {tocContent}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile TOC - Floating button + Drawer */}
      <div className="lg:hidden">
        {/* Floating button */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-br from-neon-pink to-neon-purple text-white shadow-lg shadow-neon-pink/25 hover:shadow-neon-pink/40 hover:scale-105 transition-all duration-300"
          aria-label="Open table of contents"
        >
          <List className="w-6 h-6" />
        </button>

        {/* Drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDrawerOpen(false)}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              />

              {/* Drawer panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed right-0 top-0 bottom-0 z-50 w-80 max-w-[90vw] glass-strong border-l border-white/10 p-6 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2 gradient-text">
                    <List className="w-5 h-5 text-neon-pink" />
                    Table of Contents
                  </h3>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close table of contents"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="relative">
                  {tocContent}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
