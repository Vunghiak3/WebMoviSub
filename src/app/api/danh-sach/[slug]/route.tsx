import axios from "axios";

export async function GET(
    request: Request,
    {params}: { params: { slug: string } }
) {
    try {
        const slug = params.slug;

        const url = new URL(request.url);
        const page = url.searchParams.get("page") || 1;

        const res = await axios.get(
            `${process.env.API_BASE_URL}/danh-sach/${slug}`,
            {
                params: {page},
            }
        );

        if (res.status !== 200) {
            return new Response("Movie not found!", {status: 404});
        }

        const movies = res.data.data;

        await Promise.all(
            movies.items.map(async (movie: any) => {
                try {
                    const res = await axios.get(
                        `${process.env.API_BASE_URL}/phim/${movie.slug}`
                    );
                    movie.content = res.data.data.item.content;
                } catch (error) {
                    console.error(
                        `Error fetching content for movie ${movie.slug}:`,
                        error
                    );
                    movie.content = null;
                }
            })
        );

        return new Response(JSON.stringify(movies), {
            status: 200,
            headers: {"Content-Type": "application/json"},
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response("Internal Server Error", {status: 500});
    }
}
