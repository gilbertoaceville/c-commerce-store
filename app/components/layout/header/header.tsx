import clsx from "clsx";
import Link from "next/link";
import { Redressed } from "next/font/google";

import { getUser } from "@/base/actions/getUser";
import Container from "@/components/layout/container/container";
import CartCount from "@/components/element/cart-count/cart-count";

import Menu from "./component/menu";
import HeaderCategories from "./component/categories/categories";
import SearchBar from "./component/search-bar";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

export default async function Header() {
  const user = await getUser();
  return (
    <div className="sticky top-0 w-full z-10 bg-tertiary shadow-sm">
      <div className="py-4 border-b-[1px] border-secondary">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href="/"
              className={clsx(redressed.className, "text-2xl font-bold")}
            >
              Bluecube_
            </Link>
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <Menu currentUser={user} />
            </div>
          </div>
        </Container>
      </div>
      <HeaderCategories />
    </div>
  );
}
