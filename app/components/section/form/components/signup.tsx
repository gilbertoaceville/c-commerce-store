"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";

import Subject from "@/components/element/subject/subject";
import Input from "@/components/element/input/input";
import Button from "@/components/element/button/button";

import locale from "../locale/en.json";
import Link from "next/link";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = function (data) {
    console.log(data);
    setIsLoading(true);
  };

  const buttonText = isLoading ? locale.loading : locale.register;

  return (
    <>
      <Subject title={locale.signup} />
      <div className="flex justify-end w-full">
        <Button
          custom="md:w-[50%] w-full"
          outline
          label={locale.startWithGoogle}
          icon={AiOutlineGoogle}
        />
      </div>
      <hr className="w-full h-px border-alpha" />
      <Input
        id="name"
        label="Name"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />
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
      <div className="flex justify-start w-full">
        <Button
          custom="md:w-[50%] w-full"
          label={buttonText}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
      <p className="text-sm">
        {locale.existingAccount}{" "}
        <Link className="underline" href="/signin">
          {locale.signin}
        </Link>
      </p>
    </>
  );
}
