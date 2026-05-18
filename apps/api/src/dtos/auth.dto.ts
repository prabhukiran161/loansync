import type { Request } from "express";
import type {
  RegisterInput,
  LoginInput,
  RefreshInput,
} from "../validators/auth.schema";

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

export const refreshRequestDTO = (req: Request): RefreshInput => {
  const body = req.body || {};
  return {
    refreshToken: body.refreshToken,
  };
};

export const authResponseDTO = (
  user: { id: number; userName: string },
  accessToken: string,
  refreshToken: string,
) => {
  return {
    user: {
      id: user.id,
      userName: user.userName,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
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
