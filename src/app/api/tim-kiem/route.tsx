import axios from "axios";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword");
  const page = url.searchParams.get("page") || 1;

  if (!keyword) {
    return new Response("Keyword is required", { status: 400 });
  }

  try {
    const res = await axios.get(`${process.env.API_BASE_URL}/tim-kiem`, {
      params: { keyword, page },
    });

    const lstMovie = res.data.data;

    return new Response(JSON.stringify(lstMovie), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
