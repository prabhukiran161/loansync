import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  getInvitationsController,
  respondInvitationController,
  updateParticipantController,
} from "../controllers/participant.controller";

export const participantRoutes = Router();
export const invitationRoutes = Router();

participantRoutes.use(authenticate);
invitationRoutes.use(authenticate);

participantRoutes.patch("/:participantId", updateParticipantController);

invitationRoutes.get("/", getInvitationsController);
invitationRoutes.patch("/:invitationId/respond", respondInvitationController);
