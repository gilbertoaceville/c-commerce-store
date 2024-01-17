import clsx from "clsx";
import { ContentStatusProps } from "../types";

export default function ContentStatus({
  className,
  icon: Icon,
  text,
}: ContentStatusProps) {
  return (
    <div className={clsx(className, "flex px-1 rounded items-center gap-1")}>
      {text} <Icon size={15} />
    </div>
  );
}
