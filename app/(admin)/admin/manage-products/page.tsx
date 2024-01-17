import { getProducts } from "@/base/actions/getProducts";
import { getUser } from "@/base/actions/getUser";
import Container from "@/components/layout/container/container";
import ManageProductsSection from "@/components/section/admin/dashboard/manage-products/manage-products";
import locale from "../locale/en.json";

export default async function ManageProducts() {
  const products = await getProducts({ category: null });
  const user = await getUser();

  return (
    <div className="p-8">
      <Container>
        <ManageProductsSection currentUser={user} title={locale.nullTitle} products={products} />
      </Container>
    </div>
  );
}
