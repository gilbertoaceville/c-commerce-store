"use client";

import { useCartContext } from "@/providers/cart";
import Link from "next/link";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";

export default function CartCount() {
  const { cartTotalQty } = useCartContext();

  return (
    <Link href="/cart" className="relative cursor-pointer">
      <div className="text-3xl">
        <CiShoppingCart size={35} />
      </div>
      <span className="absolute top-[-10px] right-[-10px] bg-primary text-tertiary h-6 w-6 rounded-full flex items-center justify-center text-sm">
        {cartTotalQty}
      </span>
    </Link>
  );
}
