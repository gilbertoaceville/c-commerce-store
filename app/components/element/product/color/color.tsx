import clsx from "clsx";

import locale from "../locale/en.json";
import { ProductColorProps } from "./types";

export default function ProductColor({
  attributes,
  cartItem,
  colorSelectHandler,
}: ProductColorProps) {
  return (
    <div>
      <div className="flex gap-4 mt-4 items-center">
        <span className="font-semibold">{locale.color}:</span>
        <div className="flex gap-1">
          {(attributes || []).map((attr, index) => {
            const isSelectedItem = attr.color === cartItem.selectedAttributes.color;
            return (
              <div
                key={`${attr.color}-${index}`}
                onClick={() => colorSelectHandler(attr)}
                className={clsx(
                  "h-7 w-7 rounded-full border-indigo-500 flex items-center justify-center",
                  isSelectedItem ? "border-[1.5px]" : "border-none"
                )}
              >
                <div
                  style={{ background: attr.colorCode }}
                  className="h-4 w-4 rounded-full border-[1.2px] border-foreground cursor-pointer"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
