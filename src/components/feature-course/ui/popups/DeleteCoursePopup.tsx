import useWindowSize from "@/components/utils/hooks/useWindowSize";
import Popup from "@/components/ui/popups/Popup";
import { useState } from "react";
import Button from "@/components/ui/buttons/Button";
// import { useMutation } from "@apollo/client";
// import { DeleteCourseMutation } from "@/components/graph";
import { Course } from "@/__generated__/graphql";

const title = `Are you sure you want to delete this course?`;
const subtitle = `This action is permanent.`;

interface DeleteCoursePopupProps {
  course: Course;
  onClose: () => void;
  // refetchCourses: any;
}

export default function DeleteCoursePopup({
  course,
  onClose,
}: // refetchCourses,
DeleteCoursePopupProps) {
  const screenSize = useWindowSize();
  const [loading, setLoading] = useState(false);

  // // MUTATIONS
  // // Create course mutation
  // const [deleteCourse] = useMutation(DeleteCourseMutation, {
  //   onCompleted: (data: { deleteCourse: Course }) => {
  //     refetchCourses();
  //     onClose();
  //     setLoading(false);
  //   },
  //   onError: (error) => console.log("error creating course!: ", error),
  // });

  // // Function for calling create note mutation
  // const DeleteCourse = (id: string) => {
  //   deleteCourse({
  //     variables: {
  //       id,
  //     },
  //   });
  // };

  const onSubmit = async () => {
    setLoading(true);
    // DeleteCourse(course.id);
  };

  return (
    <Popup
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "12px",
        padding: "1rem",
        width: screenSize.width > 1024 ? "65%" : "90%",
        maxWidth: 600,
        backgroundColor: "#173F5F",
      }}
      onClose={onClose}
    >
      <div className="flex flex-col w-full h-full items-center justify-between p-0 sm:p-2 gap-1 sm:gap-4">
        <div className="flex flex-col p-6 text-center gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-4xl md:text-5xl">{title}</h1>
            <div className="text-xl md:text-2xl text-white">{subtitle}</div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex text-start text-white text-2xl">
              Deleting the following course:
            </div>
            <div className="flex flex-col text-start gap-4 text-white p-4 rounded-lg bg-black/40 mx-4">
              <div className="text-2xl">{course.title}</div>
              <div className="text-lg">{course.description}</div>
            </div>
          </div>
        </div>
        <Button label="Delete" onClick={() => onSubmit()} loading={loading} />
      </div>
    </Popup>
  );
}
