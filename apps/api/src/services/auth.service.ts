import {
  RegisterInput,
  LoginInput,
  RefreshInput,
} from "../validators/auth.schema";
import * as userRepository from "../repositories/user.repository";
import { AppError } from "../errors/AppError";
import { ENV } from "../config/env";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerService = async (data: RegisterInput) => {
  const existingUser = await userRepository.findUserByUserName(data.userName);
  if (existingUser) {
    throw new AppError("CONFLICT", "Username already registered");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await userRepository.createUser({
    userName: data.userName,
    password: hashedPassword,
  });

  const tokens = generateTokens(newUser.id, newUser.userName);
  return {
    newUser,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};

export const loginService = async (data: LoginInput) => {
  const user = await userRepository.findUserByUserName(data.userName);
  if (!user) {
    throw new AppError("UNAUTHORIZED", "Invalid username or password");
  }

  const isValidPassword = await bcrypt.compare(data.password, user.password);
  if (!isValidPassword) {
    throw new AppError("UNAUTHORIZED", "Invalid username or password");
  }

  const tokens = generateTokens(user.id, user.userName);
  return {
    user,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
};

export const getProfileService = async (userId: number) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new AppError("NOT_FOUND", "User not found");
  }
  return user;
};

const generateTokens = (userId: number, userName: string) => {
  const accessToken = jwt.sign({ userId, userName }, ENV.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId, userName }, ENV.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

export const refreshTokensService = async (data: RefreshInput) => {
  try {
    const decoded = jwt.verify(data.refreshToken, ENV.JWT_REFRESH_SECRET) as {
      userId: number;
      userName: string;
    };

    const user = await userRepository.findUserById(decoded.userId);
    if (!user) throw new AppError("NOT_FOUND", "User not found");

    const tokens = generateTokens(user.id, user.userName);
    return {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  } catch (err) {
    throw new AppError("UNAUTHORIZED", "Invalid authentication token");
  }
};
