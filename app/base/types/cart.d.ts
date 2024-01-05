import { ProductsEntity, AttributesEntity } from "./product.d";

export interface CartEntity
  extends Omit<ProductsEntity, "inStock" | "attributes" | "reviews"> {
  selectedAttributes: AttributesEntity;
}
