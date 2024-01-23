"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, useForm } from "react-hook-form";

export default function SearchBar() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      searchString: "",
    },
  });

  async function onSubmit(data: FieldValues) {
    if (!data.searchString) return router.push("/");

    const url = queryString.stringifyUrl({
      url: "/",
      query: { searchItem: data.searchString },
    });
    
    router.push(url)
    reset();
  }

  return (
    <div className="flex items-center">
      <input
        {...register("searchString")}
        type="text"
        placeholder="Search store"
        autoComplete="off"
        className="p-2 border-gray-500 text-secondary rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-700 w-80"
      />
      <button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        className="p-2 bg-secondary text-primary hover:opacity-80 rounded-r-md"
      >
        Search
      </button>
    </div>
  );
}
