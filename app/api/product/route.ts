import { getUser } from "@/base/actions/getUser";
import prisma from "@/base/lib/prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await getUser();

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json(
      {
        message: "You are not authorized to perform this action",
      },
      { status: 401 }
    );
  }

  const {
    name,
    description,
    price,
    brand,
    category,
    stock,
    inStock,
    attributes,
  } = await req.json();

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      brand,
      category,
      stock: Number(stock),
      inStock,
      attributes,
    },
  });

  return NextResponse.json(product);
}
