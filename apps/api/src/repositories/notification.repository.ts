import { db } from "@loansync/db";

export const getNotificationsByUserId = async (userId: number) => {
  return await db.notification.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
  });
};

export const getNotificationById = async (id: number) => {
  return await db.notification.findUnique({ where: { id } });
};

export const markNotificationAsRead = async (id: number) => {
  return await db.notification.update({
    where: { id },
    data: { is_read: true },
  });
};

export const getLoanEvents = async (loanId: number) => {
  return await db.loanEvent.findMany({
    where: { loan_id: loanId },
    orderBy: { created_at: "desc" },
  });
};
