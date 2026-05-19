import * as notificationRepository from "../repositories/notification.repository";
import * as loanRepository from "../repositories/loan.repository";
import { AppError } from "../errors/AppError";

export const getNotificationsService = async (userId: number) => {
  return await notificationRepository.getNotificationsByUserId(userId);
};

export const readNotificationService = async (
  notificationId: number,
  userId: number,
) => {
  const notification =
    await notificationRepository.getNotificationById(notificationId);
  if (!notification) throw new AppError("NOT_FOUND", "Notification not found");

  if (notification.user_id !== userId) {
    throw new AppError("FORBIDDEN", "You can only read your own notifications");
  }

  return await notificationRepository.markNotificationAsRead(notificationId);
};

export const getLoanEventsService = async (loanId: number, userId: number) => {
  const loan = await loanRepository.getLoanById(loanId);
  if (!loan) throw new AppError("NOT_FOUND", "Loan not found");

  const isParticipant = loan.participants.some(
    (p: any) => p.user_id === userId,
  );
  if (!isParticipant) {
    throw new AppError(
      "FORBIDDEN",
      "You are not authorized to view this loan's audit trail",
    );
  }

  return await notificationRepository.getLoanEvents(loanId);
};
