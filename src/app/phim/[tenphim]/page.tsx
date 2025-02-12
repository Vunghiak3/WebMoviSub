import classNames from "classnames/bind";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { getServerSession } from "next-auth";

import styles from "./DetailMovie.module.scss";
import * as movieService from "@/services/movieService";
import BreadCrumb from "@/components/BreadCrumb";
import Episode from "@/components/Episode";
import Button from "@/components/Button";
import connectionToDatabase from "@/lib/mongoose";
import FavouriteMovie from "@/models/FavouriteMovie";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const cx = classNames.bind(styles);

export default async function DetailMoviePage({ params }: any) {
  const { tenphim } = params;
  const session = await getServerSession(authOptions);
  const movie = await movieService.getMovieByName(String(tenphim));

  let isFavouriteMovie = false;
  if (session?.user?.id) {
    await connectionToDatabase()

    const result = await FavouriteMovie.findOne({
      slug: tenphim,
      userId: session.user.id,
    });

    isFavouriteMovie = result !== null;
  }

  return (
    <div className={cx("wrapper")}>
      <BreadCrumb breadCrumb={movie.breadCrumb} />

      <div className={cx("info-movie")}>
        <div className={cx("img-movie")}>
          <Image
            src={movie.seoOnPage.seoSchema.image}
            alt={movie.item.name || ""}
            width={600}
            height={800}
            priority
            quality={100}
            sizes="(max-width: 500px) 100vw, (max-width: 750px) 50vw, 33vw"
          />
          <div>
            <Link
              href={`${tenphim}/tap-${movie.item.episodes[0].server_data[0].name}`}
              className={cx("btn-watch")}
              prefetch={true}
            >
              Xem phim
            </Link>
            <Button
              className={cx(
                "btn-favourite",
                isFavouriteMovie && "active-favourite"
              )}
              slug={tenphim}
              name={movie?.item?.name}
              favourite
            >
              <FontAwesomeIcon icon={faHeart} />
            </Button>
          </div>
        </div>
        <div className={cx("content-movie")}>
          <div className={cx("title")}>
            <h1>{movie.item.name}</h1>
          </div>
          <table className={cx("table")}>
            <tbody>
              <tr>
                <th>Trạng thái:</th>
                <td>{movie.item.episode_current}</td>
              </tr>
              <tr>
                <th>Số tập:</th>
                <td>{movie.item.episode_total}</td>
              </tr>
              <tr>
                <th>Năm Phát Hành:</th>
                <td>{movie.item.year}</td>
              </tr>
              <tr>
                <th>Chất Lượng:</th>
                <td>{movie.item.quality}</td>
              </tr>
              <tr>
                <th>Ngôn Ngữ:</th>
                <td>{movie.item.lang}</td>
              </tr>
              <tr>
                <th>Diễn Viên:</th>
                <td>
                  {movie.item.actor.map((actor: string) => actor).join(", ")}
                </td>
              </tr>
              <tr>
                <th>Thể Loại:</th>
                <td>
                  {movie.item.category
                    .map((category: any) => category.name)
                    .join(", ")}
                </td>
              </tr>
              <tr>
                <th>Quốc Gia:</th>
                <td>
                  {movie.item.country
                    .map((country: any) => country.name)
                    .join(", ")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className={cx("description")}>
        <h2>Nội dung phim</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: movie.item.content.replace(
              /<p>(&nbsp;|<br>&nbsp;)<\/p>/g,
              ""
            ),
          }}
        ></div>
      </div>

      <Episode
        episodes={movie.item.episodes[0].server_data}
        statusMovie={movie.item.episode_current}
      />
    </div>
  );
}

export async function generateMetadata({ params }: any) {
  const movieData = await movieService.getMovieByName(String(params.tenphim));

  return {
    title: `MoviSub - ${movieData.item.name}`,
    description: movieData.item.content,
    openGraph: {
      title: movieData.item.name,
      description: movieData.item.content,
      url: movieData.seoOnPage.seoSchema.image,
      images: await generateImageMetadata({ params }),
    },
  };
}

export async function generateImageMetadata({ params, request }: any) {
  const movieData = await movieService.getMovieByName(String(params.tenphim));

  return {
    id: params.slug,
    alt: `Hình ảnh của bộ phim ${movieData.item.name}`,
    src: movieData.seoOnPage.seoSchema.image,
    size: { width: 1200, height: 630 },
    contentType: "image/jpg",
  };
}
