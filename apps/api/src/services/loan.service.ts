import * as loanRepository from "../repositories/loan.repository";
import { generateProjections } from "./projection.service";
import type {
  CreateLoanInput,
  UpdateLoanInput,
} from "../validators/loan.schema";
import { AppError } from "../errors/AppError";

export const createLoanService = async (
  userId: number,
  data: CreateLoanInput,
) => {
  const projectionsData = generateProjections(
    data.principal_in_paise,
    data.interest_rate_bps,
    data.duration_months,
    data.start_date,
  );

  const loan = await loanRepository.createLoanWithParticipantAndProjections(
    {
      loan_name: data.loan_name,
      principal_in_paise: BigInt(data.principal_in_paise),
      remaining_balance_in_paise: BigInt(data.principal_in_paise),
      interest_rate_bps: data.interest_rate_bps,
      duration_months: data.duration_months,
      start_date: new Date(data.start_date),
      status: "active",
      creator: { connect: { id: userId } },
    },
    {
      user: { connect: { id: userId } },
      role: "admin",
      participant_state: "active",
      principal_share_in_paise: BigInt(data.principal_in_paise),
      remaining_balance_in_paise: BigInt(data.principal_in_paise),
      liability_percentage_bps: 10000,
    },
    projectionsData,
  );

  return loan;
};

export const getLoanService = async (loanId: number, userId: number) => {
  const loan = await loanRepository.getLoanById(loanId);
  if (!loan) {
    throw new AppError("NOT_FOUND", "Loan not found");
  }

  const isParticipant = loan.participants.some((p) => p.user_id === userId);
  if (!isParticipant) {
    throw new AppError("FORBIDDEN", "You are not a participant in this loan");
  }

  return loan;
};

export const getAllLoansService = async (userId: number) => {
  return await loanRepository.getLoansByUserId(userId);
};

export const updateLoanService = async (
  loanId: number,
  userId: number,
  data: UpdateLoanInput,
) => {
  const existingLoan = await loanRepository.getLoanById(loanId);
  if (!existingLoan) throw new AppError("NOT_FOUND", "Loan not found");

  const participant = existingLoan.participants.find(
    (p) => p.user_id === userId,
  );
  if (!participant || participant.role !== "admin") {
    throw new AppError("FORBIDDEN", "Only admin can perform this action");
  }

  return await loanRepository.updateLoan(loanId, {
    loan_name: data.loan_name,
    status: data.status,
  });
};

export const deleteLoanService = async (loanId: number, userId: number) => {
  const existingLoan = await loanRepository.getLoanById(loanId);
  if (!existingLoan) throw new AppError("NOT_FOUND", "Loan not found");

  const participant = existingLoan.participants.find(
    (p) => p.user_id === userId,
  );
  if (!participant || participant.role !== "admin") {
    throw new AppError("FORBIDDEN", "Only admin can perform this action");
  }

  await loanRepository.deleteLoan(loanId);
  return { message: "Loan deleted successfully" };
};
