import Image from "next/image";
import { ProductImagesProps } from "./types";
import clsx from "clsx";

export default function ProductImages({
  cartItem,
  product,
  attrSelectHandler,
}: ProductImagesProps) {
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[400px] sm:min-h-[600px]">
      <div className="flex flex-col items-center justify-center gap-6 cursor-pointer h-full max-h-[500px] min-h-[400px] sm:min-h-[600px]">
        {product.attributes?.map((attr, i) => {
          const isSelectedItem =
            attr.color === cartItem.selectedAttributes.color;
          return (
            <div
              key={`${attr.color}-${i}`}
              onClick={() => attrSelectHandler(attr)}
              className={clsx(
                "relative w-[80%] aspect-square rounded border-indigo-300",
                isSelectedItem ? "border-[1.5px]" : "border-none"
              )}
            >
              <Image
                src={attr.image}
                alt={attr.colorCode}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          );
        })}
      </div>
      <div className="relative aspect-square col-span-5">
        <Image
          src={cartItem.selectedAttributes.image}
          alt={cartItem.selectedAttributes.colorCode}
          fill
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
        />
      </div>
    </div>
  );
}
