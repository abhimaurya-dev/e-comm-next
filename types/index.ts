import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updateAt" | "emailVerified"
> & {
  createdAt: string | null;
  updateAt: string | null;
  emailVerified: string | null;
};
