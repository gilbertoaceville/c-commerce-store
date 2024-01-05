import { ProductQtyProps } from "./types";
import locale from "../locale/en.json";

export default function ProductQty({
  cartItem,
  qtyCounterType,
  handleQtyIncrease,
  handleQtyDecrease,
}: ProductQtyProps) {
  return (
    <div className="flex gap-8 my-4 items-center">
      {qtyCounterType === "product" && (
        <div className="font-semibold">{locale.quantity}:</div>
      )}
      <div className="flex gap-4 items-center text-base">
        <button
          onClick={handleQtyDecrease}
          className="border-[1.2px] border-primary px-2 rounded text-primary"
        >
          -
        </button>
        <div className="">{cartItem.quantity}</div>
        <button
          onClick={handleQtyIncrease}
          className="border-[1.2px] border-primary px-2 rounded text-primary"
        >
          +
        </button>
      </div>
    </div>
  );
}
