import { getUser } from "@/base/actions/getUser";
import Container from "@/components/layout/container/container";
import AddProductsForm from "@/components/section/admin/form/add-products/add-product";
import locale from "../locale/en.json";

export default async function AddProducts() {
  const user = await getUser();

  return (
    <div className="p-8">
      <Container>
        <AddProductsForm currentUser={user} title={locale.nullTitle} />
      </Container>
    </div>
  );
}
