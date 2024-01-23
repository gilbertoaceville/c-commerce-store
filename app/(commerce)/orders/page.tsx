import { getUser } from "@/base/actions/getUser";
import Container from "@/components/layout/container/container";
import { getOrders } from "@/base/actions/getOrders";
import { OrdersSection } from "@/components/section/orders/orders";

export default async function ManageOrders() {
  const orders = await getOrders();
  const user = await getUser();

  const ordersByUser = orders.filter((order)=> order.userId === user?.id)

  return (
    <div className="p-8">
      <Container>
        <OrdersSection
          orders={orders}
        />
      </Container>
    </div>
  );
}
