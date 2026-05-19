import { NextFunction, Response, Request } from "express";
import { ERROR_CODES } from "../errors/errorCodes";
import { errorResponse } from "../types/api.types";
import { logger } from "../config/logger";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info("NOT_FOUND", {
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });
  const errConfig = ERROR_CODES.NOT_FOUND;
  res
    .status(errConfig.statusCode)
    .json(
      errorResponse("NOT_FOUND", `${errConfig.message}: ${req.originalUrl}`),
    );
};
