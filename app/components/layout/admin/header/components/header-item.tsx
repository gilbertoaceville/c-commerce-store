import clsx from "clsx";
import { AdminHeaderItemProps } from "./types";

export default function AdminHeaderItem({
  selected,
  icon: Icon,
  label,
}: AdminHeaderItemProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-foreground hover:text-slate-500 transition cursor-pointer",
        selected ? "border-slate-500 text-foreground text-slate-500" : "border-transparent text-primary"
      )}
    >
      <Icon size={20} />
      <div className="font-medium text-sm text-center break-normal">
        {label}
      </div>
    </div>
  );
}
