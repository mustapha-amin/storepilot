import { prisma } from "../../shared/db/prisma";
import { InvalidAccessToken, InvalidCredentialError } from "../../shared/errors/api_errors";
import bcrypt from "bcrypt";
import { addDays } from "../../utils/date_helper";
import { generateTokens, verifyRefreshToken } from "../../utils/token_helpers";

export async function createUser(name: string, email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (user) {
        throw new InvalidCredentialError()
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const createdUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        },
        omit: {
            password: true
        }
    })

    return createdUser
}

export async function loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        throw new InvalidCredentialError()
    }

    const matched = await bcrypt.compare(password, user.password)

    if (!matched) {
        throw new InvalidCredentialError()
    }

    const session = await prisma.session.create({
        data: {
            refreshToken: "",
            expiresAt: addDays(30),
            userId: user.id
        }
    })

    const tokens = generateTokens({
        userId: user.id,
        email: user.email,
        sessionId: session.id
    })

    await prisma.session.update({
        where: {
            id: session.id
        },
        data: {
            refreshToken: tokens.refreshToken
        }
    })

    return {
        user,
        tokens
    }
}

export async function refreshToken(refreshToken:string) {
    const payload = verifyRefreshToken(refreshToken);
    const session = await prisma.session.findUnique({
        where: {
            id: payload.sessionId
        }
    })

    if(!session) {
        throw new InvalidAccessToken()
    }

    const tokens = generateTokens({
        userId: payload.userId,
        email: payload.email,
        sessionId: payload.sessionId
    })

    await prisma.session.update({
        where: {
            id: payload.sessionId
        },
        data: {
            refreshToken:tokens.refreshToken
        }
    })

    return tokens
}

export async function logoutUser(sessionId: string) {
    await prisma.session.delete({
        where: {
            id: sessionId
        }
    })
}