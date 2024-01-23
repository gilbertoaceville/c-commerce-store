import { ProductsEntity } from "@/base/types/product";
import { Order, User, Product } from "@prisma/client";
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

export interface SummaryProps extends ManageOrdersProps, ManageProductsProps {
  users?: User[];
}

export type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

export interface BarChartProps {
  data?: BarType[];
}

export type BarType = {
  day: string;
  date: string;
  amount: number;
};

export interface AdminDashboardProps extends SummaryProps, BarChartProps {}
