"use client";

import { FieldValues, UseFormSetValue, useForm } from "react-hook-form";
import { FormProps } from ".";
import { Box, Grid } from "@mui/material";
import TextField from "../form-fields/TextField";
import { REGEX_EMAIL } from "@/components/utils/regex";
import Button from "../buttons/Button";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

// Credentials for EmailJS
const emailJSAccessToken = process.env.NEXT_PUBLIC_EMAILJS_ACCESS_TOKEN;
const emailJSServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const emailJSTempleId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

const onSubmit = ({
  data,
  setValue,
}: {
  data: any;
  setValue: UseFormSetValue<FieldValues>;
}) => {
  Object.keys(data).map((keys) => setValue(`${keys}`, ""));
  const templateParams = { ...data };
  if (emailJSAccessToken && emailJSServiceId && emailJSTempleId) {
    emailjs
      .send(
        emailJSServiceId,
        emailJSTempleId,
        templateParams,
        emailJSAccessToken
      )
      .then(() => console.log("Success!: "))
      .catch((error) => console.log("Error: ", error));
  }
};

export default function ContactForm({ loading }: FormProps) {
  // React Hook Form variables
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<FieldValues>();

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      <form onSubmit={handleSubmit((data) => onSubmit({ data, setValue }))}>
        <Box sx={{ flexGrow: 1 }} className="w-full max-w-2xl">
          <Grid container columnSpacing={3}>
            <Grid item xs={12}>
              <TextField
                control={control}
                name="name"
                type="text"
                placeholder="Full name"
                required="Full name is required."
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                control={control}
                name="email"
                type="text"
                placeholder="Email address"
                required="Email address is required."
                pattern={{
                  value: REGEX_EMAIL,
                  message: "Please enter a valid email address",
                }}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                control={control}
                name="message"
                type="text"
                placeholder="Message"
                required="Message is required."
                errors={errors}
                multiline
                minRows={4}
                maxRows={4}
              />
            </Grid>
            <Grid item xs={12} className="flex justify-center pt-8">
              <Button label="Submit" loading={loading} />
            </Grid>
          </Grid>
        </Box>
      </form>
    </motion.div>
  );
}
