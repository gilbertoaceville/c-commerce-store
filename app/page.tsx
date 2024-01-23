export const revalidate = 0;

import Container from "@/components/layout/container/container";
import Banner from "@/components/element/banner/banner";
import ProductCard from "@/components/element/product/card/card";
import { getProducts } from "@/base/actions/getProducts";
import { IProductParams } from "@/base/types/product";
import NotFoundData from "@/components/element/not-found/not-found";
import { shuffledArray } from "./base/utils/functions/shuffleArray";

export default async function Home({
  searchParams,
}: {
  searchParams: IProductParams;
}) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return <NotFoundData title="Products not found!" />;
  }

  const shuffledProducts = shuffledArray(products || []);
  return (
    <div className="p-8">
      <Container>
        <div>
          <Banner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {shuffledProducts?.map((product, index) => (
            <ProductCard key={`${product.name}-${index}`} data={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
