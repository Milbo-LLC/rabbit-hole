"use client";

import { motion } from "framer-motion";
import { MouseEventHandler } from "react";
import { createPortal } from "react-dom";
import { BsX } from "react-icons/bs";

// Interfaces

interface ModalViewProps {
  onClose: MouseEventHandler<HTMLButtonElement | HTMLDivElement | SVGElement>;
  children?: JSX.Element;
  className?: string;
}

interface ModalProps {
  open: boolean;
  onClose: MouseEventHandler<HTMLButtonElement | HTMLDivElement | SVGElement>;
  children?: JSX.Element;
  className?: string;
}

function ModalView({ onClose, children, className }: ModalViewProps) {
  return (
    <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 my-4 sm:my-16 z-10">
      <div className={`flex max-w-2xl w-full h-full m-2 relative ${className}`}>
        {/* <div className={`flex w-full h-full ${className}`}> */}
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
        {children}
        {/* </div> */}
      </div>
    </div>
  );
}

export default function Modal({
  open,
  onClose,
  children,
  className,
}: ModalProps) {
  return (
    <>
      {open && (
        <div className="flex w-full h-full overlay">
          {createPortal(
            <ModalView onClose={onClose} className={className}>
              {children}
            </ModalView>,
            document.body
          )}
        </div>
      )}
    </>
  );
}
