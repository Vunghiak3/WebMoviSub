import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faHeart,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./WatchMovie.module.scss";
import * as movieService from "@/services/movieService";
import BreadCrumb from "@/components/BreadCrumb";
import Episode from "@/components/Episode";
import { redirect } from "next/navigation";
import { ButtonChangePage } from "@/components/Button/Button";

const cx = classNames.bind(styles);

export default async function WatchMoviePage({ params }: any) {
  const { tenphim, tapphim } = params;
  const movie = await movieService.getMovieByName(tenphim);
  const lastEpisode = movie.item.episodes[0].server_data.length
  const episode = movie.item.episodes[0].server_data.find(
    (ep: any) => tapphim.split("-")[1] === ep.slug
  );

  return (
    <div>
      <BreadCrumb breadCrumb={movie.breadCrumb} />

      <div className={cx("wrapper-movie")}>
        <iframe
          className={cx("movie")}
          src={episode.link_embed}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className={cx("actions-movie")}>
        <ButtonChangePage slug={parseInt(episode.slug) - 1} last={lastEpisode}>
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
          <span>Tập trước</span>
        </ButtonChangePage>
        <ButtonChangePage slug={parseInt(episode.slug) + 1} last={lastEpisode}>
          <span>Tập tiếp theo</span>
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </ButtonChangePage>
        <button>
          <FontAwesomeIcon icon={faHeart} />
          <span>Yêu thích</span>
        </button>
        <button>
          <FontAwesomeIcon icon={faTriangleExclamation} />
          <span>Báo lỗi</span>
        </button>
      </div>

      <Episode
        episodes={movie.item.episodes[0].server_data}
        statusMovie={movie.item.episode_current}
      />
    </div>
  );
}

export async function generateMetadata({ params }: any) {
  const movieData = await movieService.getMovieByName(params.tenphim);

  return {
    title: `MoviSub - ${movieData.item.name} - Tập ${
      params.tapphim.split("-")[1]
    }`,
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
  const movieData = await movieService.getMovieByName(params.tenphim);

  return {
    id: params.slug,
    alt: `Hình ảnh của bộ phim ${movieData.item.name}`,
    src: movieData.seoOnPage.seoSchema.image,
    size: { width: 1200, height: 630 },
    contentType: "image/jpg",
  };
}
