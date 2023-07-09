import Modal from "@/components/ui/modal";
import { MouseEventHandler } from "react";
import CreateCoursePopupView from "@/components/feature-course/ui/popups/create-course-popup/CreateCoursePopupView";
interface CreateCoursePopupProps {
  authorId: string;
  open: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  refetchCourses: () => void;
}

const popupAnimation = {
  initial: { opacity: 0, scale: 0.6 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.6 },
  transition: { type: "sepring", stiffness: 200, damping: 20, delay: 0 },
};

export default function CreateCoursePopup({
  authorId,
  open,
  onClose,
  refetchCourses,
}: CreateCoursePopupProps): JSX.Element {
  console.log("noah - CreateCoursePopup - authorId: " + authorId);
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="text-white bg-[#173F5F] bg-gradient-to-r from-black/20 to-black/40 rounded-2xl shadow-2xl shadow-[#173F5F]/70 border-2 border-[#173F5F]"
      animation={popupAnimation}
    >
      <CreateCoursePopupView
        onClose={onClose}
        authorId={authorId}
        refetchCourses={refetchCourses}
      />
    </Modal>
  );
}
