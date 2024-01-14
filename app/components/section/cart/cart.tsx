"use client";

import { useCartContext } from "@/providers/cart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

import Subject from "@/components/element/subject/subject";
import Button from "@/components/element/button/button";

import CartItem from "./component/cart-item/cart-item";
import locale from "./locale/en.json";
import { formatPrice } from "@/base/utils/functions/formatPrice";
import { CurrentUserProps } from "@/base/types/user";

export default function CartSection({ currentUser }: CurrentUserProps) {
  const { cartProducts, clearCart, cartTotalPrice } = useCartContext();

  if (!cartProducts || cartProducts?.length === 0) {
    return (
      <div className="flex flex-col items-center text-foreground">
        <p className="text-2xl">{locale.emptyCartText}</p>
        <Link href="/" className="flex items-center gap-1 mt-2">
          <MdArrowBack />
          <span>{locale.startText}</span>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <Subject title={locale.cartTitle} center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="uppercase col-span-2 justify-self-start">
          {locale.product}
        </div>
        <div className="uppercase justify-self-center">{locale.price}</div>
        <div className="uppercase justify-self-center">{locale.qty}</div>
        <div className="uppercase justify-self-end">{locale.total}</div>
      </div>
      <div>
        {cartProducts?.map((product, i) => (
          <CartItem key={`${product.name}-${i}`} item={product} />
        ))}
      </div>
      <div className="border-t-[1.5px] border-slate-800 py-4 flex justify-between gap-4">
        <div className="w-[90px]">
          <Button label={locale.clear} small outline onClick={clearCart} />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>{locale.subtotal}</span>
            <span>{formatPrice(cartTotalPrice ?? 0)}</span>
          </div>
          <p className="text-foreground">{locale.cartShipping}</p>
          <Link href="/checkout" className="w-full">
            <Button label={locale.checkout} outline={!currentUser} />
          </Link>
          <Link href="/" className="flex items-center gap-1 mt-2">
            <MdArrowBack />
            <span>{locale.continueText}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
