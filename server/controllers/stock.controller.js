import { getNews, searchStocks } from "../services/finnhub.service.js";

export async function searchStocksController(req, res, next) {
  try {
    const query = req.query.q || "";
    const results = await searchStocks(query);
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
}

export async function getNewsController(req, res, next) {
  try {
    const symbols = req.query.symbols ? req.query.symbols.split(",") : [];
    const news = await getNews(symbols);
    res.status(200).json(news);
  } catch (err) {
    next(err);
  }
}
