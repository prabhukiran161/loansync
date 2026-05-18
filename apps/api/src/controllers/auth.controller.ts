import { catchAsync } from "../utils/catchAsync";
import { successResponse } from "../types/api.types";
import { registerSchema, loginSchema } from "../validators/auth.schema";
import {
  registerRequestDTO,
  loginRequestDTO,
  authResponseDTO,
  profileResponseDTO,
} from "../dtos/auth.dto";
import * as authService from "../services/auth.service";

export const registerController = catchAsync(async (req, res) => {
  const dto = registerRequestDTO(req);
  const validatedData = registerSchema.parse(dto);
  const { user, token } = await authService.registerService(validatedData);
  res.status(201).json(successResponse(authResponseDTO(user, token)));
});

export const loginController = catchAsync(async (req, res) => {
  const dto = loginRequestDTO(req);
  const validatedData = loginSchema.parse(dto);
  const { user, token } = await authService.loginService(validatedData);
  res.status(200).json(successResponse(authResponseDTO(user, token)));
});

export const getProfileController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const user = await authService.getProfileService(userId);
  res.status(200).json(successResponse(profileResponseDTO(user)));
});
