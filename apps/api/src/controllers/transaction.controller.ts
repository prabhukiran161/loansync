import { catchAsync } from "../utils/catchAsync";
import { successResponse } from "../types/api.types";
import * as transactionService from "../services/transaction.service";
import {
  createTransactionSchema,
  updateTransactionSchema,
} from "../validators/transaction.schema";
import {
  createTransactionRequestDTO,
  updateTransactionRequestDTO,
  getTransactionParamsDTO,
} from "../dtos/transaction.dto";
import { getLoanParamsDTO } from "../dtos/participant.dto";

export const createTransactionController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const { loanId } = getLoanParamsDTO(req);
  const dto = createTransactionRequestDTO(req);
  const data = createTransactionSchema.parse(dto);
  const result = await transactionService.createTransactionService(
    loanId,
    userId,
    data,
  );
  res.status(201).json(successResponse(result));
});

export const getLoanTransactionsController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const { loanId } = getLoanParamsDTO(req);
  const transactions = await transactionService.getLoanTransactionsService(
    loanId,
    userId,
  );
  res.status(200).json(successResponse(transactions));
});

export const getTransactionController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const { transactionId } = getTransactionParamsDTO(req);
  const transaction = await transactionService.getTransactionService(
    transactionId,
    userId,
  );
  res.status(200).json(successResponse(transaction));
});

export const updateTransactionController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const { transactionId } = getTransactionParamsDTO(req);
  const dto = updateTransactionRequestDTO(req);
  const data = updateTransactionSchema.parse(dto);

  const result = await transactionService.updateTransactionService(
    transactionId,
    userId,
    data,
  );
  res.status(200).json(successResponse(result));
});

export const deleteTransactionController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const { transactionId } = getTransactionParamsDTO(req);
  const result = await transactionService.deleteTransactionService(
    transactionId,
    userId,
  );
  res.status(200).json(successResponse(result));
});
