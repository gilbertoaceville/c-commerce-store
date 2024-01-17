import { getUser } from "@/base/actions/getUser";
import prisma from "@/base/lib/prisma/client";
import { NextResponse } from "next/server";

type ParamProps = {
  params: {
    id: string;
  };
};
export async function DELETE(req: Request, { params }: ParamProps) {
  const user = await getUser();

  if (!user || user.role !== "ADMIN") {
    return NextResponse.error();
  }

  const { id } = params;

  const product = await prisma.product.delete({
    where: {
      id,
    },
  });

  return NextResponse.json(product);
}
