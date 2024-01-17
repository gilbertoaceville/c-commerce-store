import { ProductsEntity } from "@/base/types/product";
import { Order, User } from "@prisma/client";
import { IconType } from "react-icons";

export interface ManageProductsProps {
  products?: ProductsEntity[];
}

export type OrderType = Order & {
  user: User;
};

export interface ManageOrdersProps {
  orders?: OrderType[];
}

export interface ContentStatusProps {
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
