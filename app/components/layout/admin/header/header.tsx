"use client";

import Link from "next/link";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";

import Container from "@/components/layout/container/container";

import AdminHeaderItem from "./components/header-item";
import locale from "./locale/en.json";
import { usePathname } from "next/navigation";

export default function AdminHeader() {
  const pathname = usePathname();
  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] bg-secondary mt-[2px] border-transparent pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href="/admin">
            <AdminHeaderItem
              icon={MdDashboard}
              selected={pathname === "/admin"}
              label={locale.summary}
            />
          </Link>
          <Link href="/admin/add-products">
            <AdminHeaderItem
              icon={MdLibraryAdd}
              selected={pathname === "/admin/add-products"}
              label={locale.addProducts}
            />
          </Link>
          <Link href="/admin/manage-products">
            <AdminHeaderItem
              icon={MdDns}
              selected={pathname === "/admin/manage-products"}
              label={locale.manageProducts}
            />
          </Link>
          <Link href="/admin/manage-orders">
            <AdminHeaderItem
              icon={MdFormatListBulleted}
              selected={pathname === "/admin/manage-orders"}
              label={locale.manageOrders}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
}
