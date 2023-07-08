import Modal from "@/components/ui/modal";
import { MouseEventHandler } from "react";
interface CreateCoursePopupProps {
  open: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

const popupAnimation = {
  initial: { opacity: 0, scale: 0.6 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.6 },
  transition: { type: "spring", stiffness: 200, damping: 20, delay: 0 },
};

function PopupContent() {
  const title = `What would you like to learn next?`;
  return (
    <div className="flex w-full h-full justify-center p-2 sm:p-16">
      <h1>{title}</h1>
    </div>
  );
}

export default function CreateCoursePopup({
  open,
  onClose,
}: CreateCoursePopupProps): JSX.Element {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="text-white bg-[#173F5F] bg-gradient-to-r from-black/20 to-black/40 rounded-2xl shadow-2xl shadow-[#173F5F]/70 border-2 border-[#173F5F]"
      animation={popupAnimation}
    >
      <PopupContent />
    </Modal>
  );
}
