import { useRef, useEffect } from "react";

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const handleEnded = () => {
      video!.currentTime = 0;
      video!.play();
    };
    video!.addEventListener("ended", handleEnded);
    return () => {
      video!.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="flex">
      <video
        className="flex rounded-lg"
        ref={videoRef}
        src={src}
        autoPlay
        muted
      />
    </div>
  );
}
