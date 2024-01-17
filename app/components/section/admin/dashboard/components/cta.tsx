import clsx from "clsx";
import { CtaProps } from "../types";

export default function Cta({
  disabled,
  title,
  icon: Icon,
  onClick,
}: CtaProps) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] text-primary border border-foreground",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <Icon size={18} />
    </button>
  );
}
