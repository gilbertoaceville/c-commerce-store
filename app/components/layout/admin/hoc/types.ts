import { CurrentUserProps } from "@/base/types/user";
import { AdminDashboardProps } from "@/components/section/admin/dashboard/types";

export interface IWithProtector extends CurrentUserProps, AdminDashboardProps {
  title: string;
}
