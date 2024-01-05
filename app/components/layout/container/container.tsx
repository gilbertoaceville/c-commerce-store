import clsx from "clsx";
import { ContainerProps } from "./types";
import { twMerge } from "tailwind-merge";

export default function Container({ children, className }: ContainerProps) {
  return (
    <article className={clsx("max-w-[1400px] mx-auto xl:px-20 md:px-2 px-4", className)}>
      {children}
    </article>
  );
}
