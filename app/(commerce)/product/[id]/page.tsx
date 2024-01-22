import Container from "@/components/layout/container/container";
import ProductDetail from "@/components/section/product-detail/product-detail";
import ListRating from "@/components/section/list-rating/list-rating";
import { getProductById } from "@/base/actions/getProductById";

export default async function Product({ params }: { params: { id: string } }) {
  const product = await getProductById(params);

  if (!product) {
    return (
      <Container className="p-8">
        <div className="text-2xl flex justify-center items-center text-red-300">
          Product is not found
        </div>
      </Container>
    );
  }

  return (
    <Container className="p-8">
      <ProductDetail product={product} />

      <div className="flex flex-col mt-20 gap-4">
        <div>Add Rating</div>
        <ListRating product={product} />
      </div>
    </Container>
  );
}
