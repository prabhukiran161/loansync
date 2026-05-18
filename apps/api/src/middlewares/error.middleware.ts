import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { logger } from "../config/logger";
import { errorResponse } from "../types/api.types";
import { AppError } from "../errors/AppError";
import { ENV } from "../config/env";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 1. Handle strict Zod validation errors seamlessly
  if (err instanceof ZodError) {
    const details = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    logger.warn(`Validation Error on ${req.path}`, { details });
    return res
      .status(400)
      .json(errorResponse("INVALID_REQUEST", "Invalid request data", details));
  }

  // 2. Handle expected AppErrors securely
  if (err instanceof AppError) {
    logger.warn(`AppError: ${err.code} - ${err.message}`);
    return res
      .status(err.statusCode)
      .json(errorResponse(err.code, err.message));
  }

  // 3. Handle unexpected system crashes
  logger.error("Unhandled Exception:", err);
  const message =
    ENV.NODE_ENV === "production" ? "Internal Server Error" : err.message;
  return res.status(500).json(errorResponse("INTERNAL_SERVER_ERROR", message));
};
