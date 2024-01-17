import { getUser } from "@/base/actions/getUser";
import Container from "@/components/layout/container/container";
import ManageOrdersSection from "@/components/section/admin/dashboard/manage-orders";
import locale from "../locale/en.json";
import { getOrders } from "@/base/actions/getOrders";

export default async function ManageOrders() {
  const orders = await getOrders();
  const user = await getUser();

  return (
    <div className="p-8">
      <Container>
        <ManageOrdersSection
          currentUser={user}
          title={locale.nullTitle}
          orders={orders}
        />
      </Container>
    </div>
  );
}
