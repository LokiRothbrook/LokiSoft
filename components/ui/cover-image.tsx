"use client";

import { useState, useEffect } from "react";
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
  const [imageSrc, setImageSrc] = useState(normalizedSrc);
  const [hasError, setHasError] = useState(false);

  // Reset state when src prop changes
  useEffect(() => {
    const newSrc = normalizeImagePath(src);
    setImageSrc(newSrc);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(PLACEHOLDER_IMAGE);
    }
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
