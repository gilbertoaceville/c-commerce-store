import { IUser } from "@/base/types/user";

export interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export interface MenuProps {
  currentUser: IUser | null;
}
