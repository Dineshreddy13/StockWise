import express from "express"
import { PORT, DB_URI } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleWare from "./middleware/error.middleware.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json())

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);


app.use(errorMiddleWare);

app.listen(PORT, async() => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectToDatabase();
})

export default app;