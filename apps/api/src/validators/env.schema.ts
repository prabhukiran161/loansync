import z from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "testing"])
    .default("development"),
  PORT: z
    .string()
    .regex(/^\d+$/, "PORT must be a number")
    .transform(Number)
    .default("4000"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  CORS_ORIGIN: z.string().min(1, "CORS_ORIGIN is required").default("*"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),
});

export type Env = z.infer<typeof envSchema>;
