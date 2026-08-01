import { StatusCodes } from "http-status-codes";

class ApiError extends Error {
    message: string;

    constructor(
        public statusCode: number,
        message: string,
    ) {
        super(message);
        this.message = message;
    }
}

class InvalidCredentialError extends ApiError {
    constructor() {
        super(StatusCodes.BAD_REQUEST, "Invalid credentials. Please check your email or password and try again");
    }
}

class UnauthenticatedError extends ApiError {
    constructor() {
        super(StatusCodes.UNAUTHORIZED, "Missing authorization header");
    }
}

class InvalidAccessToken extends ApiError {
    constructor() {
        super(StatusCodes.UNAUTHORIZED, "Invalid or expired token");
    }
}

class NotFoundError extends ApiError {
    constructor(message: string) {
        super(StatusCodes.NOT_FOUND, message || "Not found");
    }
}

class InsufficientPermissions extends ApiError {
    constructor() {
        super(StatusCodes.FORBIDDEN, "Insufficient permission");
    }
}

class ConflictError extends ApiError {
       constructor(message?: string) {
        super(StatusCodes.CONFLICT, message || "Conflict issue");
    }
}

export {
    ApiError,
    InvalidCredentialError,
    UnauthenticatedError,
    InvalidAccessToken,
    NotFoundError,
    InsufficientPermissions,
    ConflictError,
}
