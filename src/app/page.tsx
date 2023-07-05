"use client";

import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

import Page from "@/components/ui/pages/Page";
import Header from "@/components/feature-landing/ui/Header";
// import OthersLearning from "@/components/feature-landing/ui/OthersLearning";
import HowItWorks from "@/components/feature-landing/ui/HowItWorks";
import DemoCourses from "@/components/feature-landing/ui/DemoCourses";
import LoadingScreen from "@/components/ui/pages/LoadingScreen";
import { GrabUser } from "@/components/utils/hooks/grabUser";

export default function Home() {
  const router = useRouter();

  const { user, error, isLoading } = GrabUser();

  useEffect(() => {
    if (user) {
      router.push("app/courses");
    }
  }, [router, user]);

  // UPDATE NEEDED - Add loading screen and error screen
  if (isLoading) return <LoadingScreen />;
  if (error) return <div>{error.message}</div>;

  if (!user) {
    return (
      <Page>
        <div className="flex w-full h-fit flex-col gap-4 pb-4">
          <Header />
          {/* <OthersLearning /> */}
          <HowItWorks />
          <DemoCourses />
        </div>
      </Page>
    );
  }
  return null;
}
