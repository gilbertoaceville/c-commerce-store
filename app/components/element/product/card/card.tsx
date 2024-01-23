import Image from "next/image";
import Link from "next/link";
import { getTruncatedString } from "@/base/utils/functions/truncateString";
import { formatPrice } from "@/base/utils/functions/formatPrice";
import { Rating } from "@mui/material";

import { getProductRating } from "./helper/getProductRating";
import { ProductCardProps } from "./types";

export default function ProductCard({ data }: ProductCardProps) {
  const productName = getTruncatedString(data.name);
  const { productRating, reviewLength, reviewTextEnd } = getProductRating(data?.reviews || []);

  return (
    <Link
      href={`/product/${data.id}`}
      className="col-span-1 cursor-pointer border-[1.2px] border-tertiary bg-tertiary rounded-sm p-2 transition text-center text-small block"
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full mt-4">
          <Image
            fill
            src={data?.attributes?.[0]?.image || ""}
            alt={productName}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4">{productName}</div>
        <div>
          <Rating value={productRating} readOnly className="rating" />
        </div>
        <div>
          {reviewLength} review{reviewTextEnd}
        </div>
        <div className="font-semibold text-indigo-400">
          {formatPrice(data.price)}
        </div>
      </div>
    </Link>
  );
}
