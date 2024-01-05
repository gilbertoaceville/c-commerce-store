import { CartEntity } from "@/base/types/cart";
import { ProductsEntity, AttributesEntity } from "@/base/types/product";

export interface ProductImagesProps {
  cartItem: CartEntity;
  product: ProductsEntity;
  attrSelectHandler: (attribute: AttributesEntity) => void;
}
