import { CartEntity } from "@/base/types/cart";
import { AttributesEntity } from "@/base/types/product";

export interface ProductColorProps {
  attributes: AttributesEntity[];
  cartItem: CartEntity;
  colorSelectHandler: (value: AttributesEntity) => void;
}
