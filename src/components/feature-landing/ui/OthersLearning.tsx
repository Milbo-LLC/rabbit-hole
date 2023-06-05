import { Grid } from "@mui/material";
import { motion } from "framer-motion";

// Others Learning content
const title = `Check out what others are diving into.`;

// Temporary fake data
const fakeCourses = [
  {
    title: "Machine Learning",
    description: "An introductory course on Machine Learning.",
  },
  {
    title: "Art of Mixology",
    description:
      "Learn how to create delicious cocktails and impress your friends with your bartending skills.",
  },
  {
    title: "Mastering Chess",
    description:
      "Take your chess game to the next level with this course that covers advanced strategies and tactics.",
  },
  {
    title: "Science of Happiness",
    description: "Discover research-based techniques to boost your well-being.",
  },
  {
    title: "World Travel Cuisines",
    description:
      "Travel the world through cooking and learn about different cultures.",
  },
  {
    title: "DIY Home Improvement",
    description: "Gain confidence in tackling basic home repairs.",
  },
];

const CourseGrid = () => {
  return (
    <Grid container spacing={2} className="flex h-full">
      {fakeCourses.map((course, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <div className="flex bg-black/40 h-48 rounded-md p-4 drop-shadow-lg">
            <div className="flex flex-col gap-4">
              <div className="text-2xl font-bold">{course.title}</div>
              <div className="text-base">{course.description}</div>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default function OthersLearning() {
  return (
    <motion.div
      className="flex flex-col gap-8 w-full h-fit bg-[#173F5F] text-white p-8 rounded-lg drop-shadow-lg"
      initial={{ opacity: 0, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      <h1 className="">{title}</h1>
      <CourseGrid />
    </motion.div>
  );
}
