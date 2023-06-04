"use client";

import { useState } from "react";
import Page from "@/components/ui/pages/Page";
import ContactForm from "@/components/ui/forms/ContactForm";
import { motion } from "framer-motion";

const Header = () => {
  const title = `Contact us.`;

  return (
    <motion.div
      className="flex flex-col self-center justify-center text-center max-w-4xl"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 30, delay: 0 }}
    >
      <h1 className="text-[72px] leading-none sm:leading-4">{title}</h1>
    </motion.div>
  );
};

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    console.log("contact - submit clicked.");
  };
  return (
    <Page>
      <div className="flex flex-col w-full h-full items-center">
        <div className="flex flex-col max-w-4xl h-full gap-16">
          <Header />
          <div className="flex flex-1 h-full items-center">
            <ContactForm loading={loading} onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </Page>
  );
}
