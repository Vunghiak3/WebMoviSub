import connectionToDatabase from "@/lib/mongoose";
import FavouriteMovie from "@/models/FavouriteMovie";
import User from "@/models/User";
import axios from "axios";

export async function POST(request: Request) {
  try {
    await connectionToDatabase();

    const { slug, name, username } = await request.json();

    const user = await User.findOne({ username });

    if (!user) {
      return new Response("Không tìm thấy người dùng!", { status: 404 });
    }

    const existingFavourite = await FavouriteMovie.findOne({
      slug,
      userId: user._id,
    });

    if (existingFavourite) {
      return Response.json("Phim này đã có trong danh sách yêu thích", {
        status: 409,
      });
    }

    const newFavourite = new FavouriteMovie({
      slug,
      name,
      userId: user._id,
    });

    await newFavourite.save();

    return Response.json(newFavourite, { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Server error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    await connectionToDatabase();

    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return new Response("User ID not provided", { status: 400 });
    }

    const listFavouriteMovie = await FavouriteMovie.find({ userId });

    const movieDetails = await Promise.all(
      listFavouriteMovie.map(async (fMovie) => {
        try {
          const res = await axios.get(
            `${process.env.API_BASE_URL}/phim/${fMovie.slug}`
          );
          return res.data.data.item;
        } catch (error) {
          console.error("Error fetching movie details:", error);
          return null;
        }
      })
    );

    const data = {
      seoOnPage: {
        titleHead:
          "Phim Mới | Phim hay | Xem phim nhanh | Xem phim online | Phim mới vietsub hay nhất",
        descriptionHead:
          "Xem phim mới miễn phí nhanh chất lượng cao. Xem Phim online Việt Sub, Thuyết minh, lồng tiếng chất lượng HD. Xem phim nhanh online chất lượng cao",
      },
      breadCrumb: [],
      titlePage: "Yêu thích",
      items: movieDetails,
      params: {
        type_slug: "danh-sach",
        pagination: {
          totalItems: movieDetails.length,
          totalItemsPerPage: 5,
          currentPage: 1,
          pageRanges: 5,
        },
      },
      APP_DOMAIN_CDN_IMAGE: "https://img.ophim.live",
    };

    return Response.json(data, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request: Request) {
  try {
    await connectionToDatabase();

    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const slug = url.searchParams.get("slug");

    if (!userId || !slug) {
      return new Response("User ID and slug are required", { status: 400 });
    }

    const existingFavourite = await FavouriteMovie.findOneAndDelete({
      slug,
      userId,
    });

    if (!existingFavourite) {
      return new Response("Không tìm thấy phim!", { status: 404 });
    }

    return new Response("Xóa phim thành công!", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Server error", { status: 500 });
  }
}
