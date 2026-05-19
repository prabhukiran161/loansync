import * as participantRepository from "../repositories/participant.repository";
import * as loanRepository from "../repositories/loan.repository";
import { AppError } from "../errors/AppError";
import type { Prisma } from "@loansync/db";
import { db } from "@loansync/db";
import type {
  InviteParticipantInput,
  UpdateParticipantInput,
} from "../validators/participant.schema";
import { generateProjections } from "./projection.service";

export const inviteParticipantService = async (
  loanId: number,
  adminUserId: number,
  data: InviteParticipantInput,
) => {
  const invitedUserId = data.invited_user_id;

  const loan = await loanRepository.getLoanById(loanId);
  if (!loan) throw new AppError("NOT_FOUND", "Loan not found");

  const admin = loan.participants.find((p) => p.user_id === adminUserId);
  if (!admin || admin.role !== "admin") {
    throw new AppError("FORBIDDEN", "Only admin can perform this action");
  }

  if (adminUserId === invitedUserId) {
    throw new AppError("INVALID_REQUEST");
  }

  const existingParticipant =
    await participantRepository.getParticipantByLoanAndUser(
      loanId,
      invitedUserId,
    );
  if (existingParticipant) {
    throw new AppError("CONFLICT", "User is already in the loan");
  }

  const existingInvite = await db.loanInvitation.findUnique({
    where: {
      loan_id_invited_user_id: {
        loan_id: loanId,
        invited_user_id: invitedUserId,
      },
    },
  });
  if (existingInvite) {
    throw new AppError(
      "CONFLICT",
      "An invitation has already been sent to this user for this loan",
    );
  }

  return await participantRepository.createInvitation({
    loan_id: loanId,
    invited_by_user_id: adminUserId,
    invited_user_id: invitedUserId,
    status: "pending",
  });
};

export const getPendingInvitationsService = async (userId: number) => {
  return await participantRepository.getInvitationsByUserId(userId);
};

export const respondToInvitationService = async (
  invitationId: number,
  userId: number,
  status: "accepted" | "rejected",
) => {
  const invite = await participantRepository.getInvitationById(invitationId);
  if (!invite) throw new AppError("NOT_FOUND", "Invitation not found");
  if (invite.invited_user_id !== userId) throw new AppError("FORBIDDEN");
  if (invite.status !== "pending") throw new AppError("INVALID_REQUEST");

  return await participantRepository.respondToInvitation(
    invitationId,
    status,
    userId,
    invite.loan_id,
  );
};

export const getParticipantsService = async (
  loanId: number,
  userId: number,
) => {
  return await participantRepository.getParticipantsByLoan(loanId);
};

export const updateParticipantService = async (
  participantId: number,
  adminUserId: number,
  data: UpdateParticipantInput,
) => {
  return await db.$transaction(async (tx) => {
    const targetParticipant = await tx.loanParticipant.findUniqueOrThrow({
      where: { id: participantId },
      include: { loan: true },
    });

    const loan = targetParticipant.loan;

    const adminParticipant = await tx.loanParticipant.findUnique({
      where: { loan_id_user_id: { loan_id: loan.id, user_id: adminUserId } },
    });

    if (!adminParticipant || adminParticipant.role !== "admin") {
      throw new AppError("FORBIDDEN", "Only admin can perform this action");
    }

    if (
      data.liability_percentage_bps === undefined ||
      data.liability_percentage_bps ===
        targetParticipant.liability_percentage_bps
    ) {
      return await tx.loanParticipant.update({
        where: { id: targetParticipant.id },
        data: {
          role: data.role,
          participant_state: data.participant_state,
        },
      });
    }

    const newTargetBps = data.liability_percentage_bps;
    const deltaBps = newTargetBps - targetParticipant.liability_percentage_bps;
    const newAdminBps = adminParticipant.liability_percentage_bps - deltaBps;

    if (newAdminBps < 0) {
      throw new AppError(
        "INVALID_REQUEST",
        "Admin does not have enough liability share to transfer",
      );
    }

    const targetNewBalance =
      (loan.remaining_balance_in_paise * BigInt(newTargetBps)) / BigInt(10000);
    const adminNewBalance =
      (loan.remaining_balance_in_paise * BigInt(newAdminBps)) / BigInt(10000);

    await tx.loanParticipant.update({
      where: { id: targetParticipant.id },
      data: {
        liability_percentage_bps: newTargetBps,
        remaining_balance_in_paise: targetNewBalance,
        principal_share_in_paise: targetNewBalance,
        role: data.role,
        participant_state: data.participant_state,
      },
    });

    await tx.loanParticipant.update({
      where: { id: adminParticipant.id },
      data: {
        liability_percentage_bps: newAdminBps,
        remaining_balance_in_paise: adminNewBalance,
        principal_share_in_paise: adminNewBalance,
      },
    });

    await tx.loanProjection.deleteMany({
      where: {
        loan_id: loan.id,
        status: "upcoming",
      },
    });

    if (newTargetBps > 0) {
      const targetProjectionsRaw = generateProjections(
        Number(targetNewBalance),
        loan.interest_rate_bps,
        loan.duration_months,
        loan.start_date.toISOString(),
      );

      const finalTargetProjections: Prisma.LoanProjectionCreateManyInput[] =
        targetProjectionsRaw.map((p) => ({
          ...p,
          loan_id: loan.id,
          loan_participant_id: targetParticipant.id,
        }));

      await tx.loanProjection.createMany({ data: finalTargetProjections });
    }

    if (newAdminBps > 0) {
      const adminProjectionsRaw = generateProjections(
        Number(adminNewBalance),
        loan.interest_rate_bps,
        loan.duration_months,
        loan.start_date.toISOString(),
      );

      const finalAdminProjections: Prisma.LoanProjectionCreateManyInput[] =
        adminProjectionsRaw.map((p) => ({
          ...p,
          loan_id: loan.id,
          loan_participant_id: adminParticipant.id,
        }));

      await tx.loanProjection.createMany({ data: finalAdminProjections });
    }

    return await tx.loanParticipant.findUnique({
      where: { id: targetParticipant.id },
    });
  });
};
