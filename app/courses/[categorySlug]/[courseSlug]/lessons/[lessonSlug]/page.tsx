import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCategories, getCourseBySlug, getLessonWithHtml, getAdjacentLessons } from "@/lib/courses";
import { siteConfig } from "@/lib/data/site";
import { SkillTreeSidebar } from "@/components/courses/skill-tree-sidebar";
import { LessonContent } from "@/components/courses/lesson-content";

export const dynamicParams = true;

interface LessonPageProps {
  params: Promise<{ categorySlug: string; courseSlug: string; lessonSlug: string }>;
}

export async function generateStaticParams() {
  return getAllCategories().flatMap((cat) =>
    cat.courses.flatMap((course) =>
      course.lessons.map((lesson) => ({
        categorySlug: cat.slug,
        courseSlug: course.slug,
        lessonSlug: lesson.slug,
      }))
    )
  );
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { categorySlug, courseSlug, lessonSlug } = await params;
  const lesson = await getLessonWithHtml(categorySlug, courseSlug, lessonSlug);
  if (!lesson) return { title: "Lesson Not Found" };

  const url = `${siteConfig.baseUrl}/courses/${categorySlug}/${courseSlug}/lessons/${lessonSlug}`;
  return {
    title: lesson.title,
    description: lesson.excerpt,
    alternates: { canonical: url },
    openGraph: { title: lesson.title, description: lesson.excerpt, type: "article", url },
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { categorySlug, courseSlug, lessonSlug } = await params;
  const [lesson, course] = await Promise.all([
    getLessonWithHtml(categorySlug, courseSlug, lessonSlug),
    Promise.resolve(getCourseBySlug(categorySlug, courseSlug)),
  ]);

  if (!lesson || !course) notFound();

  const { prev, next } = getAdjacentLessons(categorySlug, courseSlug, lessonSlug);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <SkillTreeSidebar
        categorySlug={categorySlug}
        courseSlug={courseSlug}
        courseTitle={course.title}
        lessons={course.lessons}
      />
      <div className="flex-1 min-w-0 px-4 sm:px-6 md:px-8 py-10">
        <LessonContent
          lesson={lesson}
          categorySlug={categorySlug}
          courseSlug={courseSlug}
          courseTitle={course.title}
          prev={prev}
          next={next}
        />
      </div>
    </div>
  );
}
