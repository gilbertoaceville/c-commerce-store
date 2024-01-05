import { CartEntity } from "@/base/types/cart";

export interface ProductQtyProps {
  qtyCounterType: "product" | "cart";
  cartItem: CartEntity;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}
