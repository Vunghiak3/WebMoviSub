import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  try {
    const res = await axios.get(`${process.env.API_BASE_URL}/quoc-gia/${slug}`);

    if (res.status !== 200) {
      return new Response("Failed to fetch data", { status: res.status });
    }

    const data = res.data.data;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching country data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
