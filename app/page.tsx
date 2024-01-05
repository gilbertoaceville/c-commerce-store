import Container from "@/components/layout/container/container";
import Banner from "@/components/element/banner/banner";
import data from "@/base/lib/products.json";
import ProductCard from "@/components/element/product-card/product-card";

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <Banner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {data?.products?.map((product, index) => (
            <ProductCard key={`${product.name}-${index}`} data={product} />
          ))}
        </div>
      </Container>
    </div>
  );
}
