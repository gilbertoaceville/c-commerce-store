import { IProductParams } from "@/base/types/product";
import prisma from "@/base/lib/prisma/client";

export async function getProducts(params: IProductParams) {
  try {
    const { category, searchItem } = params;
    let searchString = "";
    let query = {};

    if (searchItem) {
      searchString = searchItem;
    }

    if (category) {
      query = { category };
    }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          { name: { contains: searchString, mode: "insensitive" } },
          { description: { contains: searchString, mode: "insensitive" } },
        ],
      },
      include: {
        reviews: {
          include: { user: true },
          orderBy: { createdDate: "desc" },
        },
      },
    });

    return products;
  } catch (error: any) {
    throw new Error("Error getting products", error);
  }
}
