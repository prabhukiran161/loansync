import { db } from "@loansync/db";

export const getProjectionsByLoanId = async (loanId: number) => {
  return await db.loanProjection.findMany({
    where: { loan_id: loanId },
    orderBy: [{ month_number: "asc" }, { loan_participant_id: "asc" }]
  });
};

export const getProjectionsByParticipantId = async (participantId: number) => {
  return await db.loanProjection.findMany({
    where: { loan_participant_id: participantId },
    orderBy: { month_number: "asc" }
  });
};