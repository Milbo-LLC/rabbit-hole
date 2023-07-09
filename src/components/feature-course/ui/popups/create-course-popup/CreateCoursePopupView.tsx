"use client";

import { FieldValues } from "@/components/ui/form";
import CreateCourseForm from "@/components/feature-course/ui/popups/create-course-popup/CreateCourseForm";
import { useMutation } from "@apollo/client";
import { CreateCourseMutation } from "@/components/graph";
import { Course, CourseUnit } from "@/__generated__/graphql";
import { MouseEventHandler, useState } from "react";

// Create Course Popup Content
const title = `Create a new course`;
const subTitle = `What would you like to learn next?`;

// Create Course Popup View
export default function CreateCoursePopupView({
  onClose,
  authorId,
  refetchCourses,
}: {
  onClose: MouseEventHandler<HTMLButtonElement>;
  authorId: string;
  refetchCourses: () => void;
}) {
  console.log("authorId: ", authorId);
  // Variables
  const [loading, setLoading] = useState<boolean>(false);

  // Mutation
  const [createCourse] = useMutation(CreateCourseMutation, {
    onCompleted: (data: { createCourse: Course }) => {
      setLoading(false);
      refetchCourses();
      onClose;
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

  // onSubmit function
  function onSubmit(data: FieldValues) {
    setLoading(true);
    CreateCourse(data.title, data.description);
    console.log("Submitted CreateCoursePopup Form - data: ", data);
  }

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
