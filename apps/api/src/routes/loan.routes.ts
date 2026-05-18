import { Router } from "express";
import {
  createLoanController,
  getLoanController,
} from "../controllers/loan.controller";
import { authenticate } from "../middlewares/auth.middleware";

const loanRouter = Router();

loanRouter.use(authenticate);

loanRouter.post("/", createLoanController);
loanRouter.get("/:id", getLoanController);

export { loanRouter };
