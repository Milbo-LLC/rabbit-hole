"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Suspense } from "react";
import { EnrollmentQuery } from "@/components/graph";
import Page from "@/components/ui/pages/Page";
// import LoadingPage from "@/components/ui/pages/LoadingPage";
// import ErrorPage from "@/components/ui/pages/ErrorPage";
import CourseLandingPage from "@/components/feature-course/ui/CourseLandingPage";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CourseEnrollment } from "@/__generated__/graphql";
import { PulseLoader } from "react-spinners";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import LoadingView from "@/components/ui/views/LoadingView";
import LoadingScreen from "@/components/ui/pages/LoadingScreen";
import ErrorScreen from "@/components/ui/pages/ErrorScreen";

const CourseView = ({
  userId,
  courseId,
}: {
  userId: string;
  courseId: string;
}) => {
  // const [timer, setTimer] = useState(0);
  const [loadingPrereqs, setLoadingPrereqs] = useState(false);
  const [loadingUnits, setLoadingUnits] = useState(false);

  const { data, refetch: refetchEnrollment } = useSuspenseQuery<{
    enrollment: CourseEnrollment;
  }>(EnrollmentQuery, {
    variables: { userId, courseId },
  });

  // useEffect(() => {
  //   if (
  //     data &&
  //     data.enrollment.course.prereqs &&
  //     data.enrollment.course.prereqs.length === 0
  //   ) {
  //     setLoadingPrereqs(true);
  //     setLoadingUnits(true);
  //     refetchEnrollment();
  //     //Implementing the setInterval method
  //     const interval = setInterval(() => {
  //       setTimer(timer + 1);
  //     }, 1000);

  //     //Clearing the interval
  //     return () => clearInterval(interval);
  //   } else {
  //     setLoadingPrereqs(false);
  //   }

  //   if (
  //     data &&
  //     data.enrollment.course.units &&
  //     data.enrollment.course.units.length === 0
  //   ) {
  //     refetchEnrollment();
  //     //Implementing the setInterval method
  //     const interval = setInterval(() => {
  //       setTimer(timer + 1);
  //     }, 1000);

  //     //Clearing the interval
  //     return () => clearInterval(interval);
  //   } else {
  //     setLoadingUnits(false);
  //   }
  // }, [data, timer]);

  if (data) {
    const { course, progress } = data.enrollment;
    return (
      <CourseLandingPage
        course={course}
        progress={progress!}
        loadingPrereqs={loadingPrereqs}
        loadingUnits={loadingUnits}
        refetchEnrollment={refetchEnrollment}
      />
    );
  }
  return null;
};

export default function ActiveCourse({
  params,
}: {
  params: { courseId: string };
}) {
  console.log("HERE");
  const { courseId } = params;
  const { user, error, isLoading } = useUser();

  if (isLoading) return <LoadingScreen />;

  if (error) {
    return <ErrorScreen message={error.message} />;
  }

  if (user && courseId) {
    return (
      <Page>
        <Suspense fallback={<LoadingView />}>
          <CourseView userId={user.sub!} courseId={courseId as string} />
        </Suspense>
      </Page>
    );
  }

  return null;
}
