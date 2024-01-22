import React, { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

import { CategoryItemProps } from "../types";
import queryString from "query-string";

export default function CategoryItem({
  label,
  selected,
  icon: Icon,
}: CategoryItemProps) {
  const router = useRouter();
  const params = useSearchParams();

  /**
   * check for existing params(queryString.parse(params.toString())) // e.g returns {foo: "str"} for ?foo="str",
   * (if any) and update the query accordingly (add to object containing spread existing (...currentQuery))
   * (if the category is "All" then remove the category param from the query)
   */
  const handleClick = useCallback(() => {
    if (label === "All") {
      router.push(`/`);
    } else {
      let currentQuery = {};

      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      const updatedQuery = {
        ...currentQuery,
        category: label,
      };

      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      router.push(url);
    }
  }, [label, params, router]);
  return (
    <div
      className={clsx(
        "flex items-center justify-center gap-1 p-2 border-b-2 hover:text-foreground hover:text-slate-500 transition cursor-pointer",
        selected
          ? "border-slate-500 text-foreground text-slate-500"
          : "border-transparent text-primary"
      )}
      onClick={handleClick}
    >
      <Icon size={20} />
      <div className="font-medium text-sm text-center">{label}</div>
    </div>
  );
}
