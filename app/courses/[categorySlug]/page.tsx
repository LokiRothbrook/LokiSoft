import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import { getAllCategories, getCategoryBySlug } from "@/lib/courses";
import { CourseCard } from "@/components/courses/course-card";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data/site";

interface CategoryPageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({ categorySlug: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.title} Courses`,
    description: category.description,
    alternates: { canonical: `${siteConfig.baseUrl}/courses/${categorySlug}` },
  };
}

const colorMap = {
  pink:   { icon: "text-neon-pink",   bg: "bg-neon-pink/10",   border: "border-neon-pink/30"   },
  purple: { icon: "text-neon-purple", bg: "bg-neon-purple/10", border: "border-neon-purple/30" },
  blue:   { icon: "text-neon-blue",   bg: "bg-neon-blue/10",   border: "border-neon-blue/30"   },
  cyan:   { icon: "text-neon-cyan",   bg: "bg-neon-cyan/10",   border: "border-neon-cyan/30"   },
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const colors = colorMap[category.color as keyof typeof colorMap] ?? colorMap.cyan;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <Link href="/courses">
          <Button variant="ghost" className="mb-8 text-neon-purple hover:text-neon-purple/80 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            All Tracks
          </Button>
        </Link>

        {/* Header */}
        <div className="flex items-start gap-5 mb-12">
          <div className={`p-4 rounded-2xl ${colors.bg} ${colors.icon} shrink-0`}>
            <DynamicIcon name={category.icon} className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text-animated mb-3">
              {category.title}
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              {category.description}
            </p>
            <p className="text-sm text-muted-foreground/60 mt-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              {category.courses.length} {category.courses.length === 1 ? "course" : "courses"}
            </p>
          </div>
        </div>

        {/* Courses grid */}
        {category.courses.length === 0 ? (
          <p className="text-muted-foreground text-center py-16">No courses yet — check back soon.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {category.courses.map((course, i) => (
              <CourseCard key={course.slug} course={course} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
