import { useRouter, useSearchParams } from "next/navigation";
import { Course, CourseUnit, Maybe } from "@/__generated__/graphql";

interface CourseNavigatorProps {
  course: Course;
  unitId: string;
  lessonId: string;
}

export default function CourseNavigator({
  course,
  unitId,
  lessonId,
}: CourseNavigatorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { title, units } = course;
  const sortedUnits = units
    ? [...units].sort((a, b) => a!.order - b!.order)
    : units;
  return (
    <div className="flex flex-col bg-black/40 text-white w-full sm:w-60 md:w-80 px-2 py-4 gap-4 max-h-[200px] sm:max-h-none overflow-auto">
      <div
        className="flex self-center text-2xl font-bold button cursor-pointer"
        onClick={() =>
          router.push(
            `/app/course/${course.id}/unit/${unitId}/lesson/${lessonId}`
          )
        }
      >
        {title}
      </div>
      <div className="h-1 w-full bg-white" />
      <div className="flex flex-col gap-2">
        {sortedUnits.map((unit: Maybe<CourseUnit>, unitIndex: number) => {
          if (unit) {
            const { id, title, lessons } = unit;
            const isActiveUnit = unitId === id;
            const isExercises = lessonId === "exercises";
            const isQuiz = lessonId === "quiz";
            const sortedLessons = lessons
              ? [...lessons].sort((a, b) => a!.order - b!.order)
              : lessons;
            return (
              <div
                key={id}
                className={`flex flex-col p-4 bg-black/50 border-2 border-transparent ${
                  !isActiveUnit && "hover:border-white"
                }  rounded-lg`}
              >
                <div
                  className={`${isActiveUnit ? "font-bold" : "cursor-pointer"}`}
                  onClick={() =>
                    !isActiveUnit &&
                    router.push(
                      `/app/course/${searchParams?.get(
                        "courseId"
                      )}/unit/${id}/lesson/${lessons[0]!.id}`
                    )
                  }
                >
                  {`${unitIndex + 1}. ${title}`}
                </div>
                {isActiveUnit && (
                  <div className="flex flex-col px-4">
                    {sortedLessons.map((lesson, lessonIndex) => {
                      if (lesson) {
                        const { id, title } = lesson;
                        const isActiveLesson = lessonId === id;
                        return (
                          <div
                            key={id}
                            className={`flex gap-2 ${
                              isActiveLesson ? "font-bold" : "cursor-pointer"
                            }`}
                            onClick={() =>
                              router.push(
                                `/app/course/${searchParams?.get(
                                  "courseId"
                                )}/unit/${unitId}/lesson/${lesson.id}`
                              )
                            }
                          >
                            <div>{`${unitIndex + 1}.${lessonIndex + 1}`}</div>
                            <div className="hover:underline">{`${title}`}</div>
                          </div>
                        );
                      }
                    })}
                    <div
                      key={id}
                      className={`flex gap-2 ${
                        isExercises ? "font-bold" : "cursor-pointer"
                      }`}
                      onClick={() =>
                        router.push(
                          `/app/course/${searchParams?.get(
                            "courseId"
                          )}/unit/${unitId}/exercises`
                        )
                      }
                    >
                      <div className="hover:underline">{`Exercises`}</div>
                    </div>
                    <div
                      key={id}
                      className={`flex gap-2 ${
                        isQuiz ? "font-bold" : "cursor-pointer"
                      }`}
                      onClick={() =>
                        router.push(
                          `/app/course/${searchParams?.get(
                            "courseId"
                          )}/unit/${unitId}/quiz`
                        )
                      }
                    >
                      <div className="hover:underline">{`Quiz`}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
