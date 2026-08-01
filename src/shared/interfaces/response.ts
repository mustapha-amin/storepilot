export function successResponse<T>(message = "", data?: T) {
    return {
        success: true,
        error: null,
        message,
        data
    }
}

export function errorResponse<T>(error: string | null = null) {
    return {
        success: false,
        error,
        message: null,
        data: null
    }
}