import Modal from "@/components/ui/modal";
import { MouseEventHandler } from "react";
interface CreateCoursePopupProps {
  open: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export default function CreateCoursePopup({
  open,
  onClose,
}: CreateCoursePopupProps): JSX.Element {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="bg-[#173F5F] bg-gradient-to-r from-black/20 to-black/40 rounded-2xl shadow-2xl	shadow-[#173F5F]/70 border-2 border-[#173F5F]"
    >
      <div className="flex w-full h-full justify-center items-center">
        <div>Design for the modal</div>
      </div>
    </Modal>
  );
}
