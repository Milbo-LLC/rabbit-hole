import Form, { FieldValues } from "@/components/ui/form";
import TextField from "@/components/ui/form-fields/TextField";
import Button from "@/components/ui/buttons/Button";

interface CreateCourseFormProps {
  onSubmit: (data: FieldValues) => void;
}

export default function CreateCourseForm({ onSubmit }: CreateCourseFormProps) {
  return (
    <Form className="flex flex-col w-full items-center p-4" onSubmit={onSubmit}>
      <TextField
        name="title"
        type="text"
        placeholder="Give your course a title"
        required="Title is required."
      />
      <TextField
        name="description"
        type="text"
        placeholder="Write a short description for your course"
        required="Description is required."
        multiline
        minRows={4}
        maxRows={4}
      />
      <div className="flex">
        <Button label="Jump in" />
      </div>
    </Form>
  );
}
