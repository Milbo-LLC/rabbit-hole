"use client";

import { FieldValues } from "@/components/ui/form";
import CreateCourseForm from "@/components/feature-course/ui/popups/create-course-popup/CreateCourseForm";

// Create Course Popup Content
const title = `Create a new course`;
const subTitle = `What would you like to learn next?`;

// onSubmit function
function onSubmit(data: FieldValues) {
  console.log("Submitted CreateCoursePopup Form - data: ", data);
}

// Create Course Popup View
export default function CreateCoursePopupView() {
  return (
    <div className="flex flex-col text-center justify-center items-center w-full h-full  p-2 sm:p-16 gap-4">
      <div className="flex flex-col gap-2">
        <h1>{title}</h1>
        <h2>{subTitle}</h2>
      </div>
      <div className="flex flex-1 w-full items-center">
        <CreateCourseForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}
