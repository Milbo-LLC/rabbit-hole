import { FieldValues, SubmitHandler } from "react-hook-form";

export interface FormProps {
  loading: boolean;
  onSubmit: SubmitHandler<FieldValues>;
  title?: string;
}
