import { HTMLInputTypeAttribute } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface InputProps extends React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}
