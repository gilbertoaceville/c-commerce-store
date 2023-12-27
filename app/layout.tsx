import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import RootTemplate from "@/components/template/rootTemplate";
import clsx from "clsx";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bluecube Store",
  description: "Complex e-commerce store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(montserrat.className, "text-primary")}>
        <RootTemplate>{children}</RootTemplate>
      </body>
    </html>
  );
}
