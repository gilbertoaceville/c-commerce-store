import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useCartContext } from "@/providers/cart";
import { formatPrice } from "@/base/utils/functions/formatPrice";

import locale from "../locale/en.json";
import { CheckoutFormProps } from "./types";
import Subject from "@/components/element/subject/subject";
import Button from "@/components/element/button/button";

export default function CheckoutForm({
  clientSecret,
  handlePaymentSuccess,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const { cartTotalPrice, clearCart, handlePaymentIntent } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);

  const price = formatPrice(cartTotalPrice as number);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    if (!clientSecret) {
      return;
    }

    handlePaymentSuccess?.(false);
  }, [stripe]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (!error) {
        toast.success(locale.checkoutSuccess);

        clearCart?.();
        handlePaymentIntent?.(null);
        handlePaymentSuccess?.(true);
      } else {
        toast.error(locale.checkoutError);
        console.log("error", error.message);
      }
    } catch (error) {
      console.error(locale.checkoutErrorCallback, error);
    } finally {
      setIsLoading(false);
    }
  }

  const buttonText = isLoading ? locale.processing : locale.payNow;

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6 flex justify-between items-center">
        <Subject title={locale.checkout} />
        <div className="text-primary">
          Total: <span className="font-bold text-xl">{price}</span>
        </div>
      </div>
      <h2 className="font-semibold mt-4 mb-2">{locale.paymentTitle}</h2>
      <AddressElement
        options={{ mode: "shipping", allowedCountries: ["US", "KE", "NG"] }}
        id="address-element"
      />
      <h2 className="font-semibold mt-4 mb-2">{locale.paymentTitle}</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="mt-4">
        <Button
          type="submit"
          label={buttonText}
          disabled={isLoading || !stripe || !elements}
        />
      </div>
    </form>
  );
}
