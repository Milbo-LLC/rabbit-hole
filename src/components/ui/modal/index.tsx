"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MouseEventHandler } from "react";
import { createPortal } from "react-dom";
import { BsX } from "react-icons/bs";
import { handleClickOutside } from "@/components/utils/helper-functions";
import useWindowSize from "@/components/utils/hooks/useWindowSize";

// Types
type Animation = {
  initial: Object;
  animate: Object;
  exit: Object;
  transition: Object;
};

// Interfaces
interface ModalViewProps {
  onClose: MouseEventHandler<HTMLButtonElement | HTMLDivElement | SVGElement>;
  children?: JSX.Element;
  className?: string;
  animation?: Animation;
}

interface ModalProps {
  open: boolean;
  onClose: MouseEventHandler<HTMLButtonElement | HTMLDivElement | SVGElement>;
  children?: JSX.Element;
  className?: string;
  animation?: Animation;
}

// const draw = {
//   hidden: { pathLength: 0, opacity: 0 },
//   visible: (i: number) => {
//     const delay = 1 + i * 0.5;
//     return {
//       pathLength: 1,
//       opacity: 1,
//       transition: {
//         pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
//         opacity: { delay, duration: 0.01 },
//         repeat: Infinity,
//       },
//     };
//   },
// };

function ModalView({
  onClose,
  children,
  className,
  animation,
}: ModalViewProps) {
  const ref = useRef(null);
  const screenSize = useWindowSize();
  const frame = document.getElementById("frame");
  const [frameDimensions, setFrameDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setFrameDimensions({
      width: frame ? frame.clientWidth : 0,
      height: frame ? frame.clientHeight : 0,
    });
  }, [frame, screenSize]);

  useEffect(() => {
    console.log("frameDimensions: ", frameDimensions);
  }, [frameDimensions]);

  // Event listener for closing modal when clicking outside of it
  useEffect(() => {
    document.addEventListener(
      "click",
      (e: MouseEvent) => handleClickOutside(e, ref, onClose),
      true
    );
  }, [onClose]);

  return (
    <motion.div
      key="modal"
      className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 my-16 z-10"
      {...animation}
    >
      <div
        id="frame"
        className={`flex max-w-2xl w-full max-h-[768px] h-full mx-4 relative ${className}`}
        ref={ref}
      >
        {/* <div className="absolute">
          <motion.svg
            width={frameDimensions.width}
            height={frameDimensions.height}
            viewBox={`0 0 ${frameDimensions.width} ${frameDimensions.height}`}
          >
            <motion.rect
              width={frameDimensions.width - 4}
              height={frameDimensions.height - 4}
              x="2"
              y="2"
              rx="12"
              stroke="#0099ff"
              strokeWidth="4"
              className="fill-transparent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                repeat: Infinity,
                // repeatType: "mirror",
                duration: 2,
              }}
            />
          </motion.svg>
        </div> */}
        <motion.div
          className="flex absolute top-5 right-5 w-10 h-10 cursor-pointer"
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.95,
          }}
        >
          <BsX onClick={onClose} className="w-full h-full" />
        </motion.div>
        <div className="pt-16 sm:pt-0 w-full">{children}</div>
      </div>
    </motion.div>
  );
}

export default function Modal({
  open,
  onClose,
  children,
  className,
  animation,
}: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="flex w-full h-full overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={animation?.transition}
          >
            {createPortal(
              <ModalView
                onClose={onClose}
                className={className}
                animation={animation}
              >
                {children}
              </ModalView>,
              document.body
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
