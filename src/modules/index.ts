import { Application } from "express";
import authRouter from "./auth/routes";
import storeRouter from "./store/store.route";

export function registerModules(app: Application) {
    app.use("/auth", authRouter);
    app.use("/store", storeRouter);
}
