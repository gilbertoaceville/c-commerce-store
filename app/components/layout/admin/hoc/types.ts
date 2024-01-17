import { CurrentUserProps } from "@/base/types/user";
import {
  ManageOrdersProps,
  ManageProductsProps,
} from "@/components/section/admin/dashboard/types";

export interface IWithProtector
  extends CurrentUserProps,
    ManageProductsProps,
    ManageOrdersProps {
  title: string;
}
