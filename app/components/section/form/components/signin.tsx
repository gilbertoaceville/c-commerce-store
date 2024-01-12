"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";

import Subject from "@/components/element/subject/subject";
import Input from "@/components/element/input/input";
import Button from "@/components/element/button/button";

import locale from "../locale/en.json";
import Link from "next/link";

export default function SigninForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = function (data) {
    console.log(data);
    setIsLoading(true);
  };

  const buttonText = isLoading ? locale.loading : locale.login;

  return (
    <>
      <Subject title={locale.signin} />
      <Button outline label={locale.continueWithGoogle} icon={AiOutlineGoogle} />
      <hr className="w-full h-px border-alpha" />
      <Input
        id="email"
        label="Email"
        type="email"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Button label={buttonText} onClick={handleSubmit(onSubmit)} />
      <p className="text-sm">
        {locale.noAccount}{" "}
        <Link className="underline" href="/signup">
          {locale.signup}
        </Link>
      </p>
    </>
  );
}
