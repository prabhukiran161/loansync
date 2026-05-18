import { RegisterInput, LoginInput } from "../validators/auth.schema";
import * as userRepository from "../repositories/user.repository";
import { AppError } from "../errors/AppError";
import { ENV } from "../config/env";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerService = async (data: RegisterInput) => {
  const existingUser = await userRepository.findUserByUserName(data.userName);
  if (existingUser) {
    throw new AppError("USER_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await userRepository.createUser({
    userName: data.userName,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { userId: newUser.id, userName: newUser.userName },
    ENV.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return { user: newUser, token };
};

export const loginService = async (data: LoginInput) => {
  const user = await userRepository.findUserByUserName(data.userName);
  if (!user) {
    throw new AppError("INVALID_CREDENTIALS");
  }

  const isValidPassword = await bcrypt.compare(data.password, user.password);
  if (!isValidPassword) {
    throw new AppError("INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    { userId: user.id, userName: user.userName },
    ENV.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return { user, token };
};

export const getProfileService = async (userId: number) => {
  const user = await userRepository.findUserById(userId);
  if (!user) {
    throw new AppError("USER_NOT_FOUND");
  }
  return user;
};
