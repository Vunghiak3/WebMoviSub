import axios from "axios";

export async function GET() {
  try {
    const res = await axios.get(`${process.env.API_BASE_URL}/the-loai`);

    const data = res.data.data;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
