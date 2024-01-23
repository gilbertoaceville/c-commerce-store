"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

import Subject from "@/components/element/subject/subject";

import locale from "./locale/en.json";
import { AddRatingProps } from "./types";
import { Rating } from "@mui/material";
import Input from "@/components/element/input/input";
import Button from "@/components/element/button/button";
import toast from "react-hot-toast";
import axios from "axios";
import { Review } from "@prisma/client";

export default function AddRating({ product, currentUser }: AddRatingProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  console.log({ currentUser });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  function setCustomValue(id: string, value: any) {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  async function onSubmit(data: FieldValues) {
    setIsLoading(true);
    if (data.rating === 0) {
        setIsLoading(false);
        return toast.error(locale.noRatingError)
    };

    try {
      const response = await axios.post("/api/rating", {
        ...data,
        userId: currentUser?.id,
        productId: product.id,
      });
      if (response.status >= 200 && response.status < 300) {
        toast.success(locale.ratingCreatedText, { id: "rate-product" });
        router.refresh();
        reset();
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(locale.ratingCreatedError, error);
      toast.error(locale.ratingCreatedError, { id: "rate-product" });
    } finally {
      setIsLoading(false);
    }
  }

  const buttonText = isLoading ? locale.loading : locale.addRating;

  if (!currentUser || !product) return null;

  // users can only post a review/rating if orders are delivered
  // find the particular product that is to be reviewed and check order status
  const isOrderDelivered = currentUser.orders?.some(
    (order) =>
      order.products.some((prod) => prod.id === product.id) &&
      order.deliveryStatus === "delivered"
  );

  //user can only review/rate a product once
  const isReviewed = product.reviews.some(
    (review: Review) => review.userId === currentUser.id
  );

  if (isReviewed || !isOrderDelivered) return null;

  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Subject title={locale.ratingTitle} />
      <Rating
        onChange={(e, value) => {
          setCustomValue("rating", value);
        }}
        className="rating"
      />
      <Input
        id="comment"
        label="Comment"
        required
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Button
        label={buttonText}
        type="submit"
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
}
