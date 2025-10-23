import axiosInstance from "@/api/axiosInstance";
// Helper to get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // Assuming you store it after login
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get user's watchlist
export const getWatchlist = async () => {
  try {
    const res = await axiosInstance.get(`/watchlist`, {
      headers: getAuthHeaders(),
    });
    console.log("Watchlist API response:", res.data); // debug

    // Make sure we always return an array of stocks
    // if (res.data && Array.isArray(res.data.stocks)) {
    //   return res.data.stocks;
    // }
    // return [];
    return res.data || [];
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    return [];
  }
};

// Add stock to watchlist
export const addToWatchlist = async (stock) => {
    console.log("stock: ");
    console.log(stock);
  try {
    const res = await axiosInstance.post(`/watchlist`, stock, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    throw error;
  }
};

// Remove stock from watchlist
export const removeFromWatchlist = async (symbol) => {
  try {
    const res = await axiosInstance.delete(`/watchlist/${symbol}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    throw error;
  }
};
