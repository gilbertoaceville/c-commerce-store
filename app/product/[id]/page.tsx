import { IParams } from "@/base/types/params";
import Container from "@/components/layout/container/container";
import ProductDetail from "@/components/section/product-detail/product-detail";
import data from "@/base/lib/products.json";
import ListRating from "@/components/section/list-rating/list-rating";

export default function Product({ params }: IParams) {
  return (
    <Container className="p-8">
      <ProductDetail product={data.products[2]} />
      <div className="flex flex-col mt-20 gap-4">
        <div>Add Rating</div>
        <ListRating product={data.products[2]} />
      </div>
    </Container>
  );
}
