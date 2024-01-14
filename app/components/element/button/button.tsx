import clsx from "clsx";
import { ButtonProps } from "./types";

export default function Button({
  label,
  outline,
  small,
  disabled,
  custom = "",
  icon: Icon,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      data-small={String(small)}
      data-with-outline={String(outline)}
      type={type}
      className={clsx(
        "cta disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none rounded-md transition opacity-80 hover:opacity-100 w-full border-tertiary flex items-center justify-center gap-2 @apply text-base font-semibold py-3 px-4 border-2 bg-primary text-secondary",
        custom
      )}
      {...props}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
}
