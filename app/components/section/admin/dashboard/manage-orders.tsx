"use client";

import { DataGrid } from "@mui/x-data-grid";
import {
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

import withProtector from "@/components/layout/admin/hoc/with-protector";
import { formatPrice } from "@/base/utils/functions/formatPrice";
import Subject from "@/components/element/subject/subject";

import Cta from "./components/cta";
import { ManageOrdersProps, OrderType } from "./types";
import { getOrderColumns } from "./helper/getColumns";
import locale from "./locale/en.json";
import moment from "moment";

function ManageOrdersSection({ orders }: ManageOrdersProps) {
  const router = useRouter();

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

  async function dispatchHandler(id: string) {
    try {
      const response = await axios.put("/api/order", {
        id,
        deliveryStatus: "dispatched",
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success(locale.successOrderDispatchMessage);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error(locale.errorOrderDispatchMessage);
    }
  }

  async function deliveredHandler(id: string) {
    try {
      const response = await axios.put("/api/order", {
        id,
        deliveryStatus: "delivered",
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success(locale.successOrderDeliveredMessage);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error(locale.errorOrderDeliveredMessage);
    }
  }

  const columns = getOrderColumns({
    field: "action",
    headerName: "Event",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="flex justify-between gap-4 w-full">
          <Cta
            title="Dispatch order"
            icon={MdDeliveryDining}
            onClick={() => dispatchHandler(params.row?.id)}
          />
          <Cta
            title="Deliver order"
            icon={MdDone}
            onClick={() => deliveredHandler(params.row?.id)}
          />
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
        <Subject title={locale.manageOrderTitle} center />
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

export default withProtector(ManageOrdersSection);
