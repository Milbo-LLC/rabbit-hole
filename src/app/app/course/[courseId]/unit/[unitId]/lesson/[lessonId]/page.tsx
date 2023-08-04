"use client";

import { useSuspenseQuery } from "@apollo/client";
import { CourseQuery } from "@/components/graph";
import Page from "@/components/ui/pages/Page";
import LoadingScreen from "@/components/ui/pages/LoadingScreen";
import ErrorScreen from "@/components/ui/pages/ErrorScreen";
import { Course, CourseUnit, Maybe, UnitLesson } from "@/__generated__/graphql";
import LessonContentView from "@/components/feature-course/ui/LessonContentView";
import CourseNavigator from "@/components/feature-course/ui/CourseNavigator";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Suspense } from "react";

const LessonView = ({
  userId,
  courseId,
  unitId,
  lessonId,
}: {
  userId: string;
  courseId: string;
  unitId: string;
  lessonId: string;
}) => {
  const { data } = useSuspenseQuery<{ course: Course }>(CourseQuery, {
    variables: { courseId },
  });

  if (data) {
    const { course } = data;
    const unit = course.units.find(
      (unit: Maybe<CourseUnit>) => unit!.id === unitId
    );
    const lesson = unit!.lessons.find(
      (lesson: Maybe<UnitLesson>) => lesson!.id === lessonId
    );

    return (
      <div className="flex flex-col sm:flex-row w-full overflow-hidden h-full bg-[#173F5F]">
        <div className="flex flex-1">
          <CourseNavigator
            course={course}
            unitId={unitId}
            lessonId={lessonId}
          />
        </div>
        {/* <div className="flex w-full bg-red-400"></div> */}
        <LessonContentView userId={userId} course={course} lesson={lesson!} />
      </div>
    );
  }
  return null;
};

export default function Lesson({
  params,
}: {
  params: { courseId: string; unitId: string; lessonId: string };
}) {
  const { courseId, unitId, lessonId } = params;
  const { user, error, isLoading } = useUser();

  if (isLoading) return <LoadingScreen />;

  if (error) {
    return <ErrorScreen message={error.message} />;
  }

  if (user) {
    return (
      <Page>
        <Suspense>
          <LessonView
            userId={user.sub!}
            courseId={courseId}
            unitId={unitId}
            lessonId={lessonId}
          />
        </Suspense>
      </Page>
    );
  }
  return null;
}
