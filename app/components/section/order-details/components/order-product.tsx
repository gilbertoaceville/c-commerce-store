import Image from "next/image";
import { CartProducts } from "@prisma/client";
import { getTruncatedString } from "@/base/utils/functions/truncateString";
import { formatPrice } from "@/base/utils/functions/formatPrice";

export default function OrderProduct({ product }: { product: CartProducts }) {
  const total = Number(product.price) * Number(product.quantity);
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-foreground py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div className="relative w-[70px] aspect-square">
          <Image
            src={product.selectedAttributes[0].image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>{getTruncatedString(product.name)}</div>
          <div>{product.selectedAttributes[0].color}</div>
        </div>
      </div>
      <div className="justify-self-center">
        {formatPrice(Number(product.price), "symbol")}
      </div>
      <div className="justify-self-center">{product.quantity}</div>
      <div className="justify-self-end font-semibold">
        {formatPrice(total.toFixed(2), "symbol")}
      </div>
    </div>
  );
}
