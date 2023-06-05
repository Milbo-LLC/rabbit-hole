"use client";

import Page from "@/components/ui/pages/Page";
import Header from "@/components/feature-landing/ui/Header";
// import OthersLearning from "@/components/feature-landing/ui/OthersLearning";
import HowItWorks from "@/components/feature-landing/ui/HowItWorks";
import DemoCourses from "@/components/feature-landing/ui/DemoCourses";

export default function Home() {
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
