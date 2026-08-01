import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";
dotenv.config()

export const DATABASE_URL = process.env.DATABASE_URL
export const PORT = process.env.PORT
export const ACCESS_EXPIRES_IN = process.env.ACCESS_EXPIRES_IN as SignOptions["expiresIn"] | undefined
export const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN as SignOptions["expiresIn"] | undefined
export const ACCESS_SECRET = process.env.ACCESS_SECRET || "accessSecret"
export const REFRESH_SECRET = process.env.REFRESH_SECRET || "refreshSecret"