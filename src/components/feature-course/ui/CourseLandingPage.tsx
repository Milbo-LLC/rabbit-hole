"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import {
  Course,
  CoursePrereq,
  CourseProgress,
  CourseUnit,
  Maybe,
  PrereqTopic,
  QuizAttempt,
  Status,
  UnitLesson,
} from "@/__generated__/graphql";
import { motion } from "framer-motion";

const CourseChatBot = () => {
  return (
    <div className="flex flex-col items-center w-full h-full p-4 gap-4">
      <div className="flex  w-full h-full rounded-lg gap-4">
        {/* <div className="flex w-full h-full bg-black/40 rounded-lg" /> */}
      </div>
      <motion.div
        className="flex w-fit px-4 justify-center items-center rounded-lg bg-[#64B6AC] drop-shadow-lg cursor-pointer border-2 border-transparent hover:border-white min-h-[40px]"
        whileTap={{ scale: 0.98 }}
        onClick={() => console.log("Clicked send message button")}
      >
        <div className="font-semibold">Send message</div>
      </motion.div>
    </div>
  );
};

const CourseDetails = ({
  title,
  description,
  course,
  progress,
}: {
  title: string;
  description: string;
  course: Course;
  progress: CourseProgress;
}) => {
  const router = useRouter();
  const unit = course.units.find((unit) =>
    unit?.lessons.find((lesson) => lesson!.id === progress.currentLessonId)
  );

  const numLessons = course.units.reduce(
    (count, unit) => count + unit!.lessons.length,
    0
  );
  const numQuizzes = course.units.length;

  return (
    <div className="flex flex-col w-full h-full p-2 sm:p-8 gap-4 bg-[#173F5F] text-white rounded-lg relative">
      <div className="text-4xl font-bold">{title}</div>
      <div className="text-2xl flex gap-4">{description}</div>
      <div className="grid grid-cols-2 sm:grid-cols-6 sm:grid-rows-6 grid-flow-row sm:grid-flow-col gap-4 aspect-[2/1] md:aspect-[3/1]">
        <div className="flex flex-col p-4 gap-4 bg-white/40 aspect-square sm:aspect-auto sm:col-span-2 lg:col-span-1 sm:row-span-3 rounded-lg">
          <div className="flex flex-1 w-full bg-[#173F5F] rounded-lg">
            <div className="flex justify-center items-center w-full bg-black/40 rounded-lg">
              <div className="flex items-end py-2 sm:p-0">
                <div className="text-6xl sm:text-8xl font-bold">
                  {progress.lessonsCompleted.length}
                </div>
                <div className="text-2xl pb-2 font-bold">{`/${numLessons}`}</div>
              </div>
            </div>
          </div>
          <div className="text-black text-xl font-bold text-center">
            Lessons Completed
          </div>
        </div>
        <div className="flex flex-col p-4 gap-4 bg-white/40 aspect-square sm:aspect-auto sm:col-span-2 lg:col-span-1 sm:row-span-3 rounded-lg">
          <div className="flex flex-1 w-full bg-[#173F5F] rounded-lg">
            <div className="flex justify-center items-center w-full bg-black/40 rounded-lg">
              <div className="flex items-end py-2 sm:p-0">
                <div className="text-6xl sm:text-8xl font-bold">
                  {
                    progress.quizAttempts.filter(
                      (attempt: Maybe<QuizAttempt>) =>
                        attempt?.status === Status.Completed
                    ).length
                  }
                </div>
                <div className="text-2xl pb-2 font-bold">{`/${numQuizzes}`}</div>
              </div>
            </div>
          </div>
          <div className="text-black text-xl font-bold text-center">
            Quizzes Completed
          </div>
        </div>
        <div className="bg-white/40 aspect-[2/1] sm:aspect-auto sm:row-span-5 col-span-2 sm:col-span-4  lg:col-span-5 rounded-lg">
          <CourseChatBot />
        </div>
        <div className="flex aspect-[8/1] sm:aspect-auto col-span-2 sm:col-span-4 lg:col-span-5">
          <motion.div
            className="flex w-full justify-center items-center rounded-lg bg-black/40 drop-shadow-lg cursor-pointer border-2 border-transparent hover:border-white min-h-[40px]"
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              course.units[0] &&
              course.units[0].lessons[0] &&
              router.push(
                `/app/course/${course.id}/unit/${
                  unit ? unit.id : course.units[0].id
                }/lesson/${
                  progress.currentLessonId || course.units[0]!.lessons[0].id
                }`
              )
            }
          >
            <div className="font-semibold">Jump in</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const LoadingCourseDetails = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col w-full h-full p-2 sm:p-8 gap-4 bg-[#173F5F] text-white rounded-lg relative">
      <div className="text-4xl font-bold">{title}</div>
      <div className="text-2xl flex gap-4">{description}</div>
      <div className="grid grid-cols-2 sm:grid-cols-6 sm:grid-rows-6 grid-flow-row sm:grid-flow-col gap-4 aspect-[2/1] md:aspect-[3/1]">
        <div className="flex flex-col p-4 gap-4 bg-white/40 aspect-square sm:aspect-auto sm:col-span-2 lg:col-span-1 sm:row-span-3 rounded-lg animate-pulse" />
        <div className="flex flex-col p-4 gap-4 bg-white/40 aspect-square sm:aspect-auto sm:col-span-2 lg:col-span-1 sm:row-span-3 rounded-lg animate-pulse" />
        <div className="bg-white/40 aspect-[2/1] sm:aspect-auto sm:row-span-5 col-span-2 sm:col-span-4  lg:col-span-5 rounded-lg animate-pulse" />
        <div className="flex aspect-[8/1] sm:aspect-auto col-span-2 sm:col-span-4 lg:col-span-5">
          <div className="flex w-full justify-center items-center rounded-lg bg-black/40 drop-shadow-lg cursor-not-allowed border-2 border-transparent min-h-[40px] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const PrereqTopics = ({
  description,
  topics,
}: {
  description: string;
  topics: Maybe<Maybe<PrereqTopic>[]>;
}) => {
  return (
    <div className="flex mx-2 text-base">
      <div className="flex flex-col gap-4 w-full px-4">
        {topics &&
          topics.map((topic, index) => {
            if (topic) {
              const { title } = topic;
              return (
                <div key={index} className="flex bg-[#173F5F] rounded-lg">
                  <div className="flex w-full p-4 font-semibold bg-black/40 rounded-lg">
                    {title}
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

const CoursePrereqs = ({
  prereqs,
  expandedPrereqs,
  setExpandedPrereqs,
  loading = false,
}: {
  prereqs?: Maybe<CoursePrereq>[];
  expandedPrereqs?: string[];
  setExpandedPrereqs?: (expandedPrereqs: string[]) => void;
  loading?: boolean;
}) => {
  return (
    <div className="flex flex-col w-full h-full p-2 sm:p-8 gap-4 bg-[#173F5F] text-white rounded-lg">
      <div className="text-4xl font-bold">Prerequisites</div>
      <div className="flex flex-col w-full gap-4">
        {loading
          ? [...Array(3)].map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col text-xl bg-white/40 p-4 gap-4 w-full rounded-lg font-bold text-transparent animate-pulse"
                >
                  Loading
                </div>
              );
            })
          : prereqs!.map((prereq, index) => {
              if (prereq) {
                const { id, title, description, topics } = prereq;
                const isExpanded = expandedPrereqs!.includes(id);
                return (
                  <div
                    key={index}
                    className="flex flex-col text-lg bg-white/40 py-4 px-2 sm:p-4 gap-4 w-full rounded-lg"
                  >
                    <div
                      className="flex items-center gap-2 cursor-pointer hover:underline decoration-black"
                      onClick={() =>
                        isExpanded
                          ? setExpandedPrereqs!(
                              expandedPrereqs!.filter((item) => item !== id)
                            )
                          : setExpandedPrereqs!([...expandedPrereqs!, id])
                      }
                    >
                      {isExpanded ? (
                        <BsChevronUp className="text-black" />
                      ) : (
                        <BsChevronDown className="text-black" />
                      )}
                      <div className="flex font-bold text-xl text-black">
                        {title}
                      </div>
                    </div>
                    {isExpanded && topics && (
                      <PrereqTopics description={description} topics={topics} />
                    )}
                  </div>
                );
              }
            })}
      </div>
    </div>
  );
};

const UnitLessons = ({
  description,
  lessons,
}: {
  description: string;
  lessons: Maybe<UnitLesson>[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortedLessons = lessons
    ? [...lessons].sort((a, b) => a!.order - b!.order)
    : lessons;
  return (
    <div className="flex flex-col gap-2">
      {sortedLessons.map((lesson, index) => {
        if (lesson) {
          const { unitId, title } = lesson;
          return (
            <div key={index} className="flex bg-[#173F5F] rounded-lg">
              <div className="flex flex-col w-full p-4 text-base bg-black/40 rounded-lg">
                <label className="flex gap-2 font-semibold">
                  <input type="checkbox" disabled />
                  <div
                    className="cursor-pointer hover:font-bold"
                    onClick={() =>
                      router.push(
                        `/app/course/${searchParams?.get(
                          "courseId"
                        )}/unit/${unitId}/lesson/${lesson.id}`
                      )
                    }
                  >
                    {title}
                  </div>
                </label>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

const UnitExercises = ({ unitId }: { unitId: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <div className="flex bg-[#173F5F] rounded-lg">
      <div className="flex flex-col w-full p-4 text-base bg-black/40 rounded-lg">
        <label className="flex gap-2 font-semibold">
          <input type="checkbox" disabled />
          <div
            className="cursor-pointer hover:font-bold"
            onClick={() =>
              router.push(
                `/app/course/${searchParams?.get(
                  "courseId"
                )}/unit/${unitId}/exercises`
              )
            }
          >{`Exercises`}</div>
        </label>
      </div>
    </div>
  );
};

const UnitQuiz = ({ unitId }: { unitId: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <div className="flex bg-[#173F5F] rounded-lg">
      <div className="flex flex-col w-full p-4 text-base bg-black/40 rounded-lg">
        <label className="flex gap-2 font-semibold">
          <input type="checkbox" disabled />
          <div
            className="cursor-pointer hover:font-bold"
            onClick={() =>
              router.push(
                `/app/course/${searchParams?.get(
                  "courseId"
                )}/unit/${unitId}/quiz`
              )
            }
          >{`Quiz`}</div>
        </label>
      </div>
    </div>
  );
};

const CourseUnits = ({
  units,
  expandedUnits,
  setExpandedUnits,
  loading = false,
}: {
  units?: Maybe<CourseUnit>[];
  expandedUnits?: string[];
  setExpandedUnits?: (expandedUnits: string[]) => void;
  loading?: boolean;
}) => {
  const sortedUnits = units
    ? [...units].sort((a, b) => a!.order - b!.order)
    : units;
  return (
    <div className="flex flex-col w-full h-full p-2 sm:p-8 gap-4 bg-[#173F5F] text-white rounded-lg">
      <div className="text-4xl font-bold">Units</div>
      <div className="flex flex-col w-full gap-4">
        {loading
          ? [...Array(3)].map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col text-xl bg-white/40 py-4 px-2 sm:p-4 gap-4 w-full rounded-lg font-bold text-transparent animate-pulse"
                >
                  Loading
                </div>
              );
            })
          : sortedUnits!.map((unit, index) => {
              if (unit) {
                const { id, title, description, lessons } = unit;
                const isExpanded = expandedUnits!.includes(id);
                return (
                  <div
                    key={index}
                    className="flex flex-col text-lg bg-white/40 py-4 px-2 sm:p-4 gap-4 w-full rounded-lg"
                  >
                    <div
                      className="flex items-center gap-2 cursor-pointer hover:underline decoration-black"
                      onClick={() =>
                        isExpanded
                          ? setExpandedUnits!(
                              expandedUnits!.filter((item) => item !== id)
                            )
                          : setExpandedUnits!([...expandedUnits!, id])
                      }
                    >
                      {isExpanded ? (
                        <BsChevronUp className="text-black" />
                      ) : (
                        <BsChevronDown className="text-black" />
                      )}
                      <div className="flex font-bold text-xl text-black gap-2">
                        <div>{index + 1}.</div>
                        <div>{title}</div>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="flex flex-col w-full px-8 gap-4 text-base">
                        <div className="text-lg text-black font-semibold">
                          {description}
                        </div>
                        <div className="flex flex-col gap-2">
                          <UnitLessons
                            description={description}
                            lessons={lessons}
                          />
                          <UnitExercises unitId={id} />
                          <UnitQuiz unitId={id} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            })}
      </div>
    </div>
  );
};

export default function CourseLandingPage({
  course,
  progress,
  loadingPrereqs,
  loadingUnits,
  refetchEnrollment,
}: {
  course: Course;
  progress: CourseProgress;
  loadingPrereqs: boolean;
  loadingUnits: boolean;
  refetchEnrollment: () => void;
}) {
  // useEffect(() => {
  //   refetchEnrollment();
  // }, [refetchEnrollment]);

  const { title, description, prereqs, units } = course;
  const [expandedPrereqs, setExpandedPrereqs] = useState<string[]>([]);
  const [expandedUnits, setExpandedUnits] = useState<string[]>([]);
  return (
    <div className="flex flex-col w-full h-full items-center p-4 overflow-auto">
      <div className="flex flex-col gap-4 w-full">
        {loadingPrereqs || loadingUnits ? (
          <LoadingCourseDetails title={title} description={description} />
        ) : (
          <CourseDetails
            title={title}
            description={description}
            course={course}
            progress={progress}
          />
        )}

        {loadingPrereqs && <CoursePrereqs loading />}
        {!loadingPrereqs && prereqs && prereqs.length !== 0 && (
          <CoursePrereqs
            prereqs={prereqs}
            expandedPrereqs={expandedPrereqs}
            setExpandedPrereqs={setExpandedPrereqs}
          />
        )}
        {loadingUnits && <CourseUnits loading />}
        {!loadingUnits && units && (
          <CourseUnits
            units={units}
            expandedUnits={expandedUnits}
            setExpandedUnits={setExpandedUnits}
          />
        )}
      </div>
    </div>
  );
}
