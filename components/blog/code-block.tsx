"use client";

import { useState, useCallback } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = code;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setCopyError(true);
      setTimeout(() => setCopyError(false), 2000);
    }
  }, [code]);

  return (
    <div className="relative group my-6 w-full">
      {/* Language badge */}
      <div className="absolute top-0 left-4 -translate-y-1/2 z-10">
        <span className="text-xs px-2 py-1 rounded-full bg-neon-purple/20 text-neon-purple font-mono">
          {language || "text"}
        </span>
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-muted/50 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-neon-pink/20 hover:text-neon-pink transition-all duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-neon-pink/50"
        title={copied ? "Copied!" : copyError ? "Failed to copy" : "Copy code"}
        aria-label={copied ? "Code copied to clipboard" : copyError ? "Failed to copy code" : "Copy code to clipboard"}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" aria-hidden="true" />
        ) : copyError ? (
          <span className="w-4 h-4 text-red-400" aria-hidden="true">!</span>
        ) : (
          <Copy className="w-4 h-4" aria-hidden="true" />
        )}
      </button>

      <Highlight theme={themes.nightOwl} code={code.trim()} language={language || "text"}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto rounded-xl border border-neon-purple/40 p-4 pt-6 text-sm transition-all duration-300 group-hover:border-neon-purple/60 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]`}
            style={{
              ...style,
              backgroundColor: "oklch(0.1 0.02 270)",
              margin: 0,
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className="table-row">
                <span className="table-cell pr-4 text-right select-none text-muted-foreground/40 text-xs w-8">
                  {i + 1}
                </span>
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
