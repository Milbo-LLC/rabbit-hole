// import Form, { FieldValues } from "@/components/ui/form";
import TextField from "@/components/ui/form-fields/TextField";
import Button from "@/components/ui/buttons/Button";
import { FieldValues, useForm } from "react-hook-form";

interface CreateCourseFormProps {
  onSubmit: (data: FieldValues) => void;
  loading: boolean;
}

export default function CreateCourseForm({
  onSubmit,
  loading,
}: CreateCourseFormProps) {
  // Form variables
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>();

  return (
    <form
      className="flex flex-col w-full items-center p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        control={control}
        name="title"
        type="text"
        placeholder="Give your course a title"
        required="Title is required."
        errors={errors}
      />
      <TextField
        control={control}
        name="description"
        type="text"
        placeholder="Write a short description for your course"
        required="Description is required."
        multiline
        minRows={4}
        maxRows={4}
        errors={errors}
      />
      <div className="flex">
        <Button label="Jump in" loading={loading} />
      </div>
    </form>
  );
}
