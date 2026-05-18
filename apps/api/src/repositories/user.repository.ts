import { db, Prisma } from "@loansync/db";

export const findUserByUserName = async (userName: string) => {
  return await db.user.findUnique({ where: { userName } });
};

export const findUserById = async (id: number) => {
  return await db.user.findUnique({ where: { id } });
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  return await db.user.create({ data });
};
