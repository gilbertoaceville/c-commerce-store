import { HTMLInputTypeAttribute } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface InputProps
  extends React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  type?: HTMLInputTypeAttribute;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}

export interface CheckboxProps
  extends Omit<InputProps, "required" | "type"> {
  checked?: boolean;
}
