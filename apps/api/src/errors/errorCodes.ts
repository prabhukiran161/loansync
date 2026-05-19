export const ERROR_CODES = {
  NOT_FOUND: { statusCode: 404, message: "Resource not found" },
  INTERNAL_SERVER_ERROR: { statusCode: 500, message: "Something went wrong" },
  INVALID_REQUEST: { statusCode: 400, message: "Invalid request data" },
  UNAUTHORIZED: { statusCode: 401, message: "Authentication required" },
  FORBIDDEN: { statusCode: 403, message: "Permission denied" },
  CONFLICT: { statusCode: 409, message: "Resource conflict occurred" },
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;
