import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Image optimization configuration
  images: {
    remotePatterns: [
      // Allow images from common CDNs and sources
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      // Add additional patterns based on ALLOWED_IMAGE_DOMAINS env var
      ...(process.env.ALLOWED_IMAGE_DOMAINS
        ? process.env.ALLOWED_IMAGE_DOMAINS.split(",").map((domain) => ({
            protocol: "https" as const,
            hostname: domain.trim(),
          }))
        : []),
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Scripts: allow self, inline (for Next.js), eval (for Next.js dev), Giscus, and Turnstile
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://giscus.app https://challenges.cloudflare.com",
              // Styles: allow self, inline (for styled-jsx and dynamic styles), and KaTeX CDN
              "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
              // Fonts: allow self and data URIs
              "font-src 'self' data:",
              // Images: RESTRICTED to specific trusted domains only
              // Self, data URIs for inline images, Unsplash for blog images, jsDelivr for icons
              "img-src 'self' data: blob: https://images.unsplash.com https://cdn.jsdelivr.net https://*.githubusercontent.com",
              // Connect: allow self, Giscus API, and Turnstile verification
              "connect-src 'self' https://giscus.app https://challenges.cloudflare.com",
              // Frames: allow Giscus for comments and Turnstile for CAPTCHA
              "frame-src 'self' https://giscus.app https://challenges.cloudflare.com",
              // Frame ancestors: only self (prevents clickjacking)
              "frame-ancestors 'self'",
              // Form actions: only self
              "form-action 'self'",
              // Base URI: only self
              "base-uri 'self'",
              // Object sources: none (blocks Flash, etc.)
              "object-src 'none'",
              // Upgrade insecure requests in production
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
