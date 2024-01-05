import { ProductsEntity } from "@/base/types/product";

type ProductDetailTypes = ProductsEntity & {
    createdAt?: string;
}

export interface ProductDetailProps {
    product: ProductDetailTypes;
}