"use client";

import { useCallback, useState } from "react";

import { Rating } from "@mui/material";
import { getProductRating } from "@/components/element/product/card/helper/getProductRating";
import { CartEntity } from "@/base/types/cart";
import ProductColor from "@/components/element/product/color/color";
import { AttributesEntity } from "@/base/types/product";
import ProductQty from "@/components/element/product/quantity/quantity";

import { ProductDetailProps } from "./types";
import locale from "./locale/en.json";

export const defaultCart: CartEntity = {
  id: "",
  name: "",
  description: "",
  price: 0,
  brand: "",
  quantity: 0,
  category: "",
  selectedAttributes: {
    color: "",
    colorCode: "",
    image: "",
  },
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const [cartItem, setCartItem] = useState<CartEntity>({
    ...product,
    quantity: 1,
    selectedAttributes: {
      ...(product?.attributes?.[0] || { color: "", colorCode: "", image: "" }),
    },
  });

  const { productRating, reviewLength, reviewTextEnd } = getProductRating(
    product?.reviews || []
  );

  const productStock = product.inStock ? "In stock" : "Out of stock";

  const handleSelectColor = useCallback((attribute: AttributesEntity) => {
    setCartItem((prevState) => ({
      ...prevState,
      selectedAttributes: attribute,
    }));
  }, []);

  const handleQtyIncrease = useCallback(() => {
    if (cartItem.quantity === 80) return;

    setCartItem((prevState) => ({
      ...prevState,
      quantity: Math.max(Number(prevState?.quantity) + 1, 1),
    }));
  }, [cartItem.quantity]);

  const handleQtyDecrease = useCallback(() => {
    if (cartItem.quantity === 1) return;

    setCartItem((prevState) => ({
      ...prevState,
      quantity: Number(prevState?.quantity) - 1,
    }));
  }, [cartItem.quantity]);

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
            <span className="font-semibold">{locale.category}:</span>{" "}
            {product.category}
          </div>
          <div>
            <span className="font-semibold">{locale.brand}:</span>{" "}
            {product.brand}
          </div>
          <div data-in-stock={String(product?.inStock)} className="stock">
            {productStock}
          </div>
        </div>

        <ProductColor
          cartItem={cartItem}
          attributes={product.attributes as AttributesEntity[]}
          colorSelectHandler={handleSelectColor}
        />
        <ProductQty
          cartItem={cartItem}
          qtyCounterType="product"
          handleQtyIncrease={handleQtyIncrease}
          handleQtyDecrease={handleQtyDecrease}
        />
        <div>Add to cart</div>
      </div>
    </div>
  );
}
