import * as transactionRepository from "../repositories/transaction.repository";
import * as loanRepository from "../repositories/loan.repository";
import { AppError } from "../errors/AppError";
import type {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../validators/transaction.schema";

export const createTransactionService = async (
  loanId: number,
  userId: number,
  data: CreateTransactionInput,
) => {
  const loan = await loanRepository.getLoanById(loanId);
  if (!loan) throw new AppError("NOT_FOUND", "Loan not found");

  const participant = loan.participants.find((p: any) => p.user_id === userId);
  if (!participant)
    throw new AppError("FORBIDDEN", "Only participants can record payments");

  return await transactionRepository.createTransaction({
    loan_id: loanId,
    loan_participant_id: participant.id,
    amount_in_paise: BigInt(data.amount_in_paise),
    transaction_date: new Date(data.transaction_date),
    proof_file_url: data.proof_file_url,
    proof_file_type: data.proof_file_type,
    notes: data.notes,
    status: "pending",
  });
};

export const getLoanTransactionsService = async (
  loanId: number,
  userId: number,
) => {
  const loan = await loanRepository.getLoanById(loanId);
  if (!loan) throw new AppError("NOT_FOUND", "Loan not found");

  const isParticipant = loan.participants.some(
    (p: any) => p.user_id === userId,
  );
  if (!isParticipant) throw new AppError("FORBIDDEN", "Access denied");

  return await transactionRepository.getTransactionsByLoanId(loanId);
};

export const getTransactionService = async (
  transactionId: number,
  userId: number,
) => {
  const transaction =
    await transactionRepository.getTransactionById(transactionId);
  if (!transaction) throw new AppError("NOT_FOUND", "Transaction not found");

  const isParticipant = transaction.loan.participants.some(
    (p: any) => p.user_id === userId,
  );
  if (!isParticipant) throw new AppError("FORBIDDEN", "Access denied");

  return transaction;
};

export const updateTransactionService = async (
  transactionId: number,
  userId: number,
  data: UpdateTransactionInput,
) => {
  const transaction =
    await transactionRepository.getTransactionById(transactionId);
  if (!transaction) throw new AppError("NOT_FOUND", "Transaction not found");

  if (transaction.participant.user_id !== userId)
    throw new AppError("FORBIDDEN", "You can only edit your own transactions");
  if (transaction.status !== "pending")
    throw new AppError(
      "CONFLICT",
      "Cannot edit a verified or rejected transaction",
    );

  return await transactionRepository.updateTransaction(transactionId, {
    amount_in_paise: data.amount_in_paise
      ? BigInt(data.amount_in_paise)
      : undefined,
    transaction_date: data.transaction_date
      ? new Date(data.transaction_date)
      : undefined,
    notes: data.notes,
  });
};

export const deleteTransactionService = async (
  transactionId: number,
  userId: number,
) => {
  const transaction =
    await transactionRepository.getTransactionById(transactionId);
  if (!transaction) throw new AppError("NOT_FOUND", "Transaction not found");

  if (transaction.participant.user_id !== userId)
    throw new AppError(
      "FORBIDDEN",
      "You can only delete your own transactions",
    );
  if (transaction.status !== "pending")
    throw new AppError("CONFLICT", "Cannot delete a verified transaction");

  await transactionRepository.softDeleteTransaction(transactionId);
  return { message: "Transaction deleted successfully" };
};
