import { motion } from "framer-motion";
import React, { MouseEventHandler } from "react";
import PulseLoader from "react-spinners/PulseLoader";

interface ButtonProps {
  type?: "submit" | "button";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  label?: string;
  className?: string;
  bgColor?: string;
  secondary?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({
  type = "submit",
  onClick,
  label,
  className,
  bgColor,
  loading,
  disabled = false,
}: ButtonProps) {
  const defaultLabel = "Select";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{
        ...(!disabled && { scale: 1.05 }),
      }}
      whileTap={{ ...(!disabled && { scale: 0.95 }) }}
      className="rounded-lg"
    >
      <div
        className={`${className} flex justify-center p-4 px-6 rounded-lg bg-white/40 drop-shadow-lg ${
          disabled && "cursor-not-allowed opacity-50"
        }`}
        style={{
          backgroundColor: bgColor,
        }}
      >
        {loading ? (
          <PulseLoader color="#58335e" size={20} />
        ) : (
          <div className="font-semibold">{label || defaultLabel}</div>
        )}
      </div>
    </motion.button>
  );
}
