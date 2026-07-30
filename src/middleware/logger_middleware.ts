import { NextFunction, Request, Response } from "express";
import { pinoLogger } from "../utils/logger.js";

export function loggerMiddleware(req:Request, res: Response, next: NextFunction) {
    pinoLogger.info({
        method:req.method,
        url:req.originalUrl
    })
    next();
}