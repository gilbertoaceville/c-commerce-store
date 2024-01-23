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
  className,
  ...rest
}: InputProps) {
  const isTextArea = type === "textarea";
  const InputComponent = isTextArea ? "textarea" : "input";

  return (
    <div className="w-full relative">
      <InputComponent
        aria-label={label}
        aria-disabled={disabled}
        aria-invalid={errors?.[id] ? "true" : "false"}
        aria-describedby={id}
        aria-errormessage={id}
        aria-required={required}
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        className={clsx(
          className,
          "peer w-full p-4 pt-6 resize-none outline-none bg-secondary text-primary text-sm font-light border-2 rounded-md transition disabled:cursor-not-allowed disabled:opacity-70",
          errors?.[id]
            ? "border-rose-500 focus:border-rose-500"
            : "border-slate-300 focus:border-slate-300",
          isTextArea && "max-h-[150px] min-h-[150px]"
        )}
        {...rest}
      />
      <label
        htmlFor={id}
        className={clsx(
          "absolute cursor-text text-base duration-150 transform opacity-40 -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4",
          errors?.[id] ? "text-rose-500" : "text-primary"
        )}
      >
        {label}
      </label>
    </div>
  );
}
