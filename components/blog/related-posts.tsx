import Link from "next/link";
import { Calendar, Clock, Star } from "lucide-react";
import { GlassCard } from "@/components/ui/hero-card";
import { CoverImage } from "@/components/ui/cover-image";
import type { Post } from "@/lib/blog";

interface RelatedPostsProps {
  posts: Post[];
}

function DifficultyStars({ difficulty }: { difficulty: number }) {
  return (
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
  );
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  const categoryColors = ["neon-pink", "neon-purple", "neon-blue", "neon-cyan"];

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6 gradient-text-animated">
        Related Posts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <GlassCard className="h-full group cursor-pointer p-4" glow="purple">
              <div className="flex gap-4">
                {/* Thumbnail */}
                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <CoverImage
                    src={post.coverImage}
                    alt={post.title}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-1 mb-1">
                    {post.categories.slice(0, 2).map((category, i) => (
                      <span
                        key={category}
                        className={`text-xs px-1.5 py-0.5 rounded-full bg-${categoryColors[i % categoryColors.length]}/10 text-${categoryColors[i % categoryColors.length]}`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-neon-pink transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readingTime} min</span>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="mt-1">
                    <DifficultyStars difficulty={post.difficulty} />
                  </div>
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
