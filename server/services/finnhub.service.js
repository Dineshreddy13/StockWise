import fetch from "node-fetch";
import { POPULAR_STOCK_SYMBOLS } from "../config/constants.js";
import { getDateRange, validateArticle, formatArticle } from "../utils/helpers.js";
import { FINNHUB_API_KEY, FINNHUB_BASE_URL } from "../config/env.js";
// Generic fetch wrapper
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Fetch failed ${res.status}: ${text}`);
  }
  return await res.json();
}

export async function getNews(symbols = []) {
  try {
    const range = getDateRange(5);
    const token = FINNHUB_API_KEY;
    if (!token) throw new Error("FINNHUB API key not configured");

    const cleanSymbols = symbols.map((s) => s.trim().toUpperCase()).filter(Boolean);
    const maxArticles = 6;

    if (cleanSymbols.length > 0) {
      const perSymbolArticles = {};

      await Promise.all(
        cleanSymbols.map(async (sym) => {
          try {
            const url = `${FINNHUB_BASE_URL}/company-news?symbol=${sym}&from=${range.from}&to=${range.to}&token=${token}`;
            const articles = await fetchJSON(url);
            perSymbolArticles[sym] = (articles || []).filter(validateArticle);
          } catch (err) {
            console.error("Error fetching company news for", sym, err);
            perSymbolArticles[sym] = [];
          }
        })
      );

      const collected = [];
      for (let round = 0; round < maxArticles; round++) {
        for (const sym of cleanSymbols) {
          const list = perSymbolArticles[sym] || [];
          if (list.length === 0) continue;
          const article = list.shift();
          if (!article || !validateArticle(article)) continue;
          collected.push(formatArticle(article, true, sym, round));
          if (collected.length >= maxArticles) break;
        }
        if (collected.length >= maxArticles) break;
      }

      if (collected.length > 0) {
        collected.sort((a, b) => (b.datetime || 0) - (a.datetime || 0));
        return collected.slice(0, maxArticles);
      }
    }

    // Fallback: general market news
    const url = `${FINNHUB_BASE_URL}/news?category=general&token=${token}`;
    const general = await fetchJSON(url);

    const seen = new Set();
    const unique = [];

    for (const art of general || []) {
      if (!validateArticle(art)) continue;
      const key = `${art.id}-${art.url}-${art.headline}`;
      if (seen.has(key)) continue;
      seen.add(key);
      unique.push(art);
      if (unique.length >= 20) break;
    }

    return unique.slice(0, maxArticles).map((a, idx) => formatArticle(a, false, undefined, idx));
  } catch (err) {
    console.error("getNews error:", err);
    throw new Error("Failed to fetch news");
  }
}

export async function searchStocks(query = "") {
  try {
    const token = FINNHUB_API_KEY;
    if (!token) {
      console.error("Missing FINNHUB API key");
      return [];
    }

    const trimmed = query.trim();
    let results = [];

    if (!trimmed) {
      const top = POPULAR_STOCK_SYMBOLS.slice(0, 10);
      const profiles = await Promise.all(
        top.map(async (sym) => {
          try {
            const url = `${FINNHUB_BASE_URL}/stock/profile2?symbol=${sym}&token=${token}`;
            const profile = await fetchJSON(url);
            return { sym, profile };
          } catch {
            return { sym, profile: null };
          }
        })
      );

      results = profiles
        .map(({ sym, profile }) => {
          const name = profile?.name || profile?.ticker;
          const exchange = profile?.exchange || "US";
          if (!name) return null;
          return { symbol: sym, description: name, exchange, type: "Common Stock" };
        })
        .filter(Boolean);
    } else {
      const url = `${FINNHUB_BASE_URL}/search?q=${encodeURIComponent(trimmed)}&token=${token}`;
      const data = await fetchJSON(url);
      results = Array.isArray(data?.result) ? data.result : [];
    }

    return results.slice(0, 15).map((r) => ({
      symbol: (r.symbol || "").toUpperCase(),
      name: r.description || r.symbol,
      exchange: r.exchange || "US",
      type: r.type || "Stock",
      isInWatchlist: false,
    }));
  } catch (err) {
    console.error("Error in stock search:", err);
    return [];
  }
}
