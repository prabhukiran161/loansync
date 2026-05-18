import { Router } from "express";
import { authRouter } from "./auth.routes";
import { loanRouter } from "./loan.routes";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/loans", loanRouter);

export { appRouter };
