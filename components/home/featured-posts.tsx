"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, User, Clock, Star, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/hero-card";
import { CoverImage } from "@/components/ui/cover-image";
import type { Post } from "@/lib/blog";

interface FeaturedPostsProps {
  allPosts: Post[];
}

function DifficultyStars({ difficulty }: { difficulty: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground">Difficulty</span>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < difficulty
                ? "fill-neon-cyan text-neon-cyan"
                : "fill-transparent text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function BlogCard({ post, index }: { post: Post; index: number }) {
  const categoryColors = ["neon-pink", "neon-purple", "neon-blue", "neon-cyan"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <GlassCard className="h-full group cursor-pointer" glow="purple">
          {/* Cover Image */}
          <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
            <CoverImage
              src={post.coverImage}
              alt={post.title}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.announcement && (
              <span className="text-xs px-2 py-1 rounded-full bg-neon-pink/20 text-neon-pink font-medium">
                Announcement
              </span>
            )}
            {post.featured && (
              <span className="text-xs px-2 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan font-medium">
                Featured
              </span>
            )}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.slice(0, 3).map((category, i) => (
              <span
                key={category}
                className={`text-xs px-2 py-1 rounded-full bg-${categoryColors[i % categoryColors.length]}/10 text-${categoryColors[i % categoryColors.length]}`}
              >
                {category}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold mb-2 group-hover:text-neon-pink transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* Difficulty */}
          <div className="flex items-center justify-between">
            <DifficultyStars difficulty={post.difficulty} />
            <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-neon-pink transition-colors">
              Read more
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}

export function FeaturedPosts({ allPosts }: FeaturedPostsProps) {
  const [displayCount, setDisplayCount] = useState(6);
  const displayedPosts = allPosts.slice(0, displayCount);
  const hasMore = displayCount < allPosts.length;

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 6, allPosts.length));
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPosts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {hasMore && (
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={loadMore}
            variant="outline"
            size="lg"
            className="group"
          >
            Load More Posts
            <ChevronDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Showing {displayedPosts.length} of {allPosts.length} posts
          </p>
        </motion.div>
      )}
    </div>
  );
}
