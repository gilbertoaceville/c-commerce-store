"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MdCheckCircle } from "react-icons/md";

import { Rating } from "@mui/material";
import { getProductRating } from "@/components/element/product/card/helper/getProductRating";
import { CartEntity } from "@/base/types/cart";
import ProductColor from "@/components/element/product/color/color";
import { AttributesEntity } from "@/base/types/product";
import ProductQty from "@/components/element/product/quantity/quantity";

import { ProductDetailProps } from "./types";
import locale from "./locale/en.json";
import Button from "@/components/element/button/button";
import ProductImages from "@/components/element/product/images/images";
import { useCartContext } from "@/providers/cart";
import Link from "next/link";
import { MAX_CART_PRODUCT } from "@/base/utils/constants/const";

export const defaultCart: CartEntity = {
  id: "",
  name: "",
  description: "",
  price: 0,
  brand: "",
  quantity: 0,
  category: "",
  stock: 1,
  selectedAttributes: {
    color: "",
    colorCode: "",
    image: "",
  },
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addProductToCart, cartProducts } = useCartContext();

  // used to switch between product images and selected color image
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

  const handleSelectAttribute = useCallback((attribute: AttributesEntity) => {
    setCartItem((prevState) => ({
      ...prevState,
      selectedAttributes: attribute,
    }));
  }, []);

  const handleQtyIncrease = useCallback(() => {
    const maxCount = cartItem.stock || MAX_CART_PRODUCT;
    if (cartItem.quantity === maxCount) return;

    setCartItem((prevState) => ({
      ...prevState,
      quantity: Math.max(Number(prevState?.quantity) + 1, 1),
    }));
  }, [cartItem.quantity, cartItem.stock]);

  const handleQtyDecrease = useCallback(() => {
    if (cartItem.quantity === 1) return;

    setCartItem((prevState) => ({
      ...prevState,
      quantity: Number(prevState?.quantity) - 1,
    }));
  }, [cartItem.quantity]);

  const isProductInCart = useMemo(
    () => cartProducts.some((cartProduct) => cartProduct.id === product.id), // or [].findIndex((cartProduct) => cartProduct.id === product.id) > -1
    [cartProducts, product.id]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductImages
        cartItem={cartItem}
        product={product}
        attrSelectHandler={handleSelectAttribute}
      />
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

        <div className={isProductInCart ? "block" : "hidden"}>
          <p className="mb-2 flex items-center gap-1">
            <MdCheckCircle className="text-teal-400" size={20} />
            <span>{locale.addToCartText}</span>
          </p>
          <Link href="/cart" className="max-w-[300px] mt-4 block">
            <Button label={locale.cartLabel} outline />
          </Link>
        </div>

        <div className={isProductInCart ? "hidden" : "block"}>
          <ProductColor
            cartItem={cartItem}
            attributes={product.attributes as AttributesEntity[]}
            colorSelectHandler={handleSelectAttribute}
          />
          <ProductQty
            cartItem={cartItem}
            qtyCounterType="product"
            handleQtyIncrease={handleQtyIncrease}
            handleQtyDecrease={handleQtyDecrease}
          />
          <div className="max-w-[300px] mt-4">
            <Button
              label={locale.button}
              outline
              onClick={() => addProductToCart(cartItem)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
