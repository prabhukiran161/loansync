import { catchAsync } from "../utils/catchAsync";
import { successResponse } from "../types/api.types";
import {
  getLoanParamsDTO,
  getParticipantParamsDTO,
} from "../dtos/participant.dto";
import * as projectionService from "../services/projection.service";

export const getLoanProjectionsController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const { loanId } = getLoanParamsDTO(req);
  const projections = await projectionService.getLoanProjectionsService(
    loanId,
    userId,
  );
  res.status(200).json(successResponse(projections));
});

export const getParticipantProjectionsController = catchAsync(
  async (req, res) => {
    const userId = req.user!.userId;
    const { participantId } = getParticipantParamsDTO(req);
    const projections =
      await projectionService.getParticipantProjectionsService(
        participantId,
        userId,
      );
    res.status(200).json(successResponse(projections));
  },
);
