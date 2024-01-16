import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import clsx from "clsx";

import RootTemplate from "@/components/template/rootTemplate";
import Provider from "@/providers/provider";

import "./globals.css";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bluecube Store",
  description: "Complex e-commerce store",
  keywords: "cube, bluecube, store, e-commerce, web development",
  creator: "Gilbert James",
  applicationName: "Bluecube Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(montserrat.className, "text-primary")}>
        <Toaster
          toastOptions={{
            style: { background: "rgb(45 212 191)", color: "#000000" },
          }}
        />
        <Provider>
          <RootTemplate>{children}</RootTemplate>
        </Provider>
      </body>
    </html>
  );
}
