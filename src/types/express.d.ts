import { AuthPayload } from "../utils/token_helpers.js";

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}

export {}
