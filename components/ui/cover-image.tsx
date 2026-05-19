"use client";

import { useState } from "react";
import Image from "next/image";

const PLACEHOLDER_IMAGE = "/images/blog-placeholder.svg";

// Default allowed domains for external images
// Additional domains can be added via ALLOWED_IMAGE_DOMAINS env var
const DEFAULT_ALLOWED_DOMAINS = [
  "images.unsplash.com",
  "cdn.jsdelivr.net",
  "reactjs.org",
  "nextjs.org",
];

interface CoverImageProps {
  src: string | undefined;
  alt: string;
  className?: string;
}

function isAllowedExternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname;

    // Only allow HTTPS for external images (security)
    if (parsed.protocol !== "https:") {
      return false;
    }

    // Check default allowed domains
    if (DEFAULT_ALLOWED_DOMAINS.includes(hostname)) {
      return true;
    }

    // Check if it matches the site URL
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (siteUrl) {
      try {
        const siteHostname = new URL(siteUrl).hostname;
        if (hostname === siteHostname) {
          return true;
        }
      } catch {
        // Invalid site URL, ignore
      }
    }

    // Check GitHub user content (for avatars, etc.)
    if (hostname.endsWith(".githubusercontent.com")) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

function normalizeImagePath(path: string | undefined): string {
  if (!path || path.trim() === "") {
    return PLACEHOLDER_IMAGE;
  }

  // If it's an external URL, validate the domain
  if (path.startsWith("http://") || path.startsWith("https://")) {
    if (isAllowedExternalUrl(path)) {
      return path;
    }
    // Blocked domain - use placeholder
    console.warn(`External image domain not allowed: ${path}`);
    return PLACEHOLDER_IMAGE;
  }

  // Ensure local paths start with /
  if (!path.startsWith("/")) {
    return `/${path}`;
  }

  return path;
}

export function CoverImage({ src, alt, className = "" }: CoverImageProps) {
  const normalizedSrc = normalizeImagePath(src);
  const [errorForSrc, setErrorForSrc] = useState<string | null>(null);

  // Derive imageSrc based on whether we had an error for the current src
  const imageSrc = errorForSrc === src ? PLACEHOLDER_IMAGE : normalizedSrc;

  const handleError = () => {
    setErrorForSrc(src ?? null);
  };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={handleError}
      unoptimized={imageSrc.endsWith(".svg")}
    />
  );
}
