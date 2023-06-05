"use client";

import Button from "@/components/ui/buttons/Button";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player/lazy";

// CTA content
const title = `Experience the future of learning.`;
const subtitle = `Generate tailored learning resources for any topic you can imagine.`;
const ctaButtonLabel = `Sign up for Early Access`;

const CallToAction = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-full gap-8">
      <div>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <div className="flex h-full justify-center">
        <Button
          label={ctaButtonLabel}
          onClick={() => router.push("/api/auth/login")}
          bgColor="rgb(0, 0, 0, 0.4)"
        />
      </div>
    </div>
  );
};

export default function Header() {
  return (
    <motion.div
      className="flex w-full h-fit bg-[#173F5F] text-white p-8 rounded-lg drop-shadow-lg"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 30, delay: 0 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CallToAction />
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="flex h-full justify-center">
            <motion.div
              className="flex w-fit h-full justify-center rounded-md drop-shadow-lg"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: 0.2,
              }}
            >
              <div className="flex self-center h-fit">
                <ReactPlayer
                  className="rounded-lg overflow-hidden"
                  url="https://rabbit-hole-assets.s3.amazonaws.com/promo.mp4"
                  playing={true}
                  loop
                  width="100%"
                  height="100%"
                  volume={0}
                />
              </div>
            </motion.div>
          </div>
        </Grid>
      </Grid>
    </motion.div>
  );
}
