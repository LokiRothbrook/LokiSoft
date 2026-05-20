import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ParticleBackground } from "@/components/ui/particle-background";
import { getPostsForSearch } from "@/lib/blog";
import { getAllCategories } from "@/lib/courses";
import { siteConfig, getPageTitle, getFullUrl } from "@/lib/data/site";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: getPageTitle(),
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
    title: getPageTitle(),
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.branding.logo,
        width: 1200,
        height: 630,
        alt: getPageTitle(),
      },
    ],
  },
  twitter: {
    card: siteConfig.seo.twitterCard,
    site: siteConfig.social.twitterHandle,
    creator: siteConfig.social.twitterHandle,
    title: getPageTitle(),
    description: siteConfig.description,
    images: [siteConfig.branding.logo],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.baseUrl,
  },
  verification: {
    // Add your verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

// JSON-LD Structured Data for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.baseUrl,
  logo: getFullUrl(siteConfig.branding.logo),
  description: siteConfig.description,
  sameAs: [
    siteConfig.social.twitter,
    siteConfig.social.youtube,
    siteConfig.social.github,
    siteConfig.social.discord,
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: getFullUrl("/contact"),
  },
};

// JSON-LD Structured Data for WebSite (enables sitelinks search box)
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.baseUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: getFullUrl("/blog?q={search_term_string}"),
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getPostsForSearch();
  const allCategories = getAllCategories();
  const navCategories = allCategories.map((cat) => ({
    slug: cat.slug,
    title: cat.title,
    description: cat.description,
    icon: cat.icon,
    color: cat.color,
    courses: cat.courses.map((c) => ({
      slug: c.slug,
      categorySlug: c.categorySlug,
      title: c.title,
      description: c.description,
      icon: c.icon,
      color: c.color,
      lessons: c.lessons.map((l) => ({ slug: l.slug, title: l.title, excerpt: l.excerpt, isQuiz: l.isQuiz })),
    })),
  }));
  const footerCategories = allCategories.map((c) => ({ slug: c.slug, title: c.title }));

  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body
        className="font-sans antialiased min-h-screen flex flex-col"
      >
        <ScrollToTop />
        <ParticleBackground />
        <Navbar posts={posts} categories={navCategories} />
        <main className="flex-1 pt-16 overflow-x-clip">{children}</main>
        <Footer categories={footerCategories} />
        <Analytics />
      </body>
    </html>
  );
}
