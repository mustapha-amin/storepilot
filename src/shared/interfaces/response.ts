export function successResponse<T>(message = "", data?: T) {
    return {
        success: true,
        error: null,
        message,
        data
    }
}

export function paginatedResponse<T>(message = "", data: T[], pagination: { page: number; limit: number; total: number }) {
    return {
        success: true,
        error: null,
        message,
        data,
        pagination: {
            ...pagination,
            totalPages: Math.ceil(pagination.total / pagination.limit),
        }
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