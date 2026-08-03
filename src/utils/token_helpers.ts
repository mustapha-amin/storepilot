import jwt from "jsonwebtoken";
import { ACCESS_SECRET, ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN, REFRESH_SECRET } from "../config/env.js";
import { Token } from "../shared/interfaces/tokens.js";
import { InvalidAccessToken } from "../shared/errors/api_errors.js";

export interface AuthPayload {
    userId:string, 
    email:string,
    sessionId:string
}

export function generateTokens(payload: AuthPayload): Token {
    const accessToken = jwt.sign(payload, ACCESS_SECRET, {
        expiresIn: ACCESS_EXPIRES_IN ?? "30m"
    })

    const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
        expiresIn: REFRESH_EXPIRES_IN ?? "30m"
    })

    return {
        accessToken,
        refreshToken
    }
}

export function verifyAccessToken(token: string) {
    try {
        const verified = jwt.verify(token, ACCESS_SECRET) as AuthPayload;
        return verified
    } catch (error) {
        throw new InvalidAccessToken()
    }
}

export function verifyRefreshToken(token: string) {
    try {
        const verified = jwt.verify(token, REFRESH_SECRET) as AuthPayload;
        return verified
    } catch (error) {
        throw new InvalidAccessToken()
    }
}
