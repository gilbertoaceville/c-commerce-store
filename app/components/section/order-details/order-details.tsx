import { Order } from "@prisma/client";
import Subject from "@/components/element/subject/subject";

import locale from "./locale/en.json";
import { formatPrice } from "@/base/utils/functions/formatPrice";
import {
  getDeliveryStatus,
  getPaymentStatus,
} from "@/components/section/admin/dashboard/helper/getStatus";
import moment from "moment";
import OrderProduct from "./components/order-product";

export default function OrderDetails({ order }: { order: Order }) {
  console.dir(order, { depth: null });
  const paymentStatus = getPaymentStatus(
    order.status,
    "bg-slate-200 text-slate-700"
  );
  const deliveryStatus = getDeliveryStatus(
    order.deliveryStatus,
    "bg-slate-200 text-slate-700"
  );
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Subject title={locale.orderDetailTitle} />
      </div>
      <div>
        {locale.orderId}: {order.id}
      </div>
      <div className="mt-2">
        {locale.totalAmount}:{" "}
        <span className="font-bold">
          {formatPrice(Number(order.amount) / 100, "symbol")}
        </span>
      </div>
      <div className="flex gap-2 items-center mt-2">
        <div>{locale.paymentStatus}:</div>
        <div className="capitalize">{paymentStatus}</div>
      </div>
      <div className="flex gap-2 items-center mt-2">
        <div>{locale.deliveryStatus}:</div>
        <div className="capitalize">{deliveryStatus}</div>
      </div>
      <div className="mt-2">
        {locale.date}: {moment(order.createdDate).fromNow()}
      </div>

      <div>
        <h2 className="font-semibold mt-10 mb-6">{locale.productOrdered}</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center uppercase">
          <div className="col-span-2 justify-self-start">{locale.product}</div>
          <div className="justify-self-center">{locale.price}</div>
          <div className="justify-self-center">{locale.qty}</div>
          <div className="justify-self-end">{locale.total}</div>
        </div>
        {(order.products || []).map((product, index) => (
          <OrderProduct key={`${product.name}-${index}`} product={product} />
        ))}
      </div>
    </div>
  );
}
