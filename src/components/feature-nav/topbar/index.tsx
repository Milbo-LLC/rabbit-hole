"use client";

import milboLogo from "@/assets/logo.svg";
import Logo from "@/components/ui/pages/icons/Logo";
import Tabs from "./ui/Tabs";
import {
  LayoutGroup,
  motion,
  stagger,
  useAnimate,
  useCycle,
} from "framer-motion";
import { useEffect, useRef } from "react";
import useWindowSize from "@/components/utils/hooks/useWindowSize";
import { MenuToggle } from "@/components/ui/buttons/MenuToggle";
import Link from "next/link";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";

const title = `rabbit hole`;
const altText = `rabbit hole logo`;

const tabs = (user: UserProfile | undefined) => {
  if (user) {
    return [
      {
        label: "Logout",
        link: "/api/auth/logout",
        className:
          "bg-[#64B6AC] text-black px-4 py-4 md:py-2 mt-2 md:mt-0 rounded-lg",
      },
    ];
  }
  return [
    {
      label: "Pricing",
      link: "/pricing",
    },
    {
      label: "About",
      link: "/about",
    },
    {
      label: "Login",
      link: "/api/auth/login",
    },
    {
      label: "Get Started",
      link: "/api/auth/login",
      className:
        "bg-[#64B6AC] text-black px-4 py-4 md:py-2 mt-2 md:mt-0 rounded-lg",
    },
  ];
};

const staggerDropdownItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (tabs.length) {
      animate(
        "ul",
        {
          clipPath: isOpen ? "inset(0% 0% 0% 0%)" : "inset(10% 50% 90% 50%)",
        },
        {
          type: "spring",
          bounce: 0,
          duration: 0.5,
        }
      );
      animate(
        "li",
        isOpen
          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
        {
          duration: 0.2,
          delay: isOpen ? staggerDropdownItems : 0,
        }
      );
    }
  }, [animate, isOpen]);

  return scope;
}

export default function Topbar() {
  const noTabs = !tabs.length;
  const [isOpen, toggleOpen] = useCycle(false, true);
  const scope = useMenuAnimation(isOpen);
  const containerRef = useRef(null);
  const { width } = useWindowSize();

  const { user } = useUser();

  useEffect(() => {
    if (width > 768 && isOpen) {
      toggleOpen(undefined);
    }
  }, [isOpen, toggleOpen, width]);

  return (
    <LayoutGroup>
      <motion.nav
        className="flex w-full justify-between items-center px-6 py-2"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        ref={containerRef}
      >
        <Logo Icon={milboLogo} text={title} altText={altText} />
        <div className="hidden md:flex">
          <Tabs tabs={tabs(user)} />
        </div>
        <div className="flex md:hidden">
          {!noTabs && (
            <>
              <div className="flex z-50">
                <MenuToggle toggle={() => toggleOpen()} />
              </div>
              <div ref={scope} className={`${isOpen && "overlay"}`}>
                <ul
                  className="bg-white absolute top-0 right-0 z-40 h-full w-60 flex flex-col px-8 py-20"
                  style={{
                    pointerEvents: isOpen ? "auto" : "none",
                    clipPath: "inset(10% 50% 90% 50% round 10px)",
                  }}
                >
                  {tabs(user).map(({ label, link }, index) => {
                    return (
                      <li id="item" key={index} className="list-none">
                        <Link href={link}>
                          <motion.div
                            className="p-2 rounded-lg cursor-pointer text-center text-lg font-semibold"
                            whileHover={{
                              scale: 1.05,
                            }}
                            whileTap={{
                              scale: 0.95,
                            }}
                          >
                            <div className="text-black">{label}</div>
                          </motion.div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* </div> */}
      </motion.nav>
    </LayoutGroup>
  );
}
