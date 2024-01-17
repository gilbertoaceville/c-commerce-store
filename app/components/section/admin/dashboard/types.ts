import { ProductsEntity } from "@/base/types/product";
import { IconType } from "react-icons";

export interface ManageProductsProps {
  products: ProductsEntity[];
}

export interface InStockProps {
  text: string;
  icon: IconType;
  className?: string;
}

export interface CtaProps {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  title?: string;
}
