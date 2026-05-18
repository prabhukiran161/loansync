import { Router } from "express";
import {
  registerController,
  loginController,
  getProfileController,
} from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/profile", authenticate, getProfileController);

export { authRouter };
