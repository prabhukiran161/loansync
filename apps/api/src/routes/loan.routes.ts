import { Router } from "express";
import {
  createLoanController,
  getLoanController,
  getAllLoansController,
  updateLoanController,
  deleteLoanController,
} from "../controllers/loan.controller";
import { authenticate } from "../middlewares/auth.middleware";

const loanRouter = Router();

loanRouter.use(authenticate);

loanRouter.post("/", createLoanController);
loanRouter.get("/:id", getLoanController);
loanRouter.get("/", getAllLoansController);
loanRouter.patch("/:id", updateLoanController);
loanRouter.delete("/:id", deleteLoanController);

export { loanRouter };
