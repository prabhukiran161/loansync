import { z } from "zod";

export const createLoanSchema = z.object({
  loan_name: z
    .string()
    .min(3, "Loan name must be at least 3 characters")
    .max(100)
    .optional(),
  principal_in_paise: z
    .number()
    .int()
    .positive("Principal must be a positive integer in paise"),
  interest_rate_bps: z
    .number()
    .int()
    .nonnegative("Interest rate (bps) cannot be negative"),
  duration_months: z
    .number()
    .int()
    .positive("Duration must be at least 1 month"),
  start_date: z
    .string()
    .regex(/^\\d{4}-\\d{2}-\\d{2}$/, "Start date must be in YYYY-MM-DD format"),
});

export type CreateLoanInput = z.infer<typeof createLoanSchema>;
