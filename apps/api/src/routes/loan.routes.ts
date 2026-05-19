import { Router } from "express";
import {
  createLoanController,
  getLoanController,
  getAllLoansController,
  updateLoanController,
  deleteLoanController,
} from "../controllers/loan.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { getLoanProjectionsController } from "../controllers/projection.controller";
import {
  createTransactionController,
  getLoanTransactionsController,
} from "../controllers/transaction.controller";
import {
  getParticipantsController,
  inviteParticipantController,
} from "../controllers/participant.controller";

export const loanRouter = Router();

loanRouter.use(authenticate);

loanRouter.post("/", createLoanController);
loanRouter.get("/:id", getLoanController);
loanRouter.get("/", getAllLoansController);
loanRouter.patch("/:id", updateLoanController);
loanRouter.delete("/:id", deleteLoanController);

loanRouter.post("/:loanId/invitations", inviteParticipantController);
loanRouter.get("/:loanId/participants", getParticipantsController);

loanRouter.get("/:loanId/projections", getLoanProjectionsController);

loanRouter.post("/:loanId/transactions", createTransactionController);
loanRouter.get("/:loanId/transactions", getLoanTransactionsController);
