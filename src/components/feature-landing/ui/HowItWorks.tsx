import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import {
  BsFill1CircleFill,
  BsFill2CircleFill,
  BsFill3CircleFill,
} from "react-icons/bs";
import questionaireImg from "@/assets/questionaire.svg";
import courseInfoImg from "@/assets/courseInput.svg";
import courseTopicsImg from "@/assets/courseTopics.svg";
import Image from "next/image";

// How it Works content
const title = `How it works...`;

const steps = [
  {
    Icon: BsFill1CircleFill,
    message: `Tell us a little bit about yourself, your interests, goals and prior knowledge`,
    img: questionaireImg,
  },
  {
    Icon: BsFill2CircleFill,
    message: `Enter a title and a short description for a course on any topic you'd like to know more about`,
    img: courseInfoImg,
  },
  {
    Icon: BsFill3CircleFill,
    message: `Start learning instantly with tailored content generated just for you!`,
    img: courseTopicsImg,
  },
];

const HowItWorksGrid = () => {
  return (
    <Grid container spacing={2} className="flex h-full">
      {steps.map(({ message, Icon, img }, index) => (
        <Grid key={index} item xs={12} md={4}>
          <div
            className={`flex flex-col h-full items-center text-center bg-white/40 min-h-[380px] rounded-md ${
              index === 1 ? "pt-4 px-4" : "p-4"
            } gap-4 drop-shadow-lg`}
          >
            <div className="">
              <Icon className="text-4xl text-[#173F5F]" />
            </div>
            <div className="text-xl">{message}</div>
            <div className="relative flex w-full h-full">
              <Image src={img} alt="rabbit hole Logo" fill />
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};
export default function HowItWorks() {
  return (
    <motion.div
      className="flex flex-col gap-8 w-full bg-[#64B6AC] text-black p-8 rounded-lg drop-shadow-lg"
      initial={{ opacity: 0, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      <h1>{title}</h1>
      <HowItWorksGrid />
    </motion.div>
  );
}
