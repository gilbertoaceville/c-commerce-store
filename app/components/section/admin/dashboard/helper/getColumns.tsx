import { MdClose, MdDone } from "react-icons/md";
import { GridColDef } from "@mui/x-data-grid";

import ContentStatus from "../components/content-status";
import locale from "../locale/en.json";
import { getDeliveryStatus, getPaymentStatus } from "./getStatus";

export function getProductColumns(cellProps: GridColDef): GridColDef[] {
  return [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-primary">{params.row?.price}</div>
        );
      },
    },
    { field: "brand", headerName: "Brand", width: 100 },
    { field: "category", headerName: "Category", width: 100 },
    {
      field: "inStock",
      headerName: "In stock",
      width: 100,
      renderCell: (params) => {
        const inStock = params.row?.inStock ? (
          <ContentStatus
            text={locale.inStock}
            className="bg-green-500 text-green-200"
            icon={MdDone}
          />
        ) : (
          <ContentStatus
            text={locale.outOfStock}
            className="bg-rose-500 text-rose-200"
            icon={MdClose}
          />
        );
        return <div className="">{inStock}</div>;
      },
    },
    { field: "stock", headerName: "Stock", width: 100 },

    cellProps,
  ];
}

export function getOrderColumns(cellProps: GridColDef): GridColDef[] {
  return [
    { field: "id", headerName: "ID", width: 220 },
    { field: "client", headerName: "Client Name", width: 140 },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-primary">{params.row?.amount}</div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 120,
      renderCell: (params) => {
        const paymentStatus = getPaymentStatus(params.row?.paymentStatus);
        return <div className="">{paymentStatus}</div>;
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 120,
      renderCell: (params) => {
        const deliveryStatus = getDeliveryStatus(params.row?.deliveryStatus);
        return <div>{deliveryStatus}</div>;
      },
    },
    { field: "date", headerName: "Date", width: 100 },

    cellProps,
  ];
}
