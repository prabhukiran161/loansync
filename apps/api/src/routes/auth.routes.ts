import { Router } from "express";
import {
  registerController,
  loginController,
  getProfileController,
  refreshTokenController,
  logoutController,
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

export const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/profile", authenticate, getProfileController);
authRouter.post("/refresh", refreshTokenController);
authRouter.post("/logout", authenticate, logoutController);
