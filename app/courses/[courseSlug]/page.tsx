import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, BookOpen, Layers } from "lucide-react";
import { getAllCourses, getCourseBySlug } from "@/lib/courses";
import { DifficultyStars } from "@/components/blog/difficulty-stars";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { Button } from "@/components/ui/button";
import { CourseCtaButton, CourseCurriculum, CourseProgressActions } from "@/components/courses/course-progress-section";
import { siteConfig } from "@/lib/data/site";

interface CoursePageProps {
  params: Promise<{ courseSlug: string }>;
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  return courses.map((c) => ({ courseSlug: c.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) return { title: "Course Not Found" };

  return {
    title: course.title,
    description: course.description,
    alternates: { canonical: `${siteConfig.baseUrl}/courses/${courseSlug}` },
  };
}

const colorMap = {
  pink: { icon: "text-neon-pink", bg: "bg-neon-pink/10", border: "border-neon-pink/30", glow: "shadow-[0_0_30px_rgba(236,72,153,0.12)]" },
  purple: { icon: "text-neon-purple", bg: "bg-neon-purple/10", border: "border-neon-purple/30", glow: "shadow-[0_0_30px_rgba(168,85,247,0.12)]" },
  blue: { icon: "text-neon-blue", bg: "bg-neon-blue/10", border: "border-neon-blue/30", glow: "shadow-[0_0_30px_rgba(59,130,246,0.12)]" },
  cyan: { icon: "text-neon-cyan", bg: "bg-neon-cyan/10", border: "border-neon-cyan/30", glow: "shadow-[0_0_30px_rgba(34,211,238,0.12)]" },
};

export default async function CourseOverviewPage({ params }: CoursePageProps) {
  const { courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);

  if (!course) notFound();

  const colors = colorMap[course.color as keyof typeof colorMap] ?? colorMap.cyan;
  const lessonCount = course.lessons.length;
  const quizCount = course.lessons.filter((l) => l.isQuiz).length;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Breadcrumb */}
        <Link href="/courses">
          <Button variant="ghost" className="mb-8 text-neon-purple hover:text-neon-purple/80 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            All Courses
          </Button>
        </Link>

        {/* Course hero */}
        <div className={`glass rounded-2xl border p-8 mb-10 ${colors.border} ${colors.glow}`}>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className={`p-4 rounded-2xl ${colors.bg} shrink-0 ${colors.icon}`}>
              <DynamicIcon name={course.icon} className="w-12 h-12" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${colors.icon}`}>
                  Free
                </span>
                <DifficultyStars difficulty={course.difficulty} size="sm" showName />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text-animated mb-4">
                {course.title}
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {lessonCount} lessons
                  {quizCount > 0 && ` · ${quizCount} quizzes`}
                </div>
                {course.estimatedHours > 0 && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    ~{course.estimatedHours} hours
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <CourseCtaButton courseSlug={courseSlug} lessons={course.lessons} />
                <CourseProgressActions />
              </div>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        {course.prerequisites.length > 0 && (
          <div className="glass rounded-xl border border-white/5 p-5 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4 text-neon-purple" />
              <span className="text-sm font-semibold">Prerequisites</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {course.prerequisites.map((pre) => (
                <Link
                  key={pre}
                  href={`/courses/${pre}`}
                  className="text-sm px-3 py-1 rounded-full bg-neon-purple/10 text-neon-purple hover:bg-neon-purple/20 transition-colors"
                >
                  {pre}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Lesson list — skill tree style */}
        <div className="glass rounded-2xl border border-white/5 p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-neon-cyan" />
            Course Curriculum
          </h2>

          <CourseCurriculum courseSlug={courseSlug} lessons={course.lessons} />
        </div>
      </div>
    </div>
  );
}
