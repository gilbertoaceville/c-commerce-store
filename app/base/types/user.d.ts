import { User } from "@prisma/client";

export interface IUser
  extends Omit<User, "createdAt" | "updatedAt" | "emailVerified"> {
  emailVerified?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CurrentUserProps {
  currentUser: IUser | null;
}