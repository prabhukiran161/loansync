import { ERROR_CODES, type ErrorCode } from "./errorCodes";

export class AppError extends Error {
  code: ErrorCode;
  statusCode: number;
  isOperational: boolean;
  constructor(code: ErrorCode) {
    const errorConfig = ERROR_CODES[code] || ERROR_CODES.INTERNAL_SERVER_ERROR;
    super(errorConfig.message);
    this.code = code;
    this.statusCode = errorConfig.statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
