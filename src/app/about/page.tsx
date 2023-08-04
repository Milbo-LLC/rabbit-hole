"use client";

import Footer from "@/components/feature-nav/footer";
import Page from "@/components/ui/pages/Page";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";

// Mission statement copy
const msTitle = `Our mission is to transform the way we learn`;
const msContent = [
  `We think the traditional one-size-fits-all approach to learning is outdated. Every individual has unique learning needs and interests, and we strive to reduce the barriers to learning by providing personalized courses that are designed specifically for you and adapt to your needs.`,
  `With rabbit hole, you can learn at your own pace, on your own schedule, and in a way that suits your learning style.`,
  `Getting started is super easy! Simply sign up and tell us a little bit about yourself. Then, enter a title and description for the course you want to learn, and we'll take care of the rest!`,
  `The power of generative AI allows us to create a custom-tailored learning path that adapts to your needs and guides you towards achieving your goals. From there, you can dive into what you're interested in at your own pace, and on your own time.`,
];

// Core values copy
const cvTitle = `Core values`;
const coreValues = [
  {
    label: "Accessibility",
    description:
      "We believe that education should be accessible to everyone, regardless of their background, location, or financial situation. We are committed to reducing the barriers to learning.",
  },
  {
    label: "Personalization",
    description:
      "Everyone is unique, and we strive to create personalized content for each individual to guide them on their learning journey.",
  },
  {
    label: "Innovation",
    description:
      "We're passionate about exploring the latest advancements in AI technology and using them to perfect the learning experience.",
  },
  {
    label: "Community",
    description:
      "We are passionate about bringing people together and building a supportive network of learners, educatiors and industry experts.",
  },
  {
    label: "Empowerment",
    description:
      "Education is the key to unlocking your potential. Our goal is to to empower you to achieve your goals and guide you toward your dreams.",
  },
];

const MissionStatement = () => {
  return (
    <motion.div
      className="flex w-full justify-center"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 30, delay: 0 }}
    >
      <div className="flex flex-col rounded-lg w-full max-w-4xl bg-[#64B6AC] p-6 drop-shadow-lg gap-4">
        <h1>{msTitle}</h1>
        <motion.div
          className="flex flex-col w-full h-full p-4 gap-8 text-xl  bg-white/40 rounded-lg text-black font-medium"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 30,
            delay: 0.2,
          }}
        >
          {msContent.map((paragraph, index) => {
            return <div key={index}>{paragraph}</div>;
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

const CoreValues = () => {
  return (
    <motion.div
      className="flex w-full justify-center"
      initial={{ opacity: 0, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      <div className="flex flex-col rounded-lg w-full max-w-4xl bg-[#173F5F] text-white p-6 drop-shadow-lg gap-4">
        <h1>{cvTitle}</h1>
        <div className="flex flex-col w-full h-full px-4 py-6 gap-8 text-2xl bg-black/40 rounded-lg">
          {coreValues.map((value, index) => {
            return (
              <Grid key={index} container spacing={2} className="">
                <Grid item xs={12} sm={4} md={4} lg={3} className="">
                  <div className="flex flex-col items-center gap-4 px-8">
                    <div className="bg-black/40 w-full max-w-[200px] aspect-square rounded-full" />
                    <div className="text-lg sm:text-2xl font-bold">
                      {value.label}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={8} md={8} lg={9} className="">
                  <div className="0 flex h-full w-full items-center text-lg md:text-2xl">
                    {value.description}
                  </div>
                </Grid>
              </Grid>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default function About() {
  return (
    <Page>
      <div className="flex w-full h-fit flex-col gap-4 pb-4">
        <div className="flex h-full">
          <div className="flex flex-col gap-4 h-fit w-full">
            <MissionStatement />
            <CoreValues />
          </div>
        </div>
      </div>
    </Page>
  );
}
