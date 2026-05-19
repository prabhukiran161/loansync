import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { ENV } from "../config/env";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        userName: string;
      };
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new AppError("UNAUTHORIZED", "Authentication token is missing"),
    );
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as {
      userId: number;
      userName: string;
    };
    req.user = decoded;
    next();
  } catch (err) {
    next(
      new AppError("UNAUTHORIZED", "Invalid or expired authentication token"),
    );
  }
};
