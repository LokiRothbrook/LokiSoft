"use client";

import { useState, useCallback } from "react";

interface InlineCodeProps {
  code: string;
}

export function InlineCode({ code }: InlineCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [code]);

  return (
    <code
      onClick={handleClick}
      className="relative inline-flex items-center px-1.5 py-0.5 rounded-md bg-muted/80 border border-border/50 text-neon-cyan font-mono text-[0.9em] cursor-pointer hover:bg-neon-cyan/10 hover:border-neon-cyan/30 transition-all group"
    >
      {code}
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-green-500/90 text-white text-xs font-sans whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-200">
          Copied!
        </span>
      )}
    </code>
  );
}
