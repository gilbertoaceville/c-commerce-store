import { getUser } from "@/base/actions/getUser";
import prisma from "@/base/lib/prisma/client";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const user = await getUser();

  if (!user || user.role !== "ADMIN") {
    return NextResponse.json(
      {
        message: "You are not authorized to perform this action",
      },
      { status: 401 }
    );
  }

  const { id, deliveryStatus } = await req.json();

  const product = await prisma.order.update({
    where: {
      id,
    },
    data: {
      deliveryStatus,
    },
  });

  return NextResponse.json(product);
}
