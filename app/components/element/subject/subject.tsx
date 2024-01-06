import { SubjectProps } from "./types";

export default function Subject({ title, center }: SubjectProps) {
  return (
    <div className={center ? "center" : "text-start"}>
      <h1 className="font-bold text-2xl text-primary">{title}</h1>
    </div>
  );
}
