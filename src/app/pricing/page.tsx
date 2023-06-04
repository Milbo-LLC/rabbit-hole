"use client";

import Button from "@/components/ui/buttons/Button";
import Page from "@/components/ui/pages/Page";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Footer from "@/components/feature-nav/footer";

const pricingOptions = [
  {
    title: "While in beta, rabbit hole is free to everyone!",
    price: 0,
    features: [
      "Generate up to 5 courses a month",
      "Access to all features",
      "Unlimited access to shared courses",
    ],
  },
];

const PricingGrid = () => {
  const router = useRouter();

  return (
    <motion.div
      className="flex w-full justify-center items-center"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 30, delay: 0 }}
    >
      {pricingOptions.map((option, index) => {
        return (
          <div
            key={index}
            className="flex flex-col gap-8 p-8 bg-[#173F5F] rounded-lg text-white drop-shadow-lg"
          >
            <div className="font-bold">{option.title}</div>
            <div>
              <span className="text-6xl font-bold">{`$${option.price} `}</span>
              <span className="font-bold">/month</span>
            </div>
            <div>
              {option.features.map((feature, index) => {
                return (
                  <div key={index} className="flex items-center gap-2">
                    <BsFillCheckCircleFill />
                    <div className="font-bold">{feature}</div>
                  </div>
                );
              })}
            </div>
            <Button
              label="Get Started"
              onClick={() => router.push("/api/auth/login")}
            />
          </div>
        );
      })}
    </motion.div>
  );
};

export default function Pricing() {
  return (
    <Page>
      <div className="flex w-full h-ful justify-center flex-col gap-4 pb-4">
        <div className="flex h-full">
          <PricingGrid />
        </div>
      </div>
    </Page>
  );
}
