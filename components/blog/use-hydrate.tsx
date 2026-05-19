"use client";

import { useEffect, useRef } from "react";
import { createRoot, Root } from "react-dom/client";
import dynamic from "next/dynamic";

// --- Dynamic Imports for Components ---
const CodeBlock = dynamic(() => import("./code-block").then(mod => ({ default: mod.CodeBlock })), { ssr: false, loading: () => <div className="bg-muted rounded-lg p-4 animate-pulse h-24" /> });
const ToggleBox = dynamic(() => import("./toggle-box").then(mod => ({ default: mod.ToggleBox })), { ssr: false });
const InfoBox = dynamic(() => import("./info-box").then(mod => ({ default: mod.InfoBox })), { ssr: false });
const QuizGroup = dynamic(() => import("./quiz").then(mod => ({ default: mod.QuizGroup })), { ssr: false, loading: () => <div className="bg-muted rounded-lg p-4 animate-pulse h-32" /> });
const QuizQuestion = dynamic(() => import("./quiz").then(mod => ({ default: mod.QuizQuestion })), { ssr: false });
const InteractiveChecklist = dynamic(() => import("./interactive-checklist").then(mod => ({ default: mod.InteractiveChecklist })), { ssr: false });
const InlineCode = dynamic(() => import("./inline-code").then(mod => ({ default: mod.InlineCode })), { ssr: false });


export function useHydrate(contentRef: React.RefObject<HTMLDivElement | null>, contentHtml: string) {
  const rootsRef = useRef<Root[]>([]);
  const processedRef = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    const roots = rootsRef.current;
    return () => {
      queueMicrotask(() => roots.forEach(root => root.unmount()));
    };
  }, []);

  // Main hydration effect
  useEffect(() => {
    if (!contentRef.current || !contentHtml || processedRef.current) return;
    
    // Use a WeakMap to track processed elements and avoid reprocessing
    const processedElements = new WeakSet();
    const newRoots: Root[] = [];
    let checklistCounter = 0;

    const hydrate = (element: HTMLElement) => {
      // --- Handlers for each component type ---
      const componentProcessors = [
        {
          selector: "pre",
          handler: (el: Element) => {
            const code = el.querySelector("code");
            if (!code) return;
            const language = code.className?.match(/language-(\w+)/)?.[1] || "text";
            const codeText = code.textContent || "";
            return { Component: CodeBlock, props: { code: codeText, language }, inline: false };
          }
        },
        {
          selector: "[data-info-box]",
          handler: (el: Element) => ({
            Component: InfoBox,
            props: {
              type: el.getAttribute("data-info-box"),
              title: el.getAttribute("data-title") || undefined,
              contentHtml: el.innerHTML
            },
            inline: false
          })
        },
        {
          selector: "[data-toggle-box]",
          handler: (el: Element) => ({
            Component: ToggleBox,
            props: {
              defaultOpen: el.getAttribute("data-toggle-box") === "open",
              title: el.getAttribute("data-title") || "Click to expand",
              contentHtml: el.innerHTML
            },
            inline: false
          })
        },
        {
            selector: "code:not(pre code)",
            handler: (el: Element) => ({
                Component: InlineCode,
                props: { code: el.textContent || "" },
                inline: true
            })
        },
        {
            selector: "[data-quiz-group]",
            handler: (el: Element) => {
                const title = el.getAttribute("data-title") || undefined;
                const questionElements = el.querySelectorAll("[data-quiz-question]");
                const questions: any[] = [];
                questionElements.forEach((qEl) => {
                    const question = qEl.getAttribute("data-quiz-question") || "";
                    const correctIndex = parseInt(qEl.getAttribute("data-correct") || "0", 10);
                    const explanation = qEl.getAttribute("data-explanation") || undefined;
                    const options = Array.from(qEl.querySelectorAll("[data-quiz-option]")).map(opt => opt.textContent || "");
                    if (question && options.length > 0) {
                        questions.push({ question, options, correctIndex, explanation });
                    }
                });
                
                const QuestionComponents = questions.map((q, idx) => <QuizQuestion key={idx} {...q} />);
                return { Component: QuizGroup, props: { title, children: QuestionComponents }, inline: false };
            }
        },
        {
            selector: "ul.contains-task-list, ul:has(input[type='checkbox'])",
            handler: (el: Element) => {
                const items: { id: string; text: string; checked: boolean }[] = [];
                const listItems = el.querySelectorAll("li");
                listItems.forEach((li, index) => {
                    const checkbox = li.querySelector("input[type='checkbox']");
                    if (checkbox) {
                        const textContent = li.innerHTML.replace(/<input[^>]*>/gi, "").trim();
                        items.push({ id: `checklist-${checklistCounter}-item-${index}`, text: textContent, checked: (checkbox as HTMLInputElement).checked });
                    }
                });
                const storageKey = `checklist-${window.location.pathname}-${checklistCounter++}`;
                return { Component: InteractiveChecklist, props: { items, storageKey }, inline: false };
            }
        }
      ];

      // Process elements from the bottom up
      const elementsToProcess = componentProcessors.flatMap(({ selector, handler }) =>
        Array.from(element.querySelectorAll(selector)).map(el => ({ el, handler }))
      );

      elementsToProcess.reverse().forEach(({ el, handler }) => {
        if (processedElements.has(el)) return;

        const result = handler(el);
        if (!result) return;
        
        const { Component, props, inline = false } = result;
        
        const container = document.createElement(inline ? "span" : "div");
        el.parentNode?.replaceChild(container, el);

        const root = createRoot(container);
        newRoots.push(root);
        const AnyComponent = Component as any;
        root.render(<AnyComponent {...props} />);
        
        // Mark the original element and its children as processed
        processedElements.add(el);
        el.querySelectorAll('*').forEach(child => processedElements.add(child));
      });
    };
    
    // Set initial content and start hydration
    if (contentRef.current) {
        contentRef.current.innerHTML = contentHtml;
        hydrate(contentRef.current);
        rootsRef.current = newRoots;
        processedRef.current = true;
    }

  }, [contentHtml, contentRef]);
}
