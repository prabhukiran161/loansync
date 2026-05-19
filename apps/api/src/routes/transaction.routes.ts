import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  getTransactionController,
  updateTransactionController,
  deleteTransactionController,
} from "../controllers/transaction.controller";

export const transactionRoutes = Router();
transactionRoutes.use(authenticate);

transactionRoutes.get("/:transactionId", getTransactionController);
transactionRoutes.patch("/:transactionId", updateTransactionController);
transactionRoutes.delete("/:transactionId", deleteTransactionController);
