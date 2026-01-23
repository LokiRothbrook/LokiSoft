import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Star, Tag, Github, MessageSquare, GitPullRequest } from "lucide-react";
import { getPostWithHtml, getAllPosts, getRelatedPosts, Post } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { SupportButton } from "@/components/ui/support-button";
import { TableOfContents, BlogContent, Comments, RelatedPosts } from "@/components/blog";
import { siteConfig } from "@/lib/data/site";

// ISR: Revalidate every hour
export const revalidate = 3600;

// Generate Article JSON-LD schema for blog posts
function generateArticleSchema(post: Post, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? `${siteConfig.baseUrl}${post.coverImage}` : `${siteConfig.baseUrl}${siteConfig.branding.logo}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.baseUrl}${siteConfig.branding.logo}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.baseUrl}/blog/${slug}`,
    },
    wordCount: post.content.split(/\s+/).length,
    articleSection: post.categories.join(", "),
    keywords: post.categories.join(", "),
  };
}

// Generate BreadcrumbList JSON-LD schema
function generateBreadcrumbSchema(post: Post, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteConfig.baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.baseUrl}/blog/${slug}`,
      },
    ],
  };
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostWithHtml(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const postUrl = `${siteConfig.baseUrl}/blog/${slug}`;
  // TODO: Create /public/og-image.png (1200x630px) for optimal social sharing fallback
  const ogImage = post.coverImage || siteConfig.branding.logo;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    keywords: post.categories,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: postUrl,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      section: post.categories[0],
      tags: post.categories,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

function DifficultyStars({ difficulty }: { difficulty: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < difficulty
              ? "fill-neon-cyan text-neon-cyan"
              : "fill-transparent text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-2">
        {difficulty === 1 && "Beginner"}
        {difficulty === 2 && "Easy"}
        {difficulty === 3 && "Intermediate"}
        {difficulty === 4 && "Advanced"}
        {difficulty === 5 && "Expert"}
      </span>
    </div>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostWithHtml(slug);

  if (!post) {
    notFound();
  }

  const categoryColors = ["neon-pink", "neon-purple", "neon-blue", "neon-cyan"];
  const articleSchema = generateArticleSchema(post, slug);
  const breadcrumbSchema = generateBreadcrumbSchema(post, slug);
  const relatedPosts = getRelatedPosts(slug, 4);

  return (
    <>
      {/* JSON-LD Structured Data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <div className="min-h-screen py-12">
        <div className="w-full max-w-full px-4 sm:px-6 md:px-8 lg:pl-24 lg:pr-12 xl:pl-32 xl:pr-16">
          {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 text-neon-purple hover:text-neon-purple/80 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Button>
        </Link>

        {/* Main layout with TOC */}
        <div className="flex gap-6 lg:gap-8 xl:gap-12">
          {/* Article container - centers article content on large screens */}
          <div className="flex-1 min-w-0 min-[1366px]:flex min-[1366px]:justify-center">
            <article className="w-full min-[1366px]:max-w-[56rem]">
            {/* Header */}
            <header className="mb-12 text-center">
              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {post.announcement && (
                  <span className="text-sm px-3 py-1 rounded-full bg-neon-pink/20 text-neon-pink font-medium">
                    Announcement
                  </span>
                )}
                {post.featured && (
                  <span className="text-sm px-3 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan font-medium">
                    Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text-animated mb-6">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {post.categories.map((category, i) => (
                  <Link
                    key={category}
                    href={`/blog?category=${encodeURIComponent(category)}`}
                    className={`text-sm px-3 py-1 rounded-full bg-${categoryColors[i % categoryColors.length]}/10 text-${categoryColors[i % categoryColors.length]} hover:bg-${categoryColors[i % categoryColors.length]}/20 transition-colors`}
                  >
                    {category}
                  </Link>
                ))}
              </div>

              {/* Difficulty */}
              <div className="flex justify-center">
                <DifficultyStars difficulty={post.difficulty} />
              </div>
            </header>

            {/* Content */}
            <div className="glass rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 overflow-x-auto">
              <BlogContent contentHtml={post.contentHtml || ""} />
            </div>

            {/* Support CTA */}
            <SupportButton className="mt-12" />

            {/* Contribution CTA */}
            <div className="mt-12 rounded-2xl border border-neon-cyan/30 bg-gradient-to-br from-neon-cyan/5 to-neon-purple/5 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0 p-3 rounded-xl bg-neon-cyan/10">
                  <GitPullRequest className="w-8 h-8 text-neon-cyan" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Spotted a bug in the matrix?
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Found an error, typo, or want to improve this post? We welcome contributions!
                    Submit a pull request or open an issue on GitHub. Or drop a comment below to start a discussion.
                    Thanks for helping us keep the signal clean!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <a
                    href={siteConfig.githubRepoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto bg-zinc-700/80 hover:bg-zinc-600/80 border-zinc-600 text-foreground"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  </a>
                  <a href="#comments">
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Comment
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Comments */}
            <Comments />

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-border/30">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Link href="/blog">
                  <Button variant="outline" className="group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                  </Button>
                </Link>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Share this post:</span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${siteConfig.baseUrl}/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-neon-pink transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </footer>
            </article>
          </div>

          {/* Table of Contents - Right side */}
          <TableOfContents />
        </div>
      </div>
    </div>
    </>
  );
}
