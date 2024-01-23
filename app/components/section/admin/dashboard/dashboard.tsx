"use client";

import Container from "@/components/layout/container/container";
import { AdminDashboardProps } from "./types";
import withProtector from "@/components/layout/admin/hoc/with-protector";
import dynamic from "next/dynamic";

const Summary = dynamic(() => import("./components/summary"), {
  ssr: false,
});

const BarChart = dynamic(() => import("./components/bar-chart"), {
  ssr: false,
});

function AdminDashboard({
  orders,
  products,
  users,
  data,
}: AdminDashboardProps) {
  return (
    <Container>
      <Summary {...{ products, orders, users }} />
      <div className="mt-10 mx-auto max-w-[1150px]">
        <BarChart data={data} />
      </div>
    </Container>
  );
}

export default withProtector(AdminDashboard);
