import { AuthPayload } from "../utils/token_helpers";

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}

export {}
