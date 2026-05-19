import { Router } from "express";
import { authRouter } from "./auth.routes";
import { loanRouter } from "./loan.routes";
import { invitationRoutes, participantRoutes } from "./participant.routes";
import { transactionRoutes } from "./transaction.routes";
import { notificationRoutes } from "./notification.routes";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/loans", loanRouter);
appRouter.use("/invitations", invitationRoutes);
appRouter.use("/participants", participantRoutes);
appRouter.use("/transactions", transactionRoutes);
appRouter.use("/notifications", notificationRoutes);

export { appRouter };
