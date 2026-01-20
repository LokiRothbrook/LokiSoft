"use client";

import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact";
          appearance?: "always" | "execute" | "interaction-only";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

interface TurnstileProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  className?: string;
}

export function Turnstile({ onVerify, onError, onExpire, className }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const scriptLoadedRef = useRef(false);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || !siteKey) return;

    // Remove existing widget if any
    if (widgetIdRef.current) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch {
        // Ignore errors from removing non-existent widget
      }
    }

    // Clear container
    containerRef.current.innerHTML = "";

    // Render new widget
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: onVerify,
      "error-callback": onError,
      "expired-callback": onExpire,
      theme: "dark",
      size: "normal",
      appearance: "always",
    });
  }, [siteKey, onVerify, onError, onExpire]);

  useEffect(() => {
    // Don't do anything if no site key
    if (!siteKey) {
      console.warn("Turnstile site key not configured");
      return;
    }

    // If Turnstile is already loaded, render immediately
    if (window.turnstile) {
      renderWidget();
      return;
    }

    // If script is already being loaded, set up callback
    if (scriptLoadedRef.current) {
      window.onTurnstileLoad = renderWidget;
      return;
    }

    // Load the Turnstile script
    scriptLoadedRef.current = true;
    window.onTurnstileLoad = renderWidget;

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup widget on unmount
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, [siteKey, renderWidget]);

  // Don't render anything if no site key (allows development without Turnstile)
  if (!siteKey) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      aria-label="CAPTCHA verification"
    />
  );
}

/**
 * Reset the Turnstile widget (e.g., after form submission error)
 */
export function resetTurnstile(widgetId: string | null) {
  if (widgetId && window.turnstile) {
    try {
      window.turnstile.reset(widgetId);
    } catch {
      // Ignore reset errors
    }
  }
}
