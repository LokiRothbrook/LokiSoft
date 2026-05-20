"use client";

import { useState } from "react";
import Image from "next/image";
import { resolveImageUrl } from "@/lib/cloudinary";

const PLACEHOLDER_IMAGE = "/images/blog-placeholder.svg";

const DEFAULT_ALLOWED_DOMAINS = [
  "res.cloudinary.com",
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

    if (parsed.protocol !== "https:") {
      return false;
    }

    if (DEFAULT_ALLOWED_DOMAINS.includes(hostname)) {
      return true;
    }

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

  // Resolve cloudinary: shorthand (used in post frontmatter)
  if (path.startsWith("cloudinary:")) {
    const resolved = resolveImageUrl(path);
    return resolved || PLACEHOLDER_IMAGE;
  }

  // If it's an external URL, validate the domain
  if (path.startsWith("http://") || path.startsWith("https://")) {
    if (isAllowedExternalUrl(path)) {
      return path;
    }
    console.warn(`External image domain not allowed: ${path}`);
    return PLACEHOLDER_IMAGE;
  }

  if (!path.startsWith("/")) {
    return `/${path}`;
  }

  return path;
}

export function CoverImage({ src, alt, className = "" }: CoverImageProps) {
  const normalizedSrc = normalizeImagePath(src);
  const [errorForSrc, setErrorForSrc] = useState<string | null>(null);

  const imageSrc = errorForSrc === src ? PLACEHOLDER_IMAGE : normalizedSrc;

  const handleError = () => {
    setErrorForSrc(src ?? null);
  };

  // Skip Vercel's optimizer for SVGs and Cloudinary images (Cloudinary handles its own optimization)
  const shouldSkipOptimization =
    imageSrc.endsWith(".svg") ||
    imageSrc.startsWith("https://res.cloudinary.com");

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={handleError}
      unoptimized={shouldSkipOptimization}
    />
  );
}
