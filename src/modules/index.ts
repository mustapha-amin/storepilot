import { Application } from "express";
import authRouter from "./auth/routes";

export function registerModules(app: Application) {
    app.use("/auth", authRouter);
}