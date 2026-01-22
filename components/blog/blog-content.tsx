"use client";

import { useEffect, useRef, useCallback, memo } from "react";
import dynamic from "next/dynamic";
import { createRoot, Root } from "react-dom/client";
import { InfoBox } from "./info-box";
import { InlineCode } from "./inline-code";
import { ImageLightbox, useLightbox } from "./image-lightbox";

// Dynamic imports for heavy components - only load when needed
const CodeBlock = dynamic(() => import("./code-block").then(mod => ({ default: mod.CodeBlock })), {
  ssr: false,
  loading: () => <div className="bg-muted rounded-lg p-4 animate-pulse h-24" />,
});

const ToggleBox = dynamic(() => import("./toggle-box").then(mod => ({ default: mod.ToggleBox })), {
  ssr: false,
});

const QuizGroup = dynamic(() => import("./quiz").then(mod => ({ default: mod.QuizGroup })), {
  ssr: false,
  loading: () => <div className="bg-muted rounded-lg p-4 animate-pulse h-32" />,
});

const QuizQuestion = dynamic(() => import("./quiz").then(mod => ({ default: mod.QuizQuestion })), {
  ssr: false,
});

const InteractiveChecklist = dynamic(() => import("./interactive-checklist").then(mod => ({ default: mod.InteractiveChecklist })), {
  ssr: false,
});

interface BlogContentProps {
  contentHtml: string;
}

// Memoized inner content to prevent re-renders from lightbox state changes
const BlogContentInner = memo(function BlogContentInner({
  contentHtml,
  onImageClick,
  contentRef
}: {
  contentHtml: string;
  onImageClick: (e: React.MouseEvent) => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
}) {
  const rootsRef = useRef<Root[]>([]);
  const processedRef = useRef(false);

  // Cleanup roots on unmount - use queueMicrotask to avoid "synchronously unmount while rendering" error
  useEffect(() => {
    const roots = rootsRef.current;
    return () => {
      queueMicrotask(() => {
        roots.forEach(root => {
          try {
            root.unmount();
          } catch {
            // Ignore cleanup errors
          }
        });
      });
    };
  }, []);

  // Process code blocks - only once
  useEffect(() => {
    if (!contentRef.current || processedRef.current) return;
    processedRef.current = true;

    // Find all pre > code elements and replace with CodeBlock
    const preElements = contentRef.current.querySelectorAll("pre");
    preElements.forEach((pre) => {
      const code = pre.querySelector("code");
      if (!code) return;

      const language = code.className?.match(/language-(\w+)/)?.[1] || "text";
      const codeText = code.textContent || "";

      // Create a container for React
      const container = document.createElement("div");
      pre.parentNode?.replaceChild(container, pre);

      // Render the CodeBlock component
      const root = createRoot(container);
      rootsRef.current.push(root);
      root.render(<CodeBlock code={codeText} language={language} />);
    });

    // Process info boxes
    const infoBoxes = contentRef.current.querySelectorAll("[data-info-box]");
    infoBoxes.forEach((box) => {
      const type = box.getAttribute("data-info-box") as "info" | "hint" | "warning" | "danger" | "success";
      const title = box.getAttribute("data-title") || undefined;
      const content = box.innerHTML;

      const container = document.createElement("div");
      box.parentNode?.replaceChild(container, box);

      const root = createRoot(container);
      rootsRef.current.push(root);
      root.render(
        <InfoBox type={type} title={title}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </InfoBox>
      );
    });

    // Process toggle boxes
    const toggleBoxes = contentRef.current.querySelectorAll("[data-toggle-box]");
    toggleBoxes.forEach((box) => {
      const defaultOpen = box.getAttribute("data-toggle-box") === "open";
      const title = box.getAttribute("data-title") || "Click to expand";
      const content = box.innerHTML;

      const container = document.createElement("div");
      box.parentNode?.replaceChild(container, box);

      const root = createRoot(container);
      rootsRef.current.push(root);
      root.render(
        <ToggleBox title={title} defaultOpen={defaultOpen}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </ToggleBox>
      );
    });

    // Process quiz groups
    const quizGroups = contentRef.current.querySelectorAll("[data-quiz-group]");
    quizGroups.forEach((group) => {
      const title = group.getAttribute("data-title") || undefined;
      const questionElements = group.querySelectorAll("[data-quiz-question]");

      // Parse questions from the group
      const questions: { question: string; options: string[]; correctIndex: number; explanation?: string }[] = [];

      questionElements.forEach((qEl) => {
        const question = qEl.getAttribute("data-quiz-question") || "";
        const correctIndex = parseInt(qEl.getAttribute("data-correct") || "0", 10);
        const explanation = qEl.getAttribute("data-explanation") || undefined;
        const optionElements = qEl.querySelectorAll("[data-quiz-option]");
        const options: string[] = [];

        optionElements.forEach((opt) => {
          options.push(opt.textContent || "");
        });

        if (question && options.length > 0) {
          questions.push({ question, options, correctIndex, explanation });
        }
      });

      if (questions.length > 0) {
        const container = document.createElement("div");
        group.parentNode?.replaceChild(container, group);

        const root = createRoot(container);
        rootsRef.current.push(root);
        root.render(
          <QuizGroup title={title}>
            {questions.map((q, idx) => (
              <QuizQuestion
                key={idx}
                question={q.question}
                options={q.options}
                correctIndex={q.correctIndex}
                explanation={q.explanation}
              />
            ))}
          </QuizGroup>
        );
      }
    });

    // Process inline code elements (not inside pre blocks)
    const inlineCodeElements = contentRef.current.querySelectorAll("code:not(pre code)");
    inlineCodeElements.forEach((codeEl) => {
      const codeText = codeEl.textContent || "";

      const container = document.createElement("span");
      codeEl.parentNode?.replaceChild(container, codeEl);

      const root = createRoot(container);
      rootsRef.current.push(root);
      root.render(<InlineCode code={codeText} />);
    });

    // Process task lists (checklists) - find ul elements containing checkboxes
    const taskLists = contentRef.current.querySelectorAll("ul.contains-task-list, ul:has(input[type='checkbox'])");
    let checklistCounter = 0;
    taskLists.forEach((ul) => {
      const listItems = ul.querySelectorAll("li");
      const items: { id: string; text: string; checked: boolean }[] = [];

      listItems.forEach((li, index) => {
        const checkbox = li.querySelector("input[type='checkbox']");
        if (checkbox) {
          // Get the text content without the checkbox
          const textContent = li.innerHTML
            .replace(/<input[^>]*>/gi, "") // Remove the checkbox input
            .trim();

          items.push({
            id: `checklist-${checklistCounter}-item-${index}`,
            text: textContent,
            checked: (checkbox as HTMLInputElement).checked,
          });
        }
      });

      if (items.length > 0) {
        // Generate a storage key based on the page URL and checklist index
        const storageKey = `checklist-${window.location.pathname}-${checklistCounter}`;
        checklistCounter++;

        const container = document.createElement("div");
        ul.parentNode?.replaceChild(container, ul);

        const root = createRoot(container);
        rootsRef.current.push(root);
        root.render(<InteractiveChecklist items={items} storageKey={storageKey} />);
      }
    });
  }, [contentHtml, contentRef]);

  return (
    <div
      ref={contentRef}
      onClick={onImageClick}
      className="prose prose-cyberpunk prose-lg max-w-none
        prose-headings:scroll-mt-24
        prose-li:marker:text-neon-pink
        [&_input[type=checkbox]]:w-4 [&_input[type=checkbox]]:h-4 [&_input[type=checkbox]]:accent-neon-pink
        [&_.task-list-item]:list-none [&_.task-list-item]:pl-0
        [&_.contains-task-list]:pl-0"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
});

export function BlogContent({ contentHtml }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
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
    if (target.tagName === "IMG") {
      // If image is inside a link, let the link handle the click
      if (isInsideLink(target)) {
        return;
      }

      e.preventDefault();
      const imgElement = target as HTMLImageElement;
      // Get all images that are NOT inside links for lightbox
      const allImages = Array.from(contentRef.current?.querySelectorAll("img") || [])
        .filter((img) => !isInsideLink(img))
        .map((img) => ({
          src: img.getAttribute("src") || img.src,
          alt: img.alt,
        }));
      const clickedSrc = imgElement.getAttribute("src") || imgElement.src;
      const clickedIndex = allImages.findIndex((img) => img.src === clickedSrc);
      if (clickedIndex >= 0) {
        openLightbox(allImages, clickedIndex);
      }
    }
  }, [openLightbox]);

  return (
    <>
      <BlogContentInner
        contentHtml={contentHtml}
        onImageClick={handleContentClick}
        contentRef={contentRef}
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
