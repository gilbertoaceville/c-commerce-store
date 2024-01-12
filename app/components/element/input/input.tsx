import clsx from "clsx";
import { InputProps } from "./types";

export default function Input({
  id,
  label,
  errors,
  required,
  disabled,
  type = "text",
  register,
  ...rest
}: InputProps) {
  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        className={clsx(
          "peer w-full p-4 pt-6 outline-none bg-secondary text-primary text-sm font-light border-2 rounded-md transition disabled:cursor-not-allowed disabled:opacity-70",
          errors?.[id]
            ? "border-rose-500 focus:border-rose-500"
            : "border-slate-300 focus:border-slate-300"
        )}
        {...rest}
      />
      <label
        htmlFor={id}
        className={clsx(
          "absolute cursor-text text-base duration-150 transform opacity-40 translate-y-0 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4",
          errors?.[id] ? "text-rose-500" : "text-primary"
        )}
      >
        {label}
      </label>
    </div>
  );
}
