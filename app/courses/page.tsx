import { Metadata } from "next";
import { GraduationCap, Sparkles } from "lucide-react";
import { getAllCourses } from "@/lib/courses";
import { CourseCard } from "@/components/courses/course-card";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Courses",
  description: "Free, high-quality courses on web development. From fundamentals to full-stack applications.",
  alternates: { canonical: `${siteConfig.baseUrl}/courses` },
};

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Free Forever
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-animated mb-6">
            LokiSoft Academy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Structured, in-depth courses taught the way craftsmen learn — step by step, concept by
            concept, building real things along the way. No fluff. No paywalls.
          </p>
        </div>

        {/* Courses grid */}
        {courses.length === 0 ? (
          <div className="text-center py-24">
            <GraduationCap className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Courses coming soon — check back shortly.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
            {courses.map((course, i) => (
              <CourseCard key={course.slug} course={course} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
