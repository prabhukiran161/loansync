import { catchAsync } from "../utils/catchAsync";
import { successResponse } from "../types/api.types";
import { AppError } from "../errors/AppError";
import { getLoanParamsDTO } from "../dtos/participant.dto";
import * as notificationService from "../services/notification.service";

export const getNotificationsController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const notifications =
    await notificationService.getNotificationsService(userId);
  res.status(200).json(successResponse(notifications));
});

export const readNotificationController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const notificationId = Number(req.params.notificationId);

  if (isNaN(notificationId) || notificationId <= 0) {
    throw new AppError("INVALID_REQUEST", "Invalid notification ID");
  }

  const result = await notificationService.readNotificationService(
    notificationId,
    userId,
  );
  res.status(200).json(successResponse(result));
});

export const getLoanEventsController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const { loanId } = getLoanParamsDTO(req);

  const events = await notificationService.getLoanEventsService(loanId, userId);
  res.status(200).json(successResponse(events));
});
