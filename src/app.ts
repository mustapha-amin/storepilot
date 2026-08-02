import express from "express"
import { StatusCodes } from "http-status-codes"
import { successResponse } from "./shared/interfaces/response.js"
import { loggerMiddleware } from "./middleware/logger_middleware.js"
import { errorHandler } from "./middleware/error_handler.js"
import { registerModules } from "./modules/index.js"
import { getSwaggerHtml, openApiSpec } from "./docs/openapi.js"

const app = express()

app.use(express.json())
app.use(loggerMiddleware)
registerModules(app)

app.get("/docs/openapi.json", (_, res) => {
    res.json(openApiSpec)
})

app.get("/docs", (_, res) => {
    res.type("html").send(getSwaggerHtml())
})

app.get("/health", (_, res) => {
    res.status(StatusCodes.OK).json(successResponse("Hello from server", null));
})

app.use((_, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.use(errorHandler)

export default app
