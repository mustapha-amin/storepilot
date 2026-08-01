import { Router } from "express";
import { login, logout, refresh, register } from "./auth.controller";
import { authMiddleware } from "../../middleware/auth_middleware";

const authRouter = Router()

authRouter.post("/login", login)
authRouter.post("/register", register)
authRouter.post("/logout", authMiddleware, logout)
authRouter.post("/refresh", refresh)

export default authRouter