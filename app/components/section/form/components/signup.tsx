"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

import Subject from "@/components/element/subject/subject";
import Input from "@/components/element/input/input";
import Button from "@/components/element/button/button";

import locale from "../locale/en.json";
import { AuthFormProps } from "./types";

export default function SignupForm({ currentUser }: AuthFormProps) {
  const router = useRouter();
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/signup", data)
      .then(() => {
        toast.success("Account is created successfully", {
          id: "create-account",
        });

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
          callbackUrl: "/cart",
        })
          .then((callback) => {
            if (callback?.ok) {
              router.push("/cart");
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
          });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to create account", { id: "create-account" });
      })
      .finally(() => setIsLoading(false));
  };

  const buttonText = isLoading ? locale.loading : locale.register;

  if (currentUser) {
    return redirect("/");
  }

  return (
    <>
      <Subject title={locale.signup} />
      <div className="flex justify-end w-full">
        <Button
          custom="md:w-[50%] w-full"
          outline
          label={locale.startWithGoogle}
          icon={AiOutlineGoogle}
          onClick={() => signIn("google")}
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
