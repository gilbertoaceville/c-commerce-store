import prisma from "@/base/lib/prisma/client";

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdDate: "desc",
      },
    });

    return orders;
  } catch (error: any) {
    throw new Error("Error getting orders", error);
  }
}
