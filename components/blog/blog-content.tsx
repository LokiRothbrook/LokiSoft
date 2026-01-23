"use client";

import { useRef, useCallback } from "react";
import { useHydrate } from "./use-hydrate";
import { ImageLightbox, useLightbox } from "./image-lightbox";

interface BlogContentProps {
  contentHtml: string;
}

export function BlogContent({ contentHtml }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  useHydrate(contentRef, contentHtml);

  const { isOpen, images, initialIndex, openLightbox, setOpen } = useLightbox();

  // Check if an element is inside an anchor tag
  const isInsideLink = (element: HTMLElement): boolean => {
    let current: HTMLElement | null = element;
    while (current && current !== contentRef.current) {
      if (current.tagName === "A") return true;
      current = current.parentElement;
    }
    return false;
  };

  // Handle image clicks for lightbox
  const handleContentClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG" && !isInsideLink(target)) {
      e.preventDefault();
      const imgElement = target as HTMLImageElement;
      const allImages = Array.from(contentRef.current?.querySelectorAll("img") || [])
        .filter(img => !isInsideLink(img))
        .map(img => ({ src: img.src, alt: img.alt }));
      const clickedIndex = allImages.findIndex(img => img.src === imgElement.src);
      if (clickedIndex >= 0) {
        openLightbox(allImages, clickedIndex);
      }
    }
  }, [openLightbox]);

  return (
    <>
      <div
        ref={contentRef}
        onClick={handleContentClick}
        className="prose prose-cyberpunk prose-lg max-w-none
          prose-headings:scroll-mt-24
          prose-li:marker:text-neon-pink
          [&_input[type=checkbox]]:w-4 [&_input[type=checkbox]]:h-4 [&_input[type=checkbox]]:accent-neon-pink
          [&_.task-list-item]:list-none [&_input[type=checkbox]]:ml-0
          [&_.contains-task-list]:pl-0"
      />
      <ImageLightbox
        images={images}
        initialIndex={initialIndex}
        open={isOpen}
        onOpenChange={setOpen}
      />
    </>
  );
}
