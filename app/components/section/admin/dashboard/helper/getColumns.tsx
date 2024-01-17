import { MdClose, MdDone } from "react-icons/md";
import { GridColDef } from "@mui/x-data-grid";

import InStockStatus from "../components/in-stock";
import locale from "../locale/en.json";

export function getColumns(cellProps: GridColDef): GridColDef[] {
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
          <InStockStatus
            text={locale.inStock}
            className="bg-green-500 text-green-200"
            icon={MdDone}
          />
        ) : (
          <InStockStatus
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
