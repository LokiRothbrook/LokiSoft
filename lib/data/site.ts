/**
 * Site Configuration
 *
 * This file contains all the core configuration for the site.
 * Update these values to customize the site for your company/brand.
 */

export interface SiteConfig {
  // Company Information
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  author: string;
  foundedYear: number;

  // URLs
  baseUrl: string;
  githubRepoUrl: string;

  // Contact Information
  contact: {
    email: string;
    supportEmail: string;
    partnershipsEmail: string;
    discord: string;
    discordInvite: string;
    location: string;
  };

  // Social Media Links
  social: {
    twitter: string;
    twitterHandle: string;
    youtube: string;
    github: string;
    discord: string;
  };

  // SEO & Metadata
  seo: {
    keywords: string[];
    ogImage: string;
    twitterCard: "summary" | "summary_large_image" | "app" | "player";
  };

  // Branding
  branding: {
    logo: string;
    favicon: string;
    themeColor: string;
    backgroundColor: string;
  };

  // Legal
  legal: {
    copyrightHolder: string;
  };
}

export const siteConfig: SiteConfig = {
  // Company Information
  name: "LokiSoft",
  shortName: "LokiSoft",
  tagline: "Open Source Software Built on Christian Values",
  description:
    "We build open source software guided by Christian values and a commitment to the freedom of knowledge for everyone.",
  author: "LokiSoft",
  foundedYear: 2026,

  // URLs
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://lokisoft.xyz",
  githubRepoUrl:
    process.env.NEXT_PUBLIC_GITHUB_REPO_URL ||
    "https://github.com/LokiRothbrook/lokisoft",

  // Contact Information
  contact: {
    email: process.env.CONTACT_EMAIL || "hello@lokisoft.com",
    supportEmail: "support@lokisoft.com",
    partnershipsEmail: "partners@lokisoft.com",
    discord: "discord.gg/lokisoft",
    discordInvite: "https://discord.gg/lokisoft",
    location: "Worldwide",
  },

  // Social Media Links
  social: {
    twitter: "https://x.com/lokisoft",
    twitterHandle: "@lokisoft",
    youtube: "https://youtube.com/@lokisoft",
    github: "https://github.com/LokiRothbrook/LokiSoft",
    discord: "https://discord.gg/lokisoft",
  },

  // SEO & Metadata
  seo: {
    keywords: [
      "software development",
      "web development",
      "open source",
      "Christian values",
      "app development",
      "mobile apps",
      "e-commerce",
      "custom software",
      "home-lab",
      "tech",
      "programing",
      "web design"
    ],
    ogImage: "/og-image.svg",
    twitterCard: "summary_large_image",
  },

  // Branding
  branding: {
    logo: "/lokisoft-logo.svg",
    favicon: "/favicon.ico",
    themeColor: "#ff00ff",
    backgroundColor: "#0a0a0f",
  },

  // Legal
  legal: {
    copyrightHolder: "LokiSoft",
  },
};

// Helper function to get full URL
export function getFullUrl(path: string = ""): string {
  const base = siteConfig.baseUrl.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

// Helper function for page titles
export function getPageTitle(pageTitle?: string): string {
  if (!pageTitle) {
    return `${siteConfig.name} - ${siteConfig.tagline}`;
  }
  return `${pageTitle} | ${siteConfig.name}`;
}
