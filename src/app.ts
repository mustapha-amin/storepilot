import express from "express"
import { StatusCodes } from "http-status-codes"
import { successResponse } from "./shared/interfaces/response.js"
import { loggerMiddleware } from "./middleware/logger_middleware.js"

const app = express()

app.use(express.json())
app.use(loggerMiddleware)

app.get("/health", (req, res) => {
    res.status(StatusCodes.OK).json(successResponse("Hello from server", null));
})

export default app