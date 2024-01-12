import Link from "next/link";

import { CartEntity } from "@/base/types/cart";
import { formatPrice } from "@/base/utils/functions/formatPrice";
import { getTruncatedString } from "@/base/utils/functions/truncateString";
import locale from "@/components/section/cart/locale/en.json";
import Image from "next/image";
import ProductQty from "@/components/element/product/quantity/quantity";
import { useCartContext } from "@/providers/cart";

export default function CartItem({ item }: { item: CartEntity }) {
  const { removeProductFromCart } = useCartContext();
  const total = formatPrice(item.price * Number(item.quantity));
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-800 py-4 items-center">
      <div className="flex col-span-2 justify-self-start gap-2 md:gap-4">
        <Link href={`/product/${item?.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedAttributes.image}
              alt={item.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
        {item?.name && (
          <div className="flex flex-col justify-between">
            <Link href={`/product/${item?.id}`}>
              {getTruncatedString(item.name)}
            </Link>
            {item?.selectedAttributes?.color && (
              <div>{item.selectedAttributes.color}</div>
            )}
            {item.id && (
              <div className="w-[70px]">
                <button
                  className="text-foreground underline"
                  onClick={() => removeProductFromCart?.(item)}
                >
                  {locale.remove}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {item?.price && (
        <div className="justify-self-center">{formatPrice(item.price)}</div>
      )}
      <div className="justify-self-center">
        <ProductQty qtyCounterType="cart" cartItem={item} />
      </div>
      <div className="justify-self-end font-semibold">{total}</div>
    </div>
  );
}
