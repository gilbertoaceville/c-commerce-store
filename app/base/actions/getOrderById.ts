import prisma from "@/base/lib/prisma/client";

interface IParams {
  orderId: string;
}

export async function getOrderById(params: IParams) {
  try {
    const { orderId } = params;

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order) return null;

    return order;
  } catch (error) {
    console.error("Order was not retrieved", error);
  }
}
