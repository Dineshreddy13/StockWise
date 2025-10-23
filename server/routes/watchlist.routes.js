import { Router } from "express";
import { getWatchlist, addToWatchlist, removeFromWatchlist } from "../controllers/watchlist.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const watchlistRouter = Router();

// All routes require authentication
watchlistRouter.use(authMiddleware);

watchlistRouter.get("/", getWatchlist);
watchlistRouter.post("/", addToWatchlist);
watchlistRouter.delete("/:symbol", removeFromWatchlist);

export default watchlistRouter;
