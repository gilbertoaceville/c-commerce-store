import { IconType } from "react-icons";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  label: string;
  disabled?: boolean;
  small?: boolean;
  outline?: boolean;
  custom?: string;
  icon?: IconType;
  type?: "button" | "submit" | "reset";
}
