import express from "express";
import {
  searchStocksController,
  getNewsController,
} from "../controllers/stock.controller.js";

const stockRouter = express.Router();

stockRouter.get("/search", searchStocksController);
stockRouter.get("/news", getNewsController);

export default stockRouter;
