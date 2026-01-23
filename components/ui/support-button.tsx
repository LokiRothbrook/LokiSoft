"use client";

import { Coffee, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SupportButtonProps {
  variant?: "default" | "compact" | "footer";
  className?: string;
}

export function SupportButton({ variant = "default", className = "" }: SupportButtonProps) {
  const kofiUsername = process.env.NEXT_PUBLIC_KOFI_USERNAME;

  // Don't render if no username configured
  if (!kofiUsername) return null;

  const kofiUrl = `https://ko-fi.com/${kofiUsername}`;

  if (variant === "compact") {
    return (
      <a
        href={kofiUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <Button
          variant="outline"
          size="sm"
          className="border-neon-pink/50 text-neon-pink hover:bg-neon-pink/10 hover:border-neon-pink"
        >
          <Coffee className="w-4 h-4 mr-2" />
          Support
        </Button>
      </a>
    );
  }

  if (variant === "footer") {
    return (
      <a
        href={kofiUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-muted-foreground hover:text-neon-pink transition-colors ${className}`}
      >
        <Coffee className="w-4 h-4" />
        <span className="text-sm">Support us on Ko-fi</span>
      </a>
    );
  }

  // Default - full CTA card
  return (
    <div className={`rounded-2xl border border-neon-pink/30 bg-gradient-to-br from-neon-pink/5 to-neon-purple/5 p-6 md:p-8 text-center ${className}`}>
      <div className="flex justify-center mb-4">
        <div className="p-3 rounded-xl bg-neon-pink/10">
          <Heart className="w-8 h-8 text-neon-pink" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">
        Enjoying our content?
      </h3>

      <p className="text-muted-foreground text-sm mb-4 max-w-md mx-auto">
        If this post helped you, consider supporting our work. Your contribution
        helps us create more free, open-source content for the community.
      </p>

      <a
        href={kofiUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="bg-neon-pink hover:bg-neon-pink/90 text-white">
          <Coffee className="w-4 h-4 mr-2" />
          Buy us a coffee
        </Button>
      </a>

      <p className="text-xs text-muted-foreground mt-3">
        100% goes to supporting open-source development
      </p>
    </div>
  );
}
