import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import autherize from "../middleware/auth.middleware.js";
const userRouter = Router();

// userRouter.get("/", getUsers);
userRouter.get("/:id", autherize, getUser);

userRouter.put("/:id", (req, res) => "update");
userRouter.delete("/:id", (req, res) => "delete");

export default userRouter;


