import React, { createContext, useContext, useState } from "react";

interface CartContextProps {
  cartTotalQty?: number;
}

interface Props {
  [propname: string]: any;
}

export const CartContext = createContext<CartContextProps | null>(null);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartTotalQty, setCartTotalQty] = useState(1);

  const cartObj: CartContextProps = {
    cartTotalQty,
  };

  return (
    <CartContext.Provider value={cartObj}>{children}</CartContext.Provider>
  );
}

export function useCartContext() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return cartContext;
}
