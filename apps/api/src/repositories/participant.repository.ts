import { db } from "@loansync/db";
import type { Prisma } from "@loansync/db";

export const getParticipantByLoanAndUser = async (
  loanId: number,
  userId: number,
) => {
  return await db.loanParticipant.findUnique({
    where: {
      loan_id_user_id: {
        loan_id: loanId,
        user_id: userId,
      },
    },
  });
};

export const createInvitation = async (
  data: Prisma.LoanInvitationUncheckedCreateInput,
) => {
  return await db.loanInvitation.create({ data });
};

export const getInvitationsByUserId = async (userId: number) => {
  return await db.loanInvitation.findMany({
    where: { invited_user_id: userId, status: "pending" },
    include: {
      loan: { select: { loan_name: true } },
      invitedBy: { select: { userName: true } },
    },
  });
};

export const getInvitationById = async (id: number) => {
  return await db.loanInvitation.findUnique({ where: { id } });
};

export const respondToInvitation = async (
  invitationId: number,
  status: "accepted" | "rejected",
  userId: number,
  loanId: number,
) => {
  return await db.$transaction(async (tx) => {
    const invite = await tx.loanInvitation.update({
      where: { id: invitationId },
      data: { status, responded_at: new Date() },
    });

    if (status === "accepted") {
      await tx.loanParticipant.create({
        data: {
          loan_id: loanId,
          user_id: userId,
          role: "member",
          participant_state: "active",
          principal_share_in_paise: BigInt(0),
          remaining_balance_in_paise: BigInt(0),
          liability_percentage_bps: 0,
        },
      });

      await tx.loanEvent.create({
        data: {
          loan_id: loanId,
          event_type: "participant_joined",
          event_data: { userId },
        },
      });
    }
    return invite;
  });
};

export const getParticipantsByLoan = async (loanId: number) => {
  return await db.loanParticipant.findMany({
    where: { loan_id: loanId },
    include: { user: { select: { userName: true } } },
  });
};

export const updateParticipant = async (id: number, data: any) => {
  return await db.loanParticipant.update({
    where: { id },
    data,
  });
};
