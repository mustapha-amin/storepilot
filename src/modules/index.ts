import { Application } from "express";
import authRouter from "./auth/routes.js";
import storeRouter from "./store/store.route.js";

export function registerModules(app: Application) {
    app.use("/auth", authRouter);
    app.use("/store", storeRouter);
}