import { IParams } from "@/base/types/params";
import Container from "@/components/layout/container/container";
import ProductDetail from "@/components/section/product-detail/product-detail";
import data from "@/base/lib/products.json";
import ListRating from "@/components/section/list-rating/list-rating";
import { ProductsEntity } from "@/base/types/product";
import { getProducts } from "@/base/actions/getProducts";

export default async function Product({ params }: IParams) {
  const products = await getProducts({ category: null });

  const product = products?.find(
    (item) => item.id === params.id
  ) as ProductsEntity;

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
