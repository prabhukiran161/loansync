import { catchAsync } from "../utils/catchAsync";
import { successResponse } from "../types/api.types";
import * as verificationService from "../services/verification.service";
import { verifyTransactionSchema } from "../validators/verification.schema";
import {
  verifyTransactionRequestDTO,
  getTransactionParamsDTO,
} from "../dtos/transaction.dto";

export const verifyTransactionController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const { transactionId } = getTransactionParamsDTO(req);
  const dto = verifyTransactionRequestDTO(req);
  const data = verifyTransactionSchema.parse(dto);

  const result = await verificationService.verifyTransactionService(
    transactionId,
    userId,
    data,
  );
  res.status(200).json(successResponse(result));
});

export const getTransactionVerificationsController = catchAsync(
  async (req, res) => {
    const userId = req.user!.userId;
    const { transactionId } = getTransactionParamsDTO(req);

    const verifications =
      await verificationService.getTransactionVerificationsService(
        transactionId,
        userId,
      );
    res.status(200).json(successResponse(verifications));
  },
);
