import { NextFunction, Response, Request } from "express";
import { ERROR_CODES } from "../errors/errorCodes";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errConfing = ERROR_CODES.NOT_FOUND;
  res.status(errConfing.statusCode).json(errConfing.message);
};
