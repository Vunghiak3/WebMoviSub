import axios from "axios";

// export async function getListMovieBySlug(slug: string, page: number = 1) {
//     try {
//         const isServer = typeof window === "undefined";
//         const baseUrl = isServer
//             ? process.env.NEXTAUTH_URL || "http://localhost:3000"
//             : "";

//         const res = await axios.get(`${baseUrl}/api/danh-sach/${slug}`, {
//             params: {page},
//             headers: {"Cache-Control": "no-store"},
//         });

//         return res.data;
//     } catch (error) {
//         console.error("Error fetching list by slug:", error);
//         throw error;
//     }
// }

export async function getMovieByName(slug: string) {
    try {
        const isServer = typeof window === "undefined";
        const baseUrl = isServer
            ? process.env.NEXTAUTH_URL || "http://localhost:3000"
            : "";

        const res = await axios.get(`${baseUrl}/api/phim/${slug}`);

        return res.data;
    } catch (error) {
        console.error("Error fetching movie by name:", error);
        throw error;
    }
}
