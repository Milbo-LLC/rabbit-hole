"use client";

import Page from "@/components/ui/pages/Page";
import { PulseLoader } from "react-spinners";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CourseSelector from "@/components/feature-course/ui/CourseSelector";
import LoadingView from "@/components/ui/views/LoadingView";
import AppPage from "@/components/ui/pages/AppPage";

export default function Courses() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  // Redirect to home if user is not logged in
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [router, user]);

  // Loading View
  if (isLoading) {
    return (
      <AppPage>
        <div className="flex w-full h-full justify-center items-center">
          <LoadingView />
        </div>
      </AppPage>
    );
  }

  // Error View
  if (error) return <div>{error.message}</div>;

  // Logged in view
  if (user) {
    return (
      <AppPage>
        <CourseSelector user={user} />
      </AppPage>
    );
  }

  return null;
}
