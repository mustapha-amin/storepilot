import { Request, Response } from "express";
import { createUserSchema, loginUserSchema } from "./auth.validator";
import { UnauthenticatedError } from "../../shared/errors/api_errors";
import { createUser, loginUser, logoutUser, refreshToken } from "./auth.service";
import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../../shared/interfaces/response";

export async function login(req: Request, res: Response) {
    const inputs = loginUserSchema.parse(req.body);

    const loginResponse = await loginUser(inputs.email, inputs.password);
    return res.status(StatusCodes.OK).json(successResponse("Login sucessful", loginResponse.tokens))
}

export async function register(req: Request, res: Response) {
    const inputs = createUserSchema.parse(req.body);

    const registerResponse = await createUser(inputs.name, inputs.email, inputs.password)
    return res.status(StatusCodes.CREATED).json(successResponse("User created successfully", registerResponse))
}

export async function logout(req: Request, res: Response) {
    if (!req.user) {
        throw new UnauthenticatedError()
    }
    await logoutUser(req.user.sessionId)

    return res.status(StatusCodes.OK).json(successResponse("Logged out successfully"))
}

export async function refresh(req: Request, res: Response) {
    const { refreshToken: currentRefreshToken } = req.body

    if (!currentRefreshToken) {
        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse("Invalid refresh token"))
    }

    const tokens = await refreshToken(currentRefreshToken)
    return res.status(StatusCodes.OK).json(successResponse("Tokens refreshed successfully", tokens))
}
