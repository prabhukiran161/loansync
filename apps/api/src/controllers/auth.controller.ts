import { catchAsync } from "../utils/catchAsync";
import { successResponse } from "../types/api.types";
import {
  registerSchema,
  loginSchema,
  refreshSchema,
} from "../validators/auth.schema";
import {
  registerRequestDTO,
  loginRequestDTO,
  authResponseDTO,
  profileResponseDTO,
  refreshRequestDTO,
} from "../dtos/auth.dto";
import * as authService from "../services/auth.service";

export const registerController = catchAsync(async (req, res) => {
  const dto = registerRequestDTO(req);
  const validatedData = registerSchema.parse(dto);
  const { newUser, accessToken, refreshToken } =
    await authService.registerService(validatedData);
  res
    .status(201)
    .json(successResponse(authResponseDTO(newUser, accessToken, refreshToken)));
});

export const loginController = catchAsync(async (req, res) => {
  const dto = loginRequestDTO(req);
  const validatedData = loginSchema.parse(dto);
  const { user, accessToken, refreshToken } =
    await authService.loginService(validatedData);
  res
    .status(200)
    .json(successResponse(authResponseDTO(user, accessToken, refreshToken)));
});

export const getProfileController = catchAsync(async (req, res) => {
  const userId = req.user!.userId;
  const user = await authService.getProfileService(userId);
  res.status(200).json(successResponse(profileResponseDTO(user)));
});

export const refreshTokenController = catchAsync(async (req, res) => {
  const dto = refreshRequestDTO(req);
  const validatedData = refreshSchema.parse(dto);
  const { user, accessToken, refreshToken } =
    await authService.refreshTokensService(validatedData);
  res
    .status(200)
    .json(successResponse(authResponseDTO(user, accessToken, refreshToken)));
});

export const logoutController = catchAsync(async (req, res) => {
  res.status(200).json(
    successResponse({
      message: "Logged out. Please clear tokens on client side.",
    }),
  );
});
