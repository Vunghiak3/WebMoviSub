import axios from "axios";

export async function GET() {
  try {
    const res = await axios.get(`${process.env.API_BASE_URL}/quoc-gia`);

    if (res.status !== 200) {
      return new Response("Failed to fetch data", { status: res.status });
    }

    const data = res.data.data;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
