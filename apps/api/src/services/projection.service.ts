import type { Prisma } from "@loansync/db";
import { db } from "@loansync/db";
import * as projectionRepository from "../repositories/projection.repository";
import * as loanRepository from "../repositories/loan.repository";
import { AppError } from "../errors/AppError";

export type ProjectionCalculation = Omit<
  Prisma.LoanProjectionCreateManyInput,
  "loan_id" | "loan_participant_id"
>;

export const generateProjections = (
  principalInPaise: number,
  interestRateBps: number,
  durationMonths: number,
  startDate: string,
): ProjectionCalculation[] => {
  const projections: ProjectionCalculation[] = [];

  const monthlyInterestRate = interestRateBps / 10000 / 12;
  let remainingBalance = principalInPaise;

  let emi = 0;
  if (monthlyInterestRate > 0) {
    const mathPower = Math.pow(1 + monthlyInterestRate, durationMonths);
    emi =
      principalInPaise * monthlyInterestRate * (mathPower / (mathPower - 1));
  } else {
    emi = principalInPaise / durationMonths;
  }

  const baseDate = new Date(startDate);

  for (let month = 1; month <= durationMonths; month++) {
    const projectedDate = new Date(baseDate);
    projectedDate.setMonth(projectedDate.getMonth() + month);

    const interestComponent = remainingBalance * monthlyInterestRate;
    let principalComponent = emi - interestComponent;

    if (month === durationMonths) {
      principalComponent = remainingBalance;
      emi = principalComponent + interestComponent;
    }

    remainingBalance = Math.round(remainingBalance - principalComponent);

    projections.push({
      month_number: month,
      expected_payment_in_paise: BigInt(Math.round(emi)),
      interest_component_in_paise: BigInt(Math.round(interestComponent)),
      principal_component_in_paise: BigInt(Math.round(principalComponent)),
      remaining_balance_in_paise: BigInt(Math.max(0, remainingBalance)),
      projected_due_date: projectedDate,
      status: "upcoming",
    });
  }

  return projections;
};

export const getLoanProjectionsService = async (
  loanId: number,
  userId: number,
) => {
  const loan = await loanRepository.getLoanById(loanId);
  if (!loan) throw new AppError("NOT_FOUND", "Loan not found");

  const isParticipant = loan.participants.some(
    (p: any) => p.user_id === userId,
  );
  if (!isParticipant) {
    throw new AppError(
      "FORBIDDEN",
      "You are not authorized to view projections for this loan",
    );
  }

  return await projectionRepository.getProjectionsByLoanId(loanId);
};

export const getParticipantProjectionsService = async (
  participantId: number,
  userId: number,
) => {
  const targetParticipant = await db.loanParticipant.findUnique({
    where: { id: participantId },
  });

  if (!targetParticipant) {
    throw new AppError("NOT_FOUND", "Participant not found");
  }

  const isOwner = targetParticipant.user_id === userId;

  let isAdmin = false;
  if (!isOwner) {
    const loan = await loanRepository.getLoanById(targetParticipant.loan_id);
    if (!loan) throw new AppError("NOT_FOUND", "Associated loan not found");

    const requesterAsParticipant = loan.participants.find(
      (p: any) => p.user_id === userId,
    );

    if (requesterAsParticipant && requesterAsParticipant.role === "admin") {
      isAdmin = true;
    }
  }

  if (!isOwner && !isAdmin) {
    throw new AppError(
      "FORBIDDEN",
      "You are not authorized to view this participant's financial projections.",
    );
  }

  return await projectionRepository.getProjectionsByParticipantId(
    participantId,
  );
};
