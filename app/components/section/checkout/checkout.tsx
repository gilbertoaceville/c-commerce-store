"use client";

import { useCartContext } from "@/providers/cart";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CheckoutForm from "@/components/section/form/components/checkout";

import locale from "./locale/en.json";
import Button from "@/components/element/button/button";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
export default function CheckoutSection() {
  const router = useRouter();

  const { cartProducts, paymentIntent, handlePaymentIntent } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  function handlePaymentSuccess(value: boolean) {
    setPaymentSuccess(value);
  }

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  useEffect(() => {
    if (cartProducts && cartProducts.length > 0) {
      setIsLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setIsLoading(false);

          if (res.status === 401) {
            router.push("/signin");
            return;
          }

          return res.json();
        })
        .then((data) => {
          setClientSecret(data?.paymentIntent?.client_secret);
          handlePaymentIntent?.(data?.paymentIntent?.id);
        })
        .catch((error) => {
          setError(true);
          console.log(error);
          toast.error(locale.stripeErrorPromise);
        });
    }
  }, [cartProducts, paymentIntent]);

  return (
    <div className="w-full">
      {clientSecret && cartProducts.length > 0 && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm {...{ clientSecret, handlePaymentSuccess }} />
        </Elements>
      )}
      {isLoading && <div className="text-center">{locale.loading}</div>}
      {error && (
        <div className="text-center text-red-500">{locale.stripeError}</div>
      )}
      {paymentSuccess && (
        <div className="flex items-center flex-col gap-4">
          <div className="text-center text-green-500">
            {locale.paymentSuccess}
          </div>
          <Link href="/orders" className="block max-w-[220px] w-full">
            <Button label={locale.viewOrders} />
          </Link>
        </div>
      )}
    </div>
  );
}
