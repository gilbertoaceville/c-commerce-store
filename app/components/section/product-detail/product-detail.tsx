"use client";

import { getProductRating } from "@/components/element/product-card/helper/getProductRating";
import { ProductDetailProps } from "./types";

import { Rating } from "@mui/material";
import { Cart } from "@/base/types/cart";
import { useState } from "react";

export const defaultCart: Cart = {
  id: "",
  name: "",
  description: "",
  price: 0,
  brand: "",
  quantity: 0,
  category: "",
  selectedImage: {
    color: "",
    colorCode: "",
    image: "",
  },
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const [cart, setCart] = useState<Cart>({
    ...product,
    quantity: 1,
    selectedImage: {
      ...(product?.images?.[0] || { color: "", colorCode: "", image: "" }),
    },
  });

  const { productRating, reviewLength, reviewTextEnd } = getProductRating(
    product?.reviews || []
  );

  const productStock = product.inStock ? "In stock" : "Out of stock";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>images</div>
      <div className="flex flex-col gap-1 text-sm text-foreground">
        <h2 className="text-3xl font-medium text-primary">{product.name}</h2>
        <div className="flex items-center gap-2 my-4 separator">
          <Rating value={productRating} readOnly />
          <div>
            {reviewLength} review{reviewTextEnd}
          </div>
        </div>
        <div className="text-justify separator flex flex-col gap-4">
          {product.description}
        </div>
        <div className="mt-4 separator flex flex-col gap-4">
          <div>
            <span className="font-semibold">CATEGORY:</span> {product.category}
          </div>
          <div>
            <span className="font-semibold">BRAND:</span> {product.brand}
          </div>
          <div data-in-stock={String(product?.inStock)} className="stock">
            {productStock}
          </div>
        </div>

        <div>color</div>
        <div>quantity</div>
        <div>Add to cart</div>
      </div>
    </div>
  );
}
