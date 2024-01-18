import { IParams } from "@/base/types/params";
import Container from "@/components/layout/container/container";
import OrderDetail from "@/components/section/admin/order-details/order-details";
import { getOrderById } from "@/base/actions/getOrderById";

export default async function Order({
  params,
}: {
  params: { orderId: string };
}) {
  const order = await getOrderById(params);

  if (!order) {
    return (
      <Container className="p-8">
        <div className="text-2xl flex justify-center items-center text-red-300">
          Order is not found
        </div>
      </Container>
    );
  }

  return (
    <Container className="p-8">
      <OrderDetail order={order} />
    </Container>
  );
}
