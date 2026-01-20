import { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { SectionTitle } from "@/components/ui/hero-card";
import { BlogPageClient } from "./blog-page-client";

export const metadata: Metadata = {
  title: "Blog",
  description: "Explore our latest articles, tutorials, and insights on web development, self-hosting, and more.",
};

export default async function BlogPage() {
  const allPosts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Blog"
          subtitle="Explore our latest articles, tutorials, and insights"
        />

        <BlogPageClient posts={allPosts} categories={categories} />
      </div>
    </div>
  );
}
