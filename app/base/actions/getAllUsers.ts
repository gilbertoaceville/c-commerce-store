import prisma from "@/base/lib/prisma/client";

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error: any) {
    throw new Error("Error getting all users", error);
  }
}
