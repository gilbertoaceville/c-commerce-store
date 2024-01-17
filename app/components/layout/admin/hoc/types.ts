import { CurrentUserProps } from "@/base/types/user";
import { ManageProductsProps } from "@/components/section/admin/dashboard/types";

export interface IWithProtector extends CurrentUserProps, ManageProductsProps {
  title?: string;
}
