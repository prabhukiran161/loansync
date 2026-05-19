import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  getNotificationsController,
  readNotificationController,
} from "../controllers/notification.controller";

export const notificationRoutes = Router();
notificationRoutes.use(authenticate);

notificationRoutes.get("/", getNotificationsController);
notificationRoutes.patch("/:notificationId/read", readNotificationController);
