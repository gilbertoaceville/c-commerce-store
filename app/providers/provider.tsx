"use client";

import CartProvider from "@/providers/cart";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
