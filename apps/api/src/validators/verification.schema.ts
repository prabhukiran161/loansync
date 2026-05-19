import { z } from "zod";

export const verifyTransactionSchema = z.object({
  status: z.enum(["verified", "rejected"]),
  remarks: z.string().optional(),
});

export type VerifyTransactionInput = z.infer<typeof verifyTransactionSchema>;
