import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCourses, getCourseBySlug, getLessonWithHtml, getAdjacentLessons } from "@/lib/courses";
import { siteConfig } from "@/lib/data/site";
import { SkillTreeSidebar } from "@/components/courses/skill-tree-sidebar";
import { LessonContent } from "@/components/courses/lesson-content";
import { TableOfContents } from "@/components/blog/table-of-contents";

export const dynamicParams = true;

interface LessonPageProps {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}

export async function generateStaticParams() {
  const courses = getAllCourses();
  return courses.flatMap((course) =>
    course.lessons.map((lesson) => ({
      courseSlug: course.slug,
      lessonSlug: lesson.slug,
    }))
  );
}

export async function generateMetadata({ params }: LessonPageProps): Promise<Metadata> {
  const { courseSlug, lessonSlug } = await params;
  const lesson = await getLessonWithHtml(courseSlug, lessonSlug);
  if (!lesson) return { title: "Lesson Not Found" };

  const url = `${siteConfig.baseUrl}/courses/${courseSlug}/lessons/${lessonSlug}`;

  return {
    title: lesson.title,
    description: lesson.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: lesson.title,
      description: lesson.excerpt,
      type: "article",
      url,
    },
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseSlug, lessonSlug } = await params;
  const [lesson, course] = await Promise.all([
    getLessonWithHtml(courseSlug, lessonSlug),
    Promise.resolve(getCourseBySlug(courseSlug)),
  ]);

  if (!lesson || !course) notFound();

  const { prev, next } = getAdjacentLessons(courseSlug, lessonSlug);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Skill tree sidebar */}
      <SkillTreeSidebar
        courseSlug={courseSlug}
        courseTitle={course.title}
        lessons={course.lessons}
      />

      {/* Main content + right ToC column */}
      <div className="flex flex-1 min-w-0">
        <div className="flex-1 min-w-0 px-4 sm:px-6 md:px-8 py-10">
          <LessonContent
            lesson={lesson}
            courseSlug={courseSlug}
            courseTitle={course.title}
            prev={prev}
            next={next}
          />
        </div>

        {/* Sticky ToC — 1400px+ only. Sidebar handles ToC via tab below that width */}
        <aside className="hidden min-[1400px]:flex w-56 2xl:w-64 shrink-0 flex-col sticky top-16 h-[calc(100vh-4rem)] border-l border-white/5 pt-10 pb-4">
          <p className="shrink-0 text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 mb-3">
            On this page
          </p>
          <div className="flex-1 min-h-0">
            <TableOfContents embedded />
          </div>
        </aside>
      </div>
    </div>
  );
}
