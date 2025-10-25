import { Router } from "express";
import { SignUp,SignIn ,SignOut } from "../controllers/auth.controller.js";
import authorize from "../middleware/auth.middleware.js";
const authRouter = Router();

authRouter.post("/sign-up", SignUp);
authRouter.post("/sign-in", SignIn);
authRouter.delete("/sign-out",authorize, SignOut);

export default authRouter;