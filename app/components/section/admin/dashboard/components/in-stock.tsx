import clsx from "clsx";
import { InStockProps } from "../types";

export default function InStock({ className, icon: Icon, text }: InStockProps) {
  return (
    <div className={clsx(className, "flex px-1 rounded items-center gap-1")}>
      {text} <Icon size={15} />
    </div>
  );
}
