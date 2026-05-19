import { z } from "zod";

export const inviteParticipantSchema = z.object({
  invited_user_id: z.number().int().positive("User ID must be valid"),
});

export const respondInvitationSchema = z.object({
  status: z.enum(["accepted", "rejected"]),
});

export const updateParticipantSchema = z.object({
  role: z.enum(["admin", "member"]).optional(),
  participant_state: z
    .enum(["active", "overdue", "completed", "defaulted"])
    .optional(),
  liability_percentage_bps: z.number().int().min(0).max(10000).optional(),
});

export type RespondInvitationInput = z.infer<typeof respondInvitationSchema>;
export type UpdateParticipantInput = z.infer<typeof updateParticipantSchema>;
export type InviteParticipantInput = z.infer<typeof inviteParticipantSchema>;
