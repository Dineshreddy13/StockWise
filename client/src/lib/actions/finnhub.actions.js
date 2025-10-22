import axiosInstance from "@/api/axiosInstance";

export const searchStocks = async (query) => {
  console.log(query);
  try {
    const res = await axiosInstance.get("/stocks/search", {
      params: { q : query },
    });
    console.log(res.data);
    return res.data || [];
  } catch (error) {
    console.error("Error fetching stocks:", error);
    return [];
  }
};