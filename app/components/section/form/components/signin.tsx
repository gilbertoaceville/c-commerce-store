"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

import Subject from "@/components/element/subject/subject";
import Input from "@/components/element/input/input";
import Button from "@/components/element/button/button";

import locale from "../locale/en.json";
import { AuthFormProps } from "./types";

export default function SigninForm({ currentUser }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/",
    })
      .then((callback) => {
        if (callback?.ok) {
          router.push("/");
          router.refresh();
          toast.success("Login successfully", {
            id: "login",
          });
        }

        if (callback?.error) {
          toast.error(callback.error, {
            id: "login",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to login", { id: "login" });
        return;
      })
      .finally(() => setIsLoading(false));
  };

  const buttonText = isLoading ? locale.loading : locale.login;

  if (currentUser) {
    return redirect("/");
  }

  return (
    <>
      <Subject title={locale.signin} />
      <Button
        outline
        label={locale.continueWithGoogle}
        icon={AiOutlineGoogle}
        onClick={() => signIn("google")}
      />
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
