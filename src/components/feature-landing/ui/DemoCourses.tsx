import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

// How it Works content
const title = `Try out a demo course!`;

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
  {
    title: "Introduction to Yoga",
    description: "Experience the physical and mental benefits of yoga.",
  },
  {
    title: "How to tell stories",
    description:
      "Master the art of storytelling for personal and professional use.",
  },
];

const sortCourses = (courses: any) => {
  return [...courses].sort((a: any, b: any) =>
    a.createdAt < b.createdAt ? -1 : 1
  );
};

const SearchBar = ({ setSearch }: { setSearch: (search: string) => void }) => {
  return (
    <div className="flex flex-1 items-center gap-4 px-4 bg-black/40 rounded-lg border-2 border-transparent hover:border-white focus-within:border-white">
      <BsSearch className="text-2xl text-gray-400" />
      <input
        className="flex h-14 w-full text-lg bg-transparent outline-none text-white"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

const CourseGrid = ({ courses }: { courses: any[] }) => {
  return (
    <div className="flex h-full overflow-auto scrollbar-hide">
      <Grid container spacing={2}>
        {courses.map((course, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <div className="flex flex-col bg-black/40 h-48 rounded-md p-4 gap-4 drop-shadow-lg">
              <div className="text-2xl font-bold">{course.title}</div>
              <div className="text-base">{course.description}</div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default function DemoCourses() {
  const [displayedCourses, setDisplayedCourses] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  // Update displayed courses when search changes
  useEffect(() => {
    if (search !== "") {
      const coursesToDisplay = fakeCourses.filter((course: any) => {
        const lowerCaseTitle = course.title.toLowerCase();
        const lowerCaseDescription = course.description.toLowerCase();
        const lowerCaseSearch = search.toLowerCase();
        return (
          lowerCaseTitle.includes(lowerCaseSearch) ||
          lowerCaseDescription.includes(lowerCaseSearch)
        );
      });
      setDisplayedCourses(sortCourses(coursesToDisplay));
    } else {
      setDisplayedCourses(sortCourses(fakeCourses));
    }
  }, [search]);

  return (
    <motion.div
      className="flex flex-col gap-4 w-full h-[600px] bg-[#173F5F] text-white p-8 rounded-lg drop-shadow-lg"
      initial={{ opacity: 0, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      <h1 className="pb-4">{title}</h1>
      <SearchBar setSearch={setSearch} />
      <CourseGrid courses={displayedCourses} />
    </motion.div>
  );
}
