"use client";

import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import clsx from "clsx";

import useToggle from "@/base/hooks/useToggle";
import { productCategories } from "@/base/utils/constants/const";
import CategoryItem from "./component/category-item";
import { usePathname, useSearchParams } from "next/navigation";

export default function HeaderCategories() {
  const params = useSearchParams();
  const pathname = usePathname();
  const { isOn, toggle } = useToggle("on");

  const category = params?.get("category");

  //Only show categories on home page
  if (pathname !== "/") return null;

  return (
    <section
      className={clsx(
        "fixed w-[200px] top-1/2 -translate-y-1/2 z-10 flex flex-col justify-center"
      )}
    >
      <div
        className={clsx(
          "bg-secondary rounded-md py-4 pl-4 transition-all",
          isOn ? "transform -translate-x-full" : "ml-2"
        )}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Categories</h3>
        </div>
        <div className="py-4 flex flex-col items-start gap-y-4 justify-between overflow-x-auto">
          {productCategories.map((cat, index) => {
            const isAll = category === null && cat.label === "All";
            const isSelected = category === cat.label || isAll;
            return (
              <CategoryItem
                key={`${cat.label}-${index}`}
                {...cat}
                selected={isSelected}
              />
            );
          })}
        </div>
      </div>

      <button
        title="Toggle categories"
        aria-label="Toggle categories"
        onClick={toggle}
        className="rounded py-2 w-[50px] xl:w-[80px] flex justify-center mt-4 outline-none border-none transition-all animate-icon-animation shadow-sm"
      >
        {isOn ? (
          <MdKeyboardDoubleArrowRight
            size={35}
            className="animate-move-right"
          />
        ) : (
          <MdKeyboardDoubleArrowLeft size={35} className="animate-move-left" />
        )}
      </button>
    </section>
  );
}
