import type { Request } from "express";
import type { RegisterInput, LoginInput } from "../validators/auth.schema";

export const registerRequestDTO = (req: Request): RegisterInput => {
  const body = req.body || {};
  return {
    userName: body.userName,
    password: body.password,
  };
};

export const loginRequestDTO = (req: Request): LoginInput => {
  const body = req.body || {};
  return {
    userName: body.userName,
    password: body.password,
  };
};

export const authResponseDTO = (
  user: { id: number; userName: string },
  token: string,
) => {
  return {
    user: {
      id: user.id,
      userName: user.userName,
    },
    token,
  };
};

export const profileResponseDTO = (user: {
  id: number;
  userName: string;
  created_at: Date;
}) => {
  return {
    user: {
      id: user.id,
      userName: user.userName,
      joinedAt: user.created_at.toISOString(),
    },
  };
};
