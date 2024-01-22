import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import prisma from "@/base/lib/prisma/client";

export async function getSession(): Promise<unknown> {
  return await getServerSession(authOptions);
}

export async function getUser() {
  try {
    const session: any = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email },
      include: {
        orders: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: user?.emailVerified?.toString() || null,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
