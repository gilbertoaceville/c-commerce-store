import { IParams } from "@/base/types/params";
import Container from "@/components/layout/container/container";
import ProductDetail from "@/components/section/product-detail/product-detail";
import data from "@/base/lib/products.json";

export default function Product({ params }: IParams) {
  return (
    <Container className="p-8">
      <ProductDetail product={data.products[1]} />
    </Container>
  );
}
