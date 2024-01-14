"use client";

import { useCartContext } from "@/providers/cart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutSection() {
  const router = useRouter();

  const { cartProducts, paymentIntent, handlePaymentIntent } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

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
          toast.error("Something went wrong");
        });
    }
  }, []);
  return <div>CheckoutSection</div>;
}
