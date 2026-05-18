import type { Request } from "express";
import type {
  CreateLoanInput,
  UpdateLoanInput,
} from "../validators/loan.schema";
import { Loan, LoanParticipant } from "@loansync/db";

export const createLoanRequestDTO = (req: Request): CreateLoanInput => {
  const body = req.body || {};
  return {
    loan_name: body.loanName,
    principal_in_paise: Number(body.principalInPaise),
    interest_rate_bps: Number(body.interestRateBps),
    duration_months: Number(body.durationMonths),
    start_date: body.startDate,
  };
};

export const getLoanParamsDTO = (req: Request): { loanId: number } => {
  return {
    loanId: Number(req.params.id),
  };
};

export const loanResponseDTO = (
  loan: Loan & { participants?: LoanParticipant[] },
) => {
  return {
    id: loan.id,
    loanName: loan.loan_name,

    principalInPaise: loan.principal_in_paise.toString(),
    totalPaidInPaise: loan.total_paid_in_paise.toString(),
    remainingBalanceInPaise: loan.remaining_balance_in_paise.toString(),

    interestRateBps: loan.interest_rate_bps,
    durationMonths: loan.duration_months,
    startDate: loan.start_date,
    status: loan.status,

    participants: loan.participants
      ? loan.participants.map(participantResponseDTO)
      : undefined,
  };
};

export const participantResponseDTO = (participant: LoanParticipant) => {
  return {
    id: participant.id,
    userId: participant.user_id,
    role: participant.role,
    state: participant.participant_state,
    principalShareInPaise: participant.principal_share_in_paise.toString(),
    remainingBalanceInPaise: participant.remaining_balance_in_paise.toString(),
    liabilityPercentageBps: participant.liability_percentage_bps,
  };
};

export const updateLoanRequestDTO = (req: Request): UpdateLoanInput => {
  const body = req.body || {};
  return {
    loan_name: body.loanName,
    status: body.status,
  };
};
