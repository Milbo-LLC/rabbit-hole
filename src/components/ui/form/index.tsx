import { cloneElement, Children } from "react";
import { FieldValues as ReactHookFieldValues, useForm } from "react-hook-form";

export type FieldValues = ReactHookFieldValues;

export interface FormProps {
  className?: string;
  onSubmit: (data: FieldValues) => void;
  children: any;
}

export default function Form({ className, onSubmit, children }: FormProps) {
  // Form variables
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>();

  // Used to add control and errors props to TextFields
  const renderChildren = () => {
    return Children.map(children, (child) => {
      if (child.type.name === "TextField") {
        return cloneElement(child, {
          control: control,
          errors: errors,
        });
      }
      return child;
    });
  };

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      {renderChildren()}
    </form>
  );
}
