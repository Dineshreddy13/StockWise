import express from "express";
import { PORT } from "./config/env.js";

const app = express();

app.get("/", (req, res) => {
    res.send({"message": "hello world"});
})

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
})

export default app;