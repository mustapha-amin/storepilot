import { NextFunction, Request, Response } from "express";
import { ApiError } from "../shared/errors/api_errors";
import { pinoLogger } from "../utils/logger";
import { ZodError } from "zod";

export function errorHandler(err: ApiError | Error, req: Request, res: Response, next: NextFunction) {
    pinoLogger.error(err);

    if (err instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: err.issues.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message,
                code: issue.code
            }))
        });
    }

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    res.status(err instanceof ApiError ? err.statusCode : 500).json({
        success: false,
        message: err.message ?? "Internal Server Error"
    });
}
