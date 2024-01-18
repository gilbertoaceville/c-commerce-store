"use client";

import { DataGrid } from "@mui/x-data-grid";
import { MdCached, MdDelete, MdRemoveRedEye } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import fireBaseApp from "@/base/lib/firebase/config";
import Link from "next/link";

import withProtector from "@/components/layout/admin/hoc/with-protector";
import { AttributesEntity, ProductsEntity } from "@/base/types/product";
import { formatPrice } from "@/base/utils/functions/formatPrice";
import Subject from "@/components/element/subject/subject";

import Cta from "./components/cta";
import { ManageProductsProps } from "./types";
import { getProductColumns } from "./helper/getColumns";
import locale from "./locale/en.json";

function ManageProductsSection({ products }: ManageProductsProps) {
  const router = useRouter();

  // consider useMemo, also check keys
  let rows: Omit<ProductsEntity, "description">[] = [];

  if (products) {
    rows = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: formatPrice(product.price, "symbol"),
      brand: product.brand,
      category: product.category,
      inStock: product.inStock,
      stock: product.stock,
      attributes: product.attributes,
    }));
  }

  async function handleStockToggle(id: string, inStock: boolean) {
    try {
      const response = await axios.put("/api/product", {
        id,
        inStock: !inStock,
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success(locale.successMessage);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error(locale.errorMessage);
    }
  }

  async function handleImageDeleteformFB(attributes: AttributesEntity[]) {
    try {
      for (const attribute of attributes) {
        if (attribute?.image) {
          const storage = getStorage(fireBaseApp);
          const imageRef = ref(storage, attribute.image);

          await deleteObject(imageRef);
          console.log("Image deleted", attribute.image);
        }
      }
    } catch (error) {
      console.error("Error deleting images", error);
    }
  }

  async function handleProductDelete(
    id: string,
    attributes: AttributesEntity[]
  ) {
    toast(locale.deleteMessage);

    await handleImageDeleteformFB(attributes);

    try {
      const response = await axios.delete(`/api/product/${id}`);

      if (response.status >= 200 && response.status < 300) {
        toast.success(locale.successDeleteMessage);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error(locale.errorDeleteMessage);
    }
  }

  // use useMemo() or keys
  const columns = getProductColumns({
    field: "action",
    headerName: "Event",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="flex justify-between gap-4 w-full">
          <Cta
            title="Toggle In Stock"
            icon={MdCached}
            onClick={() =>
              handleStockToggle(params.row?.id, params.row?.inStock)
            }
          />
          <Cta
            title="Delete Product"
            icon={MdDelete}
            onClick={() =>
              handleProductDelete(params.row?.id, params.row?.attributes)
            }
          />
          <Link href={`/product/${params.row?.id}`}>
            <Cta title="See product" icon={MdRemoveRedEye} onClick={() => {}} />
          </Link>
        </div>
      );
    },
  });

  return (
    <div className="max-w-[1150px] mx-auto text-xl">
      <div className="mb-6 mt-8">
        <Subject title={locale.manageProductTitle} center />
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

export default withProtector(ManageProductsSection);
