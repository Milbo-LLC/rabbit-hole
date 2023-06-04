"use client";

import Image from "next/image";
import milboLogo from "@/assets/logo.svg";
import { motion } from "framer-motion";
import Link from "next/link";

const title = `rabbit hole`;

const tabs = [
  {
    label: "Terms of Service",
    link: "/terms-of-service",
  },
  {
    label: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    label: "Contact Us",
    link: "/contact",
  },
];

// Copyright copy
const message = `Made with 🤍 in Salem, MA`;
const company = `Milbo LLC`;
const crYear = `© ${new Date().getFullYear()}`;

const Logo = () => {
  return (
    <Link className="flex items-center gap-2 justify" href={"/"}>
      <div className="relative flex w-10 h-10">
        <Image src={milboLogo} alt="rabbit hole Logo" fill />
      </div>
      <div className="hidden sm:block font-lilita text-lg">{title}</div>
    </Link>
  );
};

const Links = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4">
      {tabs.map(({ label, link }) => (
        <Link className={`flex items-center `} key={label} href={link}>
          <motion.div
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            {label}
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

const Copyright = () => {
  return (
    <div className="text-end">
      <div className="hidden md:flex">{message}</div>
      <div className="flex flex-col md:flex-row justify-end md:gap-1">
        <div>{company}</div>
        <div>{crYear}</div>
      </div>
    </div>
  );
};

export default function Footer() {
  return (
    <motion.div
      className="flex w-full justify-between items-center text-xs sm:text-sm md:text-md font-bold px-6 pb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 30, delay: 0.5 }}
    >
      <Logo />
      <Links />
      <Copyright />
    </motion.div>
  );
}
