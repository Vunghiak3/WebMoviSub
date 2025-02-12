import axios from "axios";

export async function getListMovieFavourite(userId: any, page: number = 1) {
  try {
    const res = await fetch(
      `/api/danh-sach/yeu-thich?userId=${userId}&page=${page}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch search results");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function addMovieFavourite(
  slug: string,
  name: string,
  username: string | undefined
) {
  try {
    const res = await axios.post("/api/danh-sach/yeu-thich", {
      slug,
      name,
      username,
    });

    return res;
  } catch (error: any) {
    return error.response;
  }
}

export async function removeMovieFavourite(
  userId: string | undefined,
  slug: string | undefined
) {
  try {
    const response = await axios.delete("/api/danh-sach/yeu-thich", {
      params: { userId, slug },
    });

    return response
  } catch (error: any) {
    return error;
  }
}
