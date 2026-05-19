import type { Request } from "express";
import type {
  InviteParticipantInput,
  RespondInvitationInput,
  UpdateParticipantInput,
} from "../validators/participant.schema";
import { AppError } from "../errors/AppError";

export const inviteParticipantRequestDTO = (
  req: Request,
): InviteParticipantInput => {
  return {
    invited_user_id: Number(req.body.invitedUserId),
  };
};

export const invitationResponseDTO = (invitation: any) => {
  return {
    id: invitation.id,
    loanId: invitation.loan_id,
    invitedByUserId: invitation.invited_by_user_id,
    invitedUserId: invitation.invited_user_id,
    status: invitation.status,
    createdAt: invitation.created_at,
  };
};

export const getLoanParamsDTO = (req: Request) => {
  const loanId = Number(req.params.loanId);
  if (isNaN(loanId) || loanId <= 0) {
    throw new AppError("INVALID_REQUEST", "Invalid loan ID in the URL");
  }
  return { loanId };
};

export const getInvitationParamsDTO = (req: Request) => {
  const invitationId = Number(req.params.invitationId);
  if (isNaN(invitationId) || invitationId <= 0) {
    throw new AppError("INVALID_REQUEST", "Invalid Invitation ID in the URL");
  }
  return { invitationId };
};

export const getParticipantParamsDTO = (req: Request) => ({
  participantId: Number(req.params.participantId),
});

export const respondInvitationRequestDTO = (
  req: Request,
): RespondInvitationInput => ({
  status: req.body.status,
});

export const updateParticipantRequestDTO = (
  req: Request,
): UpdateParticipantInput => ({
  role: req.body.role,
  participant_state: req.body.participantState,
  liability_percentage_bps: req.body.liabilityPercentageBps
    ? Number(req.body.liabilityPercentageBps)
    : undefined,
});
