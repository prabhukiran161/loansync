import * as verificationRepository from "../repositories/verification.repository";
import * as transactionRepository from "../repositories/transaction.repository";
import { AppError } from "../errors/AppError";
import type { VerifyTransactionInput } from "../validators/verification.schema";

export const verifyTransactionService = async (
  transactionId: number,
  userId: number,
  data: VerifyTransactionInput,
) => {
  const transaction =
    await transactionRepository.getTransactionById(transactionId);
  if (!transaction) throw new AppError("NOT_FOUND", "Transaction not found");

  const adminParticipant = transaction.loan.participants.find(
    (p: any) => p.user_id === userId,
  );
  if (!adminParticipant || adminParticipant.role !== "admin") {
    throw new AppError("FORBIDDEN", "Only loan admins can verify transactions");
  }

  if (transaction.status !== "pending") {
    throw new AppError("CONFLICT", "Transaction has already been processed");
  }

  return await verificationRepository.verifyTransaction(
    transactionId,
    adminParticipant.id,
    data.status,
    data.remarks,
  );
};

export const getTransactionVerificationsService = async (
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

  return await verificationRepository.getVerificationsByTransaction(
    transactionId,
  );
};
