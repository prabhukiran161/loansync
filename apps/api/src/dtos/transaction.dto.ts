import type { Request } from "express";
import { AppError } from "../errors/AppError";
import type {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../validators/transaction.schema";

export const getTransactionParamsDTO = (req: Request) => {
  const transactionId = Number(req.params.transactionId);
  if (isNaN(transactionId) || transactionId <= 0) {
    throw new AppError("INVALID_REQUEST", "Invalid Transaction ID in the URL");
  }
  return { transactionId };
};

export const createTransactionRequestDTO = (
  req: Request,
): CreateTransactionInput => {
  const body = req.body || {};
  return {
    amount_in_paise: body.amountInPaise
      ? Number(body.amountInPaise)
      : (undefined as any),
    transaction_date: body.transactionDate,
    proof_file_url: body.proofFileUrl,
    proof_file_type: body.proofFileType,
    notes: body.notes,
  };
};

export const updateTransactionRequestDTO = (
  req: Request,
): UpdateTransactionInput => {
  const body = req.body || {};
  return {
    amount_in_paise: body.amountInPaise
      ? Number(body.amountInPaise)
      : undefined,
    transaction_date: body.transactionDate,
    notes: body.notes,
  };
};
