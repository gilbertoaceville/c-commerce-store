"use client";

import { DataGrid } from "@mui/x-data-grid";
import { MdRemoveRedEye } from "react-icons/md";
import Link from "next/link";
import moment from "moment";

import { formatPrice } from "@/base/utils/functions/formatPrice";
import Subject from "@/components/element/subject/subject";
import Cta from "@/components/section/admin/dashboard/components/cta";
import { OrderType } from "@/components/section/admin/dashboard/types";
import { getOrderColumns } from "@/components/section/admin/dashboard/helper/getColumns";

export function OrdersSection({ orders }: { orders?: OrderType[] }) {
  // consider useMemo
  let rows: any[] = [];

  if (orders) {
    rows = orders?.map((order: OrderType) => ({
      id: order.id,
      client: order.user.name,
      amount: formatPrice(order.amount / 100, "symbol"), //dividing by 100 since we multiplied by 100 when creating payment intent (see=> /api/create-payment-intent)
      paymentStatus: order.status,
      date: moment(order.createdDate).fromNow(),
      deliveryStatus: order.deliveryStatus,
    }));
  }

  // use useMemo()
  const columns = getOrderColumns({
    field: "action",
    headerName: "Event",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="flex justify-between gap-4 w-full">
          <Link href={`/order/${params.row?.id}`}>
            <Cta title="See order" icon={MdRemoveRedEye} onClick={() => {}} />
          </Link>
        </div>
      );
    },
  });

  return (
    <div className="max-w-[1150px] mx-auto text-xl">
      <div className="mb-6 mt-8">
        <Subject title={"Your Orders"} center />
      </div>
      <div style={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            borderColor: "white",
            border: "none",
            "& .MuiCheckbox-root svg": {
              border: `1px solid #d9d9d9`,
            },
            "& .MuiSvgIcon-root": {
              fill: "white",
            },
            "& *": {
              color: "white",
            },
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}
