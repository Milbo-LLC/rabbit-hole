import { motion } from "framer-motion";
import React, { MouseEventHandler } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { Tooltip } from "@mui/material";

interface ButtonProps {
  type?: "submit" | "button";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  label?: string;
  className?: string;
  bgColor?: string;
  secondary?: boolean;
  loading?: boolean;
  disabled?: boolean;
  disabledMessage?: string;
  tooltipMessage?: string;
  children?: JSX.Element;
}

export default function Button({
  type = "submit",
  onClick,
  label,
  className,
  bgColor,
  loading,
  disabled = false,
  disabledMessage = "This button is disabled",
  tooltipMessage,
  children,
}: ButtonProps) {
  const defaultLabel = "Select";

  return (
    <Tooltip title={disabled ? disabledMessage : tooltipMessage} arrow>
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
          ) : label ? (
            <div className="font-semibold">{label || defaultLabel}</div>
          ) : (
            <div>{children}</div>
          )}
        </div>
      </motion.button>
    </Tooltip>
  );
}
