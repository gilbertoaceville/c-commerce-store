import { CartEntity } from "@/base/types/cart";
import { cacheKey } from "@/base/utils/constants/const";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface CartContextProps {
  cartTotalQty?: number;
  cartProducts: CartEntity[];
  addProductToCart: (product: CartEntity) => void;
  removeProductFromCart?: (product: CartEntity) => void;
  increaseQtyInCart?: (product: CartEntity) => void;
  decreaseQtyInCart?: (product: CartEntity) => void;
}

// interface Props {
//   [propname: string]: any;
// }

export const CartContext = createContext<CartContextProps | null>(null);

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartProducts, setCartProducts] = useState<CartEntity[]>([]);
  const [cartTotalQty, setCartTotalQty] = useState(1);

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

      // if(cartProducts) {
      //   const updatedItemIndex = cartProducts.findIndex((item) => item.id === product.id);

      //   if(updatedItemIndex !== -1) {
      //     const updatedCart = [...cartProducts]
      //     updatedCart[updatedItemIndex].quantity = ++updatedCart?.[updatedItemIndex]?.quantity;
      // localStorage.setItem(cacheKey, JSON.stringify(updatedCart));
      //     setCartProducts(updatedCart);
      //   }
      // }
    },
    [cartProducts]
  );

  useEffect(() => {
    const cartItems = localStorage.getItem(cacheKey);
    if (cartItems) {
      setCartProducts(JSON.parse(cartItems));
    }
  }, []);

  const cartObj: CartContextProps = {
    cartTotalQty,
    cartProducts,
    addProductToCart,
    removeProductFromCart,
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
