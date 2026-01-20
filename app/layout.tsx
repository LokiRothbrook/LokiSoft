import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ParticleBackground } from "@/components/ui/particle-background";
import { getPostsForSearch } from "@/lib/blog";

const BASE_URL = "https://lokisoft.xyz";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "LokiSoft - Open Source Software Built on Christian Values",
    template: "%s | LokiSoft",
  },
  description:
    "LokiSoft is a Christian values company committed to open source and the freedom of knowledge for everyone. We build modern web applications, mobile apps, and custom software solutions.",
  keywords: [
    "LokiSoft",
    "open source",
    "Christian values",
    "web development",
    "app development",
    "custom software",
    "e-commerce",
    "LokiMoney",
  ],
  authors: [{ name: "LokiSoft" }],
  creator: "LokiSoft",
  publisher: "LokiSoft",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "LokiSoft",
    title: "LokiSoft - Open Source Software Built on Christian Values",
    description:
      "A Christian values company committed to open source and the freedom of knowledge for everyone.",
    // TODO: Create /public/og-image.png (1200x630px) for optimal social sharing
    // Currently using logo as fallback - create a proper OG image for best results
    images: [
      {
        url: "/lokisoft-logo.svg",
        width: 1200,
        height: 630,
        alt: "LokiSoft - Open Source Software Built on Christian Values",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@lokisoft",
    creator: "@lokisoft",
    title: "LokiSoft - Open Source Software Built on Christian Values",
    description:
      "A Christian values company committed to open source and the freedom of knowledge for everyone.",
    images: ["/lokisoft-logo.svg"],
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
    canonical: BASE_URL,
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
  name: "LokiSoft",
  url: BASE_URL,
  logo: `${BASE_URL}/lokisoft-logo.svg`,
  description:
    "A Christian values company committed to open source and the freedom of knowledge for everyone.",
  sameAs: [
    "https://x.com/lokisoft",
    "https://youtube.com/@lokisoft",
    "https://github.com/LokiRothbrook/LokiSoft-Blog",
    "https://discord.gg/lokisoft",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: `${BASE_URL}/contact`,
  },
};

// JSON-LD Structured Data for WebSite (enables sitelinks search box)
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "LokiSoft",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
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

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.27/dist/katex.min.css"
          integrity="sha384-37HxnHzKDeErp3qc4riQ1jVbWFLnF79MMh6cK0z9tFDI1EeF8qQHMJv7IilANpCh"
          crossOrigin="anonymous"
        />
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
        className="font-sans antialiased min-h-screen flex flex-col overflow-x-hidden"
      >
        <ParticleBackground />
        <Navbar posts={posts} />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
