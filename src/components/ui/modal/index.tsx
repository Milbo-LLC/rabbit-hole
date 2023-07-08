"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MouseEventHandler } from "react";
import { createPortal } from "react-dom";
import { BsX } from "react-icons/bs";
import { handleClickOutside } from "@/components/utils/helper-functions";

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

function ModalView({
  onClose,
  children,
  className,
  animation,
}: ModalViewProps) {
  const ref = useRef(null);

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
        className={`flex max-w-2xl w-full max-h-[768px] h-full mx-4 relative ${className}`}
        ref={ref}
      >
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
      )}
    </AnimatePresence>
  );
}
