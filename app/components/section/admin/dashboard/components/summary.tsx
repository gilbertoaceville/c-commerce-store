"use client";

import { SummaryDataType, SummaryProps } from "../types";
import { memo, useEffect, useState } from "react";
import Subject from "@/components/element/subject/subject";

import locale from "../locale/en.json";
import { formatPrice } from "@/base/utils/functions/formatPrice";
import { formatNumber } from "@/base/utils/functions/formatNumber";

const defaultSummary = {
  sale: {
    label: "Total Sales",
    digit: 0,
  },
  products: {
    label: "Total Products",
    digit: 0,
  },
  orders: {
    label: "Total Orders",
    digit: 0,
  },
  paidOrders: {
    label: "Paid Orders",
    digit: 0,
  },
  unpaidOrders: {
    label: "Unpaid Orders",
    digit: 0,
  },
  users: {
    label: "Total Users",
    digit: 0,
  },
};

function Summary({ orders, products, users }: SummaryProps) {
  const [summaryData, setSummaryData] =
    useState<SummaryDataType>(defaultSummary);

  const summaryKeys = Object.keys(summaryData) as Array<keyof SummaryDataType>;

  useEffect(() => {
    setSummaryData((prev) => {
      let data = { ...prev };

      const totalSales = orders?.reduce((acc, order) => {
        if (order.status === "complete") {
          return acc + order.amount;
        } else {
          return 0;
        }
      }, 0);

      const paidOrders = orders?.filter((order) => order.status === "complete");
      const unpaidOrders = orders?.filter(
        (order) => order.status !== "complete"
      );

      data.sale.digit = Number(totalSales) / 100; //dividing by 100 since we multiplied by 100 when creating payment intent (see=> /api/create-payment-intent)
      data.paidOrders.digit = Number(paidOrders?.length);
      data.unpaidOrders.digit = Number(unpaidOrders?.length);
      data.orders.digit = Number(orders?.length);
      data.users.digit = Number(users?.length);
      data.products.digit = Number(products?.length);

      return data;
    });
  }, [products, orders, users]);

  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
        <Subject title={locale.summaryTitle} />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {summaryKeys &&
          summaryKeys.map((key) => (
            <div
              key={key}
              className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
            >
              <div className="text-xl md:text-4xl font-bold">
                {summaryData[key].label === "Total Sales"
                  ? formatPrice(summaryData[key].digit, "symbol")
                  : formatNumber(summaryData[key].digit)}
              </div>
              <div>{summaryData[key].label}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default memo(Summary);
