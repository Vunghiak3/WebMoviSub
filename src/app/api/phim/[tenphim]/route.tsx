import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: { tenphim: string } }
) {
  const { tenphim } = params;
  const res = await axios.get(`${process.env.API_BASE_URL}/phim/${tenphim}`);

  if (res.status !== 200) {
    return new Response("Movie not found", { status: 404 });
  }

  const result = res.data.data;

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
