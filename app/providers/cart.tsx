import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { CartEntity } from "@/base/types/cart";
import { cacheKey, cachePaymentIntent } from "@/base/utils/constants/const";

interface CartContextProps {
  cartTotalQty?: number;
  cartTotalPrice?: number;
  cartProducts: CartEntity[];
  paymentIntent: string | null;
  addProductToCart: (product: CartEntity) => void;
  removeProductFromCart?: (product: CartEntity) => void;
  increaseQtyInCart?: (product: CartEntity) => void;
  decreaseQtyInCart?: (product: CartEntity) => void;
  clearCart?: () => void;
  handlePaymentIntent?: (paymentIntent: string | null) => void;
}

export const CartContext = createContext<CartContextProps | null>(null);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartProducts, setCartProducts] = useState<CartEntity[]>([]);
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  const addProductToCart = useCallback((product: CartEntity) => {
    setCartProducts((prevProduct) => {
      const updatedCart = prevProduct ? [...prevProduct, product] : [product];

      toast.success("Product added to cart successfully", {
        id: "add-product",
      });
      localStorage.setItem(cacheKey, JSON.stringify(updatedCart));

      return updatedCart;
    });
  }, []);

  const removeProductFromCart = useCallback((product: CartEntity) => {
    setCartProducts((prevProduct) => {
      const updatedCart = prevProduct?.filter((item) => item.id !== product.id);

      localStorage.setItem(cacheKey, JSON.stringify(updatedCart));
      toast.success("Product added to cart successfully", {
        id: "remove-product",
      });

      return updatedCart;
    });
  }, []);

  const increaseQtyInCart = useCallback(
    (product: CartEntity) => {
      if (product.quantity === product.stock) {
        toast.error("Product stock is full", {
          id: "stock-full",
        });
        return;
      }

      if (cartProducts) {
        setCartProducts((prevProduct) => {
          const updatedCart = prevProduct?.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity ?? 0) + 1 }
              : item
          );

          localStorage.setItem(cacheKey, JSON.stringify(updatedCart));

          return updatedCart;
        });
      }
    },
    [cartProducts]
  );

  const decreaseQtyInCart = useCallback(
    (product: CartEntity) => {
      if (product.quantity === 1) {
        toast.error("Product quantity cannot be less than 1", {
          id: "quantity-error",
        });
        return;
      }

      if (cartProducts) {
        setCartProducts((prevProduct) => {
          const updatedCart = prevProduct?.map((item) =>
            item.id === product.id
              ? { ...item, quantity: Math.max((item.quantity ?? 0) - 1, 1) }
              : item
          );

          localStorage.setItem(cacheKey, JSON.stringify(updatedCart));

          return updatedCart;
        });
      }
    },
    [cartProducts]
  );

  const clearCart = useCallback(() => {
    setCartProducts([]);
    localStorage.removeItem(cacheKey);
    toast.success("Cart cleared successfully", {
      id: "clear-cart",
    });
    return;
  }, []);

  const { totalPrice, totalQty } = useMemo(() => {
    return cartProducts?.reduce(
      (acc, product) => {
        const subtotal = product.price * (product.quantity ?? 0);

        acc.totalPrice += subtotal;
        acc.totalQty += product.quantity ?? 0;
        return acc;
      },
      {
        totalPrice: 0,
        totalQty: 0,
      }
    );
  }, [cartProducts]) ?? { totalPrice: 0, totalQty: 0 };

  const handlePaymentIntent = useCallback((value: string | null) => {
    setPaymentIntent(value);
    localStorage.setItem(cachePaymentIntent, JSON.stringify(value));
  }, []);

  useEffect(() => {
    const cartItems = localStorage.getItem(cacheKey);
    if (cartItems) {
      setCartProducts(JSON.parse(cartItems));
    }

    // get paymentIntent from localStorage
    const stringifiedPaymentIntent: any = localStorage.getItem(cachePaymentIntent);
    const parsedPaymentIntent: string | null = JSON.parse(stringifiedPaymentIntent);

    setPaymentIntent(parsedPaymentIntent);
  }, []);

  const cartObj: CartContextProps = {
    cartTotalQty: totalQty,
    cartTotalPrice: totalPrice,
    cartProducts,
    paymentIntent,
    addProductToCart,
    removeProductFromCart,
    increaseQtyInCart,
    decreaseQtyInCart,
    clearCart,
    handlePaymentIntent,
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
