import dotenv from "dotenv";
import { envSchema, Env } from "../validators/env.schema";

dotenv.config();

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables");
  console.error(parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const ENV: Env = parsedEnv.data;
