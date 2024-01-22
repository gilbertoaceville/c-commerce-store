import prisma from "@/base/lib/prisma/client";

interface IParams {
  id: string;
}

export async function getProductById(params: IParams) {
  try {
    const { id } = params;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: { createdDate: "desc" },
        },
      },
    });

    if (!product) return null;

    return product;
  } catch (error) {
    console.error("Product was not retrieved", error);
  }
}
