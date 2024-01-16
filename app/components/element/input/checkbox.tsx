import React from "react";
import { CheckboxProps } from "./types";

export default function Checkbox({
  id,
  label,
  disabled,
  register,
  errors,
}: CheckboxProps) {
  return (
    <div className="w-full flex flex-row gap-2 items-center">
      <input
        aria-label={label}
        aria-required="true"
        aria-disabled={disabled}
        aria-invalid={errors?.[id] ? "true" : "false"}
        aria-describedby={id}
        role="checkbox"
        tabIndex={0}
        id={id}
        disabled={disabled}
        {...register(id, { required: true })}
        type="checkbox"
        className="cursor-pointer"
      />
      <label htmlFor={id} className="cursor-pointer font-medium">
        {label}
      </label>
    </div>
  );
}
