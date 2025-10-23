import express from "express";
import {
  searchStocksController,
  getNewsController,
  getStocksDetailsController, // <-- ADDED getStocksDetailsController
} from "../controllers/stock.controller.js";

const stockRouter = express.Router();

stockRouter.get("/search", searchStocksController);
stockRouter.get("/news", getNewsController);

// NEW ROUTE: Using a route parameter ':symbol' to fetch details for a specific stock
// The final URL will be: /api/v1/stocks/details/AAPL
stockRouter.get("/details/:symbol", getStocksDetailsController); // <-- NEW ROUTE

export default stockRouter;