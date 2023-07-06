import useWindowSize from "@/components/utils/hooks/useWindowSize";
import Popup from "@/components/ui/popups/Popup";

interface CreateCoursePopupProps {
  // authorId: string;
  onClose: any;
  // refetchCourses: any;
}

export default function CreateCoursePopup({ onClose }: CreateCoursePopupProps) {
  const screenSize = useWindowSize();

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
        height: 400,
        backgroundColor: "#173F5F",
      }}
      onClose={onClose}
    >
      <div className="flex flex-col w-full h-full items-center justify-between p-0 sm:p-2 gap-1 sm:gap-4">
        <h1 className="text-white p-6 text-xl md:text-3xl">
          What would you like to learn next?
        </h1>
      </div>
    </Popup>
  );
}
