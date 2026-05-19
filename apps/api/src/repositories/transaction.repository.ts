import { db } from "@loansync/db";
import type { Prisma } from "@loansync/db";

export const createTransaction = async (
  data: Prisma.TransactionUncheckedCreateInput,
) => {
  return await db.transaction.create({ data });
};

export const getTransactionsByLoanId = async (loanId: number) => {
  return await db.transaction.findMany({
    where: { loan_id: loanId, deleted_at: null },
    orderBy: { created_at: "desc" },
    include: {
      participant: { include: { user: { select: { userName: true } } } },
    },
  });
};

export const getTransactionById = async (id: number) => {
  return await db.transaction.findFirst({
    where: { id, deleted_at: null },
    include: { loan: { include: { participants: true } }, participant: true },
  });
};

export const updateTransaction = async (
  id: number,
  data: Prisma.TransactionUpdateInput,
) => {
  return await db.transaction.update({ where: { id }, data });
};

export const softDeleteTransaction = async (id: number) => {
  return await db.transaction.update({
    where: { id },
    data: { deleted_at: new Date() },
  });
};
