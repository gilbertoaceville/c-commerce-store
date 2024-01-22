"use client";

import { productCategories } from "@/base/utils/constants/const";
import Container from "@/components/layout/container/container";
import CategoryItem from "./component/category-item";
import { usePathname, useSearchParams } from "next/navigation";

export default function HeaderCategories() {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  //Only show categories on home page
  if(pathname !== "/") return null;

  return (
    <div className="bg-secondary">
      <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
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
      </Container>
    </div>
  );
}
