import axios from "axios";

export async function searchMovies(keyword: string, page: number = 1) {
  try {
    const res = await axios.get("/api/tim-kiem", {
      params: { keyword, page },
    });

    return res.data;
  } catch (error) {
    console.log("Error searching movies:", error);
    throw error;
  }
}
