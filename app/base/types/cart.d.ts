import { ProductsEntity, ImagesEntity } from "./product.d";

export interface Cart
  extends Omit<ProductsEntity, "inStock" | "images" | "reviews"> {
  selectedImage: ImagesEntity;
}
