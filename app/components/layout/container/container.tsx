import { ContainerProps } from "./types";

export default function Container({ children }: ContainerProps) {
  return (
    <article className="max-w-[1400px] mx-auto xl:px-20 md:px-2 px-4">
      {children}
    </article>
  );
}
