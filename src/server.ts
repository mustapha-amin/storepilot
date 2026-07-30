import app from "./app.js";
import { PORT } from "./config/env.js";

app.listen(PORT ?? 3000, () => {
    console.log("Server running at", PORT)
})