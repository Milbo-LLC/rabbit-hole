"use client";

import { FieldValues } from "@/components/ui/form";
import CreateCourseForm from "@/components/feature-course/ui/popups/create-course-popup/CreateCourseForm";
import { useMutation } from "@apollo/client";
import {
  CreateCourseMutation,
  GenerateLessonMutation,
  GeneratePrereqsMutation,
  GenerateQuizMutation,
  GenerateUnitsMutation,
} from "@/components/graph";
import {
  Course,
  CourseUnit,
  Maybe,
  UnitLesson,
  UnitQuiz,
} from "@/__generated__/graphql";
import { useState } from "react";

// Create Course Popup Content
const title = `Create a new course`;
const subTitle = `What would you like to learn next?`;

// Create Course Popup View
export default function CreateCoursePopupView({
  onClose,
  authorId,
  refetchCourses,
}: {
  onClose: () => void;
  authorId: string;
  refetchCourses: () => void;
}) {
  // Variables
  const [loading, setLoading] = useState(false);

  // MUTATIONS
  // Create course mutation
  const [createCourse] = useMutation(CreateCourseMutation, {
    onCompleted: (data: { createCourse: Course }) => {
      refetchCourses();
      onClose();
      setLoading(false);
      GeneratePrerqs(data.createCourse.id);
      GenerateUnits(data.createCourse.id);
    },
    onError: (error) => console.log("error creating course!: ", error),
  });

  // Function for calling create note mutation
  const CreateCourse = (title: string, description: string) => {
    const input = {
      authorId,
      title,
      description,
    };
    createCourse({
      variables: {
        input,
      },
    });
  };

  // Generate prereqs mutation
  const [generatePrerqs] = useMutation(GeneratePrereqsMutation, {
    onCompleted: (data: { generatePrereqs: Course }) => {
      refetchCourses();
    },
    onError: (error) => console.log("error generating prereqs: ", error),
  });

  // Function for calling create note mutation
  const GeneratePrerqs = (id: string) => {
    generatePrerqs({
      variables: {
        id,
      },
    });
  };

  // Generate units mutation
  const [generateUnits] = useMutation(GenerateUnitsMutation, {
    onCompleted: (data: { generateUnits: Course }) => {
      refetchCourses();
      data.generateUnits.units.forEach((unit: Maybe<CourseUnit>) => {
        if (unit) {
          unit.lessons.forEach((lesson: Maybe<UnitLesson>) => {
            lesson &&
              GenerateLesson(
                data.generateUnits.title,
                data.generateUnits.description,
                lesson.id,
                lesson.title,
                lesson.topics
              );
          });
          GenerateQuiz(unit.id);
        }
      });
    },
    onError: (error) => console.log("error generating units!: ", error),
  });

  // Function for calling create note mutation
  const GenerateUnits = (id: string) => {
    generateUnits({
      variables: {
        id,
      },
    });
  };

  // Generate lesson mutation
  const [generateLesson] = useMutation(GenerateLessonMutation, {
    onCompleted: (data: { generateLesson: UnitLesson }) => {
      refetchCourses();
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

  const [generateQuiz] = useMutation(GenerateQuizMutation, {
    onCompleted: (data: { generateQuiz: UnitQuiz }) => {
      refetchCourses();
    },
  });

  // Function for calling create note mutation
  const GenerateQuiz = (unitId: string) => {
    generateQuiz({
      variables: {
        id: unitId,
      },
    });
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      setLoading(true);
      CreateCourse(data.title, data.description);
    } catch (error) {
      setLoading(false);
      console.error("Error calling openai-test endpoint: ", error);
    }
  };

  return (
    <div className="flex flex-col text-center justify-center items-center w-full h-full  p-2 sm:p-16 gap-4">
      <div className="flex flex-col gap-2">
        <h1>{title}</h1>
        <h2>{subTitle}</h2>
      </div>
      <div className="flex flex-1 w-full items-center">
        <CreateCourseForm onSubmit={onSubmit} loading={loading} />
      </div>
    </div>
  );
}
