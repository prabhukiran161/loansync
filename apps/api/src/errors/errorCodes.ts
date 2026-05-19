export const ERROR_CODES = {
  NOT_FOUND: { statusCode: 404, message: "Resource not found" },
  INTERNAL_SERVER_ERROR: { statusCode: 500, message: "Something went wrong" },
  INVALID_REQUEST: { statusCode: 400, message: "Invalid request data" },
  INVALID_LIABILITY_DISTRIBUTION: {
    statusCode: 400,
    message: "Admin does not have enough liability share to transfer.",
  },
  UNAUTHORIZED: { statusCode: 401, message: "Authentication required" },
  FORBIDDEN: { statusCode: 403, message: "Permission denied" },
  CONFLICT: { statusCode: 409, message: "Resource conflict occurred" },
  USER_EXISTS: { statusCode: 409, message: "Username already registered" },
  USER_LOAN_EXISTS: { statusCode: 409, message: "User is already in the loan" },
  INVITATION_EXISTS: {
    statusCode: 409,
    message: "An invitation has already been sent to this user for this loan",
  },
  USER_NOT_FOUND: { statusCode: 404, message: "User not found" },
  INVALID_CREDENTIALS: {
    statusCode: 401,
    message: "Invalid username or password",
  },
  LOAN_NOT_FOUND: { statusCode: 404, message: "Loan not found" },
  PARTICIPANT_NOT_FOUND: { statusCode: 404, message: "Participant not found" },
  TRANSACTION_NOT_FOUND: { statusCode: 404, message: "Transaction not found" },
  INVITATION_NOT_FOUND: { statusCode: 404, message: "Invitation not found" },
  NOTIFICATION_NOT_FOUND: {
    statusCode: 404,
    message: "Notification not found",
  },
  ONLY_ADMIN_ALLOWED: {
    statusCode: 403,
    message: "Only admin can perform this action",
  },
  ALREADY_VERIFIED: {
    statusCode: 409,
    message: "Transaction already verified",
  },
  NOT_PENDING: { statusCode: 409, message: "Action requires pending status" },
  INVALID_TOKEN: { statusCode: 401, message: "Invalid authentication token" },
} as const;

export type ErrorCode = keyof typeof ERROR_CODES;
