import * as loanRepository from "../repositories/loan.repository";
import { generateProjections } from "./projection.service";
import type { CreateLoanInput } from "../validators/loan.schema";
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
    throw new AppError("LOAN_NOT_FOUND");
  }

  const isParticipant = loan.participants.some((p) => p.user_id === userId);
  if (!isParticipant) {
    throw new AppError("FORBIDDEN");
  }

  return loan;
};
