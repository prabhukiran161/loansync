import { z } from "zod";

export const createTransactionSchema = z.object({
  amount_in_paise: z
    .number()
    .int()
    .positive("Amount must be a positive integer in paise"),
  transaction_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD"),
  proof_file_url: z.string().url().optional(),
  proof_file_type: z.string().optional(),
  notes: z.string().optional(),
});

export const updateTransactionSchema = z.object({
  amount_in_paise: z.number().int().positive().optional(),
  transaction_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  notes: z.string().optional(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
