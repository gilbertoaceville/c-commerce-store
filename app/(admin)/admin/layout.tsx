import AdminTemplate from "@/components/template/adminTemplate";
import clsx from "clsx";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bluecube Store Admin",
  description: "Restricted admin usage for the Bluecube store",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={clsx(openSans.className)}>
      <AdminTemplate>{children}</AdminTemplate>
    </div>
  );
}
