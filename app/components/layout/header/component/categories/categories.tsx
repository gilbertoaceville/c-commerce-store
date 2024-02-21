"use client";

import { productCategories } from "@/base/utils/constants/const";
import CategoryItem from "./component/category-item";
import { usePathname, useSearchParams } from "next/navigation";

export default function HeaderCategories() {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  //Only show categories on home page
  if(pathname !== "/") return null;

  return (
    <div className="bg-secondary w-[200px] rounded-md py-4 pl-4 ml-2 fixed top-1/2 -translate-y-1/2 z-10 flex justify-center">
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
  );
}
