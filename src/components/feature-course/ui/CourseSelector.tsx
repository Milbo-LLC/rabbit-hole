"use client";

import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Suspense, useEffect, useState } from "react";
import { BsFillTrashFill, BsSearch, BsXCircleFill } from "react-icons/bs";
import { EnrolledInQuery } from "@/components/graph";
import { Course, CourseEnrollment } from "@/__generated__/graphql";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import LoadingView from "@/components/ui/views/LoadingView";
import Button from "@/components/ui/buttons/Button";
import CreateCoursePopup from "./popups/create-course-popup";
import DeleteCoursePopup from "@/components/feature-course/ui/popups/DeleteCoursePopup";
import Link from "next/link";
import { useRouter } from "next/navigation";

const sortCourses = (courses: Course[]) => {
  return [...courses].sort((a: Course, b: Course) =>
    a.createdAt < b.createdAt ? -1 : 1
  );
};

const SearchBar = ({ setSearch }: { setSearch: (search: string) => void }) => {
  return (
    <div className="flex flex-1 items-center gap-4 px-4 bg-[#173F5F] rounded-lg border-2 border-black hover:border-white focus-within:border-white">
      <BsSearch className="text-2xl text-gray-400" />
      <input
        className="flex w-full text-lg bg-transparent outline-none text-white"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

const CourseSelectorTopbar = ({
  setSearch,
  setShowCreateCoursePopup,
  deleting,
  setDeleting,
  displayedCourses,
}: {
  setSearch: (search: string) => void;
  setShowCreateCoursePopup: (sccp: boolean) => void;
  deleting: boolean;
  setDeleting: (deleting: boolean) => void;
  displayedCourses: Course[];
}) => {
  return (
    <div className="flex w-full h-14 gap-4">
      <SearchBar setSearch={setSearch} />
      <Button
        label="Create Course"
        onClick={() => setShowCreateCoursePopup(true)}
        bgColor="#173F5F"
        className="text-white"
      />
      <Button
        bgColor="#173F5F"
        onClick={() => setDeleting(!deleting)}
        className="text-white"
        disabled={!displayedCourses.length}
        disabledMessage="You don't have any courses to delete"
      >
        <BsFillTrashFill className="text-2xl" />
      </Button>
    </div>
  );
};

export const revalidate = 5; // revalidate this page every 5 seconds
export const dynamic = "force-dynamic";

function CoursePreview({
  course,
  deleting,
  setDeletePopup,
}: {
  course: Course;
  deleting: boolean;
  setDeletePopup: (course: Course) => void;
}) {
  const router = useRouter();
  const { title, description, units } = course;

  const loading =
    !units.length ||
    units.find((unit) => unit?.lessons.find((lesson) => !lesson?.content));
  return (
    <Grid item xs={12} sm={6} md={4}>
      {loading ? (
        <div className="flex flex-col bg-[#173F5F] text-white h-48 p-4 rounded-lg border-2 border-transparent animate-pulse">
          <div className="text-2xl font-bold">{title}</div>
          <div className="flex h-full w-full justify-center items-center">
            <div>Your course is being generated!</div>
          </div>
        </div>
      ) : (
        <motion.div
          className={`bg-[#173F5F] text-white h-48 p-4 rounded-lg border-2 border-transparent relative ${
            !deleting && "hover:border-white cursor-pointer"
          }`}
          whileTap={!deleting ? { scale: 0.95 } : {}}
          onClick={() => !deleting && router.push(`/app/course/${course.id}`)}
        >
          {deleting && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 0, x: 16 }}
              animate={{ opacity: 1, y: -16, x: 16 }}
              onClick={() => console.log("DELETE COURSE")}
            >
              <BsXCircleFill
                className="text-3xl absolute -top-2 -right-2 bg-[#173F5F] rounded-full cursor-pointer hover:text-[#64B6AC] hover:bg-white"
                onClick={() => setDeletePopup(course)}
              />
            </motion.div>
          )}
          <div className="text-2xl font-bold">{title}</div>
          <div className="h-18 line-clamp-3">{description}</div>
        </motion.div>
      )}
    </Grid>
  );
}

function Courses({ userId }: { userId: string }) {
  console.log("noah - Courses - userId: ", userId);
  const { data, refetch: refetchCourses } = useSuspenseQuery<{
    enrolledIn: CourseEnrollment[];
  }>(EnrolledInQuery, {
    variables: { userId },
  });
  console.log("data: ", data);

  const [deleting, setDeleting] = useState(false);
  const [deletePopup, setDeletePopup] = useState<Course | undefined>(undefined);

  const [search, setSearch] = useState("");
  const [showCreateCoursePopup, setShowCreateCoursePopup] = useState(false);
  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);

  // Set displayed courses when data loads
  useEffect(() => {
    if (data) {
      const courses = data.enrolledIn.map(
        (enrollment: CourseEnrollment) => enrollment.course
      );
      console.log("courses: ", courses);
      setDisplayedCourses(sortCourses(courses));
    }
  }, [data]);

  // Update displayed courses when search changes
  useEffect(() => {
    if (data) {
      const courses = data.enrolledIn.map(
        (enrollment: CourseEnrollment) => enrollment.course
      );
      if (search !== "") {
        const coursesToDisplay = courses.filter((course: Course) => {
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
        setDisplayedCourses(sortCourses(courses));
      }
    }
  }, [data, search]);

  return (
    <div className="flex flex-col w-full gap-4">
      {/* {showCreateCoursePopup && (
        <CreateCoursePopup
          authorId={userId}
          onClose={() => setShowCreateCoursePopup(false)}
          refetchCourses={refetchCourses}
        />
      )} */}
      <CreateCoursePopup
        authorId={userId}
        open={showCreateCoursePopup}
        onClose={() => setShowCreateCoursePopup(false)}
        refetchCourses={refetchCourses}
      />
      {deletePopup && (
        <DeleteCoursePopup
          course={deletePopup}
          onClose={() => setDeletePopup(undefined)}
          refetchCourses={refetchCourses}
        />
      )}
      <CourseSelectorTopbar
        setSearch={setSearch}
        setShowCreateCoursePopup={setShowCreateCoursePopup}
        deleting={deleting}
        setDeleting={setDeleting}
        displayedCourses={displayedCourses}
      />
      <Grid container spacing={2}>
        {displayedCourses.map((course: Course) => {
          return (
            <CoursePreview
              key={course.id}
              course={course}
              deleting={deleting}
              setDeletePopup={setDeletePopup}
            />
          );
        })}
      </Grid>
      {/* </div> */}
    </div>
  );
}

export default function CourseSelector({ user }: { user: UserProfile }) {
  const userId = user.sub;
  const [search, setSearch] = useState("");
  return (
    <div className="flex w-full">
      <Suspense fallback={<LoadingView />}>
        <Courses userId={userId!} />
      </Suspense>
    </div>
  );
}
