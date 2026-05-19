import { Router } from "express";
import { authRouter } from "./auth.routes";
import { loanRouter } from "./loan.routes";
import { invitationRoutes, participantRoutes } from "./participant.routes";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/loans", loanRouter);
appRouter.use("/invitations", invitationRoutes);
appRouter.use("/participants", participantRoutes);

export { appRouter };
