"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  UpdateUserDetailsMutation,
  UserDetailsQuery,
} from "@/components/graph";
import ReactMarkdown from "react-markdown";
import { PulseLoader } from "react-spinners";
import {
  EnrollmentQuery,
  GenerateLessonMutation,
  UpdateCompletedLessonsMutation,
  UpdateCurrentLessonIdMutation,
} from "@/components/graph";
import {
  Course,
  CourseProgress,
  UnitLesson,
  UserDetails,
} from "@/__generated__/graphql";
import Button from "@/components/ui/buttons/Button";
import { motion } from "framer-motion";
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsFillSunFill,
  BsMoonFill,
} from "react-icons/bs";
import { useRouter } from "next/navigation";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";

export default async function LessonContentView({
  userId,
  course,
  lesson,
}: {
  userId: string;
  course: Course;
  lesson: UnitLesson;
}) {
  const {
    id: courseId,
    title: courseTitle,
    description: courseDescription,
  } = course;
  const router = useRouter();
  const { id: lessonId, title: lessonTitle, topics } = lesson;
  const [content, setContent] = useState(lesson.content);
  const [loading, setLoading] = useState(false);
  const [markingComplete, setMarkingComplete] = useState(false);
  const [highlightedText, setHighlightedText] = useState("");

  const { data: UserDetailsData, refetch: refetchUserDetails } = useQuery(
    UserDetailsQuery,
    {
      variables: { userId },
    }
  );

  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    console.log(
      "LessonView - UserDetailsData useEffect - UserDetailsData: ",
      UserDetailsData
    );
    if (UserDetailsData) {
      setNightMode(UserDetailsData.userDetails.nightMode);
    }
  }, [UserDetailsData]);

  const unit = course.units.find((u) =>
    u?.lessons.find((l) => l!.id === lessonId)
  );
  let prevLesson = unit?.lessons.find((l) => l!.order === lesson.order - 1);
  let previous: { unitId: any; lessonId: any };

  if (!prevLesson) {
    const prevUnit = course.units.find((u) => u!.order === unit!.order - 1);
    prevLesson = prevUnit
      ? prevUnit.lessons[prevUnit.lessons.length - 1]
      : undefined;
    if (prevLesson) {
      previous = {
        unitId: prevUnit?.id,
        lessonId: prevLesson.id,
      };
    }
  } else {
    previous = {
      unitId: unit?.id,
      lessonId: prevLesson.id,
    };
  }

  let nextLesson = unit?.lessons.find((l) => l!.order === lesson.order + 1);
  let next: { unitId: any; lessonId: any };

  if (!nextLesson) {
    const nextUnit = course.units.find((u) => u!.order === unit!.order + 1);
    nextLesson = nextUnit ? nextUnit.lessons[0] : undefined;
    if (nextLesson) {
      next = {
        unitId: nextUnit?.id,
        lessonId: nextLesson.id,
      };
    }
  } else {
    next = {
      unitId: unit?.id,
      lessonId: nextLesson.id,
    };
  }

  const {
    loading: loadingEnrollment,
    error,
    data,
    refetch: refetchEnrollment,
  } = useQuery(EnrollmentQuery, {
    variables: { userId, courseId },
  });

  useEffect(() => {
    console.log("highlightedText: ", highlightedText);
  }, [highlightedText]);

  useEffect(() => {
    setContent(lesson.content);
  }, [lesson.content, lesson.id]);

  // MUTATIONS
  // Generate lesson mutation
  const [generateLesson] = useMutation(GenerateLessonMutation, {
    onCompleted: (data: { generateLesson: UnitLesson }) => {
      setContent(data.generateLesson.content);

      setLoading(false);
    },
  });

  // Function for calling create note mutation
  const GenerateLesson = (
    courseTitle: string,
    courseDescription: string,
    lessonId: string,
    lessonTitle: string,
    topics: string
  ) => {
    const input = {
      courseTitle,
      courseDescription,
      lessonId,
      lessonTitle,
      topics,
      pastTopics: "",
    };
    generateLesson({
      variables: {
        input,
      },
    });
  };

  // Update Current LessonId Mutation
  const [updateCurrentLessonId] = useMutation(UpdateCurrentLessonIdMutation);

  useEffect(() => {
    // Function for calling create note mutation
    const UpdateCurrentLessonId = (
      userId: string,
      courseId: string,
      lessonId: string
    ) => {
      const input = {
        userId,
        courseId,
        lessonId,
      };
      updateCurrentLessonId({
        variables: {
          input,
        },
      });
    };
    UpdateCurrentLessonId(userId, courseId, lessonId);
  }, [courseId, lessonId, updateCurrentLessonId, userId]);

  const [updateCompletedLessons] = useMutation(UpdateCompletedLessonsMutation, {
    onCompleted: (data: { updateCompletedLessons: CourseProgress }) => {
      setMarkingComplete(false);
    },
  });

  // Function for calling create note mutation
  const UpdateCompletedLessons = (
    userId: string,
    courseId: string,
    lessonId: string
  ) => {
    const input = {
      userId,
      courseId,
      lessonId,
    };
    updateCompletedLessons({
      variables: {
        input,
      },
    });
  };

  // Update User Details mutation
  const [updateUserDetails] = useMutation(UpdateUserDetailsMutation, {
    onCompleted: (data: { updateUserDetails: UserDetails }) => {
      console.log("LessonView - updateUserDetails - data: ", data);
      refetchUserDetails();
      setLoading(false);
    },
    onError: (error) => console.log("error creating course!: ", error),
  });

  // Function for calling create note mutation
  const UpdateUserDetails = (nightMode: boolean) => {
    const input = {
      nightMode,
    };
    setLoading(true);
    updateUserDetails({
      variables: {
        userId,
        input,
      },
    });
  };

  if (content === "" || loadingEnrollment) {
    if (!loading) {
      setLoading(true);
      GenerateLesson(
        courseTitle,
        courseDescription,
        lessonId,
        lessonTitle,
        topics
      );
    }

    return (
      <div className="flex justify-center items-center flex-1 bg-white rounded-lg m-8 px-4 pt-4 pb-8">
        <PulseLoader color="#173F5F" size={20} />
      </div>
    );
  }

  const handleMouseUp = () => {
    setHighlightedText(window.getSelection()!.toString());
  };

  if (error) {
    <div>Error</div>;
  }

  // if (data) {
  //   const completed =
  //     data.enrollment.progress.lessonsCompleted.includes(lessonId);
  //   return (
  //     <div className="flex w-full h-full p-4 relative flex-wrap">
  //       <motion.div
  //         className={`flex w-fit p-2 rounded-full  absolute top-8 right-8  cursor-pointer opacity-20 ${
  //           nightMode ? "bg-[#64B6AC] text-black" : "bg-[#173F5F] text-white"
  //         }`}
  //         whileHover={{ scale: 1.05, opacity: 100 }}
  //         whileTap={{ scale: 0.95 }}
  //         onClick={() => UpdateUserDetails(!nightMode)}
  //       >
  //         {nightMode ? (
  //           <BsFillSunFill className="text-2xl" />
  //         ) : (
  //           <BsMoonFill className="text-2xl" />
  //         )}
  //       </motion.div>
  //       {/* <div
  //         className={`flex flex-col rounded-lg gap-4 px-4 pt-4 pb-8 w-full h-full overflow-y-auto scrollbar-hide ${
  //           nightMode ? "bg-black text-white" : "bg-white text-black"
  //         }`}
  //         onMouseUp={handleMouseUp}
  //       >
  //         <ReactMarkdown className="flex flex-col w-fit">
  //           {content}
  //         </ReactMarkdown>
  //         <div className="flex w-full justify-between items-center">
  //           {prevLesson ? (
  //             <motion.div
  //               className="flex gap-2 items-center cursor-pointer"
  //               whileHover={{ scale: 1.05 }}
  //               whileTap={{ scale: 0.95 }}
  //               onClick={() =>
  //                 router.push(
  //                   `/app/course/${course.id}/unit/${previous?.unitId}/lesson/${previous?.lessonId}`
  //                 )
  //               }
  //             >
  //               <BsArrowLeftShort className="text-2xl sm:text-4xl" />
  //               <div className="sm:text-xl">Prevous Lesson</div>
  //             </motion.div>
  //           ) : (
  //             <div className="flex gap-2 items-center text-transparent">
  //               <BsArrowLeftShort className="text-2xl sm:text-4xl" />
  //               <div className="sm:text-xl">Prevous Lesson</div>
  //             </div>
  //           )}
  //           <Button
  //             label={`${completed ? "Mark as Incomplete" : "Mark as Complete"}`}
  //             className={`${
  //               completed
  //                 ? "border-2 border-[#173F5F] text-black"
  //                 : "border-2 text-white"
  //             }`}
  //             bgColor={`${completed ? "#FFFFFF" : "#173F5F"}`}
  //             onClick={() => {
  //               setMarkingComplete(true);
  //               UpdateCompletedLessons(userId, courseId, lessonId);
  //             }}
  //             loading={markingComplete}
  //           />
  //           {nextLesson ? (
  //             <motion.div
  //               className="flex gap-2 items-center cursor-pointer"
  //               whileHover={{ scale: 1.05 }}
  //               whileTap={{ scale: 0.95 }}
  //               onClick={() =>
  //                 router.push(
  //                   `/app/course/${course.id}/unit/${next?.unitId}/lesson/${next?.lessonId}`
  //                 )
  //               }
  //             >
  //               <div className="sm:text-xl">Next Lesson</div>
  //               <BsArrowRightShort className="text-2xl sm:text-4xl" />
  //             </motion.div>
  //           ) : (
  //             <div className="flex gap-2 items-center text-transparent">
  //               <div className="sm:text-xl">Next Lesson</div>
  //               <BsArrowRightShort className="text-2xl sm:text-4xl" />
  //             </div>
  //           )}
  //         </div>
  //       </div> */}
  //       <div className="flex w-full overflow-y-auto overflow-x-hidden rounded-lg bg-red-400">
  //         <ReactMarkdown className="flex flex-col flex-wrap w-full">
  //           {content}
  //         </ReactMarkdown>
  //       </div>
  //     </div>
  //   );
  // }

  if (data) {
    const processedContent = await remark()
      .use(remarkParse)
      .use(remarkRehype)
      .process(content);
    return <div>{String(processedContent)}</div>;
  }
  return null;
}
