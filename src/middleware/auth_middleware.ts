import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError, InvalidAccessToken, ApiError } from "../shared/errors/api_errors.js";
import { verifyAccessToken } from "../utils/token_helpers.js";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
   const authHeader = req.headers.authorization;

   if (!authHeader) {
    throw new UnauthenticatedError();
   }

   if (!authHeader.startsWith("Bearer ")) {
      throw new InvalidAccessToken();
   }

   const token = authHeader.split(" ")[1];

   if (!token) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token");
   }

   const payload = verifyAccessToken(token);

   req.user = payload;
   next();
}
