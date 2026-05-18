import { catchAsync } from "../utils/catchAsync";
import { successResponse } from "../types/api.types";
import { createLoanSchema, updateLoanSchema } from "../validators/loan.schema";
import {
  createLoanRequestDTO,
  getLoanParamsDTO,
  loanResponseDTO,
  updateLoanRequestDTO,
} from "../dtos/loan.dto";
import * as loanService from "../services/loan.service";

export const createLoanController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const dto = createLoanRequestDTO(req);
  const validatedData = createLoanSchema.parse(dto);
  const loan = await loanService.createLoanService(userId, validatedData);
  res.status(201).json(successResponse(loanResponseDTO(loan)));
});

export const getLoanController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const { loanId } = getLoanParamsDTO(req);
  const loan = await loanService.getLoanService(loanId, userId);
  res.status(200).json(successResponse(loanResponseDTO(loan)));
});

export const getAllLoansController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const loans = await loanService.getAllLoansService(userId);
  res.status(200).json(successResponse(loans.map(loanResponseDTO)));
});

export const updateLoanController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const { loanId } = getLoanParamsDTO(req);
  const dto = updateLoanRequestDTO(req);
  const validatedData = updateLoanSchema.parse(dto);
  const loan = await loanService.updateLoanService(
    loanId,
    userId,
    validatedData,
  );
  res.status(200).json(successResponse(loanResponseDTO(loan)));
});

export const deleteLoanController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const { loanId } = getLoanParamsDTO(req);
  const result = await loanService.deleteLoanService(loanId, userId);
  res.status(200).json(successResponse(result));
});
