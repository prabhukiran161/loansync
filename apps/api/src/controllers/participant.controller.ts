import { catchAsync } from "../utils/catchAsync";
import { successResponse } from "../types/api.types";
import {
  inviteParticipantSchema,
  respondInvitationSchema,
  updateParticipantSchema,
} from "../validators/participant.schema";
import {
  inviteParticipantRequestDTO,
  getLoanParamsDTO,
  getInvitationParamsDTO,
  respondInvitationRequestDTO,
  getParticipantParamsDTO,
  updateParticipantRequestDTO,
} from "../dtos/participant.dto";
import * as participantService from "../services/participant.service";

export const inviteParticipantController = catchAsync(async (req, res) => {
  const adminUserId = req.user!.userId;
  const { loanId } = getLoanParamsDTO(req);
  const dto = inviteParticipantRequestDTO(req);
  const validatedData = inviteParticipantSchema.parse(dto);
  const invite = await participantService.inviteParticipantService(
    loanId,
    adminUserId,
    validatedData,
  );
  res.status(201).json(successResponse(invite));
});

export const getInvitationsController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const invites = await participantService.getPendingInvitationsService(userId);
  res.status(200).json(successResponse(invites));
});

export const respondInvitationController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const { invitationId } = getInvitationParamsDTO(req);
  const dto = respondInvitationRequestDTO(req);
  const { status } = respondInvitationSchema.parse(dto);
  const result = await participantService.respondToInvitationService(
    invitationId,
    userId,
    status,
  );
  res.status(200).json(successResponse(result));
});

export const getParticipantsController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const { loanId } = getLoanParamsDTO(req);
  const participants = await participantService.getParticipantsService(
    loanId,
    userId,
  );
  res.status(200).json(successResponse(participants));
});

export const updateParticipantController = catchAsync(async (req, res) => {
  const adminUserId = req.user!.userId;
  const { participantId } = getParticipantParamsDTO(req);
  const dto = updateParticipantRequestDTO(req);
  const data = updateParticipantSchema.parse(dto);
  const result = await participantService.updateParticipantService(
    participantId,
    adminUserId,
    data,
  );
  res.status(200).json(successResponse(result));
});
