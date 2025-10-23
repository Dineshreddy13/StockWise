"use client";

import { useEffect, useState, useRef } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import SearchCommand from "@/components/SearchCommand";
import WatchlistButton from "@/components/WatchlistButton";
import { getWatchlist } from "@/lib/actions/watchlist.actions";
import { getStockDetails, searchStocks } from "@/lib/actions/finnhub.actions";

const WATCHLIST_TABLE_HEADER = [
    "Company",
    "Symbol",
    "Price",
    "Change",
    "Market Cap",
    "P/E Ratio",
    "Remove",
];

export default function Watchlist() {
    const [watchlist, setWatchlist] = useState([]);
    const [stockDetails, setStockDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialStocks, setInitialStocks] = useState([]);

    // ✅ A ref to ensure we only run once
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true; // prevents re-runs

        const fetchData = async () => {
            try {
                setLoading(true);

                // 1️⃣ Get user's watchlist
                const list = await getWatchlist();
                if (!Array.isArray(list) || list.length === 0) {
                    setWatchlist([]);
                    setLoading(false);
                    return;
                }

                setWatchlist(list);

                // 2️⃣ Fetch all stock details (rate-limited and parallelized)
                const details = await Promise.allSettled(
                    list.map((item) => getStockDetails(item.symbol))
                );

                // 3️⃣ Only include successful results
                console.log("Stock details received:")
                console.log(details);
                const validDetails = details
                    .filter((d) => d.status === "fulfilled")
                    .map((d) => d.value);

                console.log(validDetails);
                setStockDetails(validDetails);

                // 4️⃣ Load popular stocks for search palette (optional)
                const stocks = await searchStocks("");
                setInitialStocks(stocks);
            } catch (err) {
                console.error("Error loading watchlist:", err);
                toast.error("Failed to load watchlist");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // 🗑️ Handle local remove
    const handleRemove = (symbol) => {
        setWatchlist((prev) => prev.filter((s) => s.symbol !== symbol));
        setStockDetails((prev) => prev.filter((s) => s.symbol !== symbol));
    };

    // ⚙️ Empty state
    if (!loading && watchlist.length === 0) {
        return (
            <section className="flex watchlist-empty-container">
                <div className="watchlist-empty">
                    <Star className="watchlist-star" />
                    <h2 className="empty-title">Your watchlist is empty</h2>
                    <p className="empty-description">
                        Start building your watchlist by searching for stocks and clicking the star icon to add them.
                    </p>
                </div>
                <SearchCommand initialStocks={initialStocks} />
            </section>
        );
    }

    return (
       <section className="watchlist max-w-[85vw] mx-auto mt-10">
  <div className="flex flex-col lg:flex-row gap-6">
    {/* Table Section */}
    <div className="flex-1 lg:max-w-[75%]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="watchlist-title">Watchlist</h2>
        <SearchCommand initialStocks={initialStocks} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[60vh] text-gray-400">
          Loading your watchlist...
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <Table>
            <TableHeader>
              <TableRow>
                {WATCHLIST_TABLE_HEADER.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockDetails.map((stock, i) => (
                <TableRow key={i}>
                  <TableCell>{stock.company || "—"}</TableCell>
                  <TableCell>{stock.symbol}</TableCell>
                  <TableCell>{stock.priceFormatted || `\$${stock.currentPrice?.toFixed(2)}` || "—"}</TableCell>
                  <TableCell
                    className={stock.changePercent >= 0 ? "text-green-500" : "text-red-500"}
                  >
                    {stock.changeFormatted || `${stock.changePercent?.toFixed(2)}%` || "—"}
                  </TableCell>
                  <TableCell>{stock.marketCapFormatted || "—"}</TableCell>
                  <TableCell>{stock.peRatio || "—"}</TableCell>
                  <TableCell>
                    <WatchlistButton
                      symbol={stock.symbol}
                      company={stock.company}
                      isInWatchlist={true}
                      onWatchlistChange={(_, added) => {
                        if (!added) handleRemove(stock.symbol);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>

    {/* News Section */}
    <div className="flex-1 lg:max-w-[25%]">
      <h3 className="text-xl font-semibold mb-4">News</h3>
      <div className="space-y-4 max-h-[80%] overflow-y-auto">
        {/* Example news card */}
        <div className="border rounded-lg p-4 shadow-sm bg-neutral-900">
          <h4 className="font-semibold">TSLA</h4>
          <p className="text-gray-400">Tesla profits plunge despite selling more vehicles...</p>
          <a
            href="#"
            className="text-blue-500 hover:underline mt-2 block"
            target="_blank"
            rel="noreferrer"
          >
            Read more
          </a>
        </div>
        <div className="border rounded-lg p-4 shadow-sm bg-neutral-900">
          <h4 className="font-semibold">TSLA</h4>
          <p className="text-gray-400">Tesla profits plunge despite selling more vehicles...</p>
          <a
            href="#"
            className="text-blue-500 hover:underline mt-2 block"
            target="_blank"
            rel="noreferrer"
          >
            Read more
          </a>
        </div>
        <div className="border rounded-lg p-4 shadow-sm bg-neutral-900">
          <h4 className="font-semibold">TSLA</h4>
          <p className="text-gray-400">Tesla profits plunge despite selling more vehicles...</p>
          <a
            href="#"
            className="text-blue-500 hover:underline mt-2 block"
            target="_blank"
            rel="noreferrer"
          >
            Read more
          </a>
        </div>
        <div className="border rounded-lg p-4 shadow-sm bg-neutral-900">
          <h4 className="font-semibold">TSLA</h4>
          <p className="text-gray-400">Tesla profits plunge despite selling more vehicles...</p>
          <a
            href="#"
            className="text-blue-500 hover:underline mt-2 block"
            target="_blank"
            rel="noreferrer"
          >
            Read more
          </a>
        </div>
        <div className="border rounded-lg p-4 shadow-sm bg-neutral-900">
          <h4 className="font-semibold">TSLA</h4>
          <p className="text-gray-400">Tesla profits plunge despite selling more vehicles...</p>
          <a
            href="#"
            className="text-blue-500 hover:underline mt-2 block"
            target="_blank"
            rel="noreferrer"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

    );
}
