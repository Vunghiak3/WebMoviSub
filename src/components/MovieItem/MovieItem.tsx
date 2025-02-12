"use client";

import Link from "next/link";
import classNames from "classnames/bind";
import TippyHeadless from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import styles from "./MovieItem.module.scss";
import { routes } from "@/routes";

const cx = classNames.bind(styles);

export function MovieItemSearch({ movie, base_url_image, ...props }: any) {
  return (
    <Link
      className={cx("movie-result")}
      href={`${routes.phim}/${movie.slug}`}
      {...props}
    >
      <div className={cx("img-movie")}>
        <Image
          src={`${base_url_image}/uploads/movies/${movie.thumb_url}`}
          alt={movie.name}
          width={100}
          height={150}
          priority
        />
      </div>
      <div className={cx("title-movie")}>
        <p className={cx("name-movie")}>{movie.name}</p>
        <p className={cx("des-movie")}>
          {movie.episode_current + " - " + movie.quality}
        </p>
      </div>
    </Link>
  );
}

export function MovieCard({ movie, base_url_image, ...props }: any) {
  return (
    <TippyHeadless
      interactive={false}
      placement="right"
      render={(attrs) => (
        <div className={cx("detail-wrapper")} tabIndex={-1} {...attrs}>
          <div className={cx("detail-infor")}>
            <h1 className={cx("title-name")}>{movie.name}</h1>
            <div className={cx("infor-more")}>
              <div className={cx("quality")}>{movie.quality}</div>
              <div className={cx("time")}>{movie.time}</div>
              <div className={cx("create")}>
                {movie.created?.time.split("-")[0]}
              </div>
            </div>
            <div
              className={cx("content")}
              dangerouslySetInnerHTML={{ __html: movie.content }}
            ></div>
            <div className={cx("category")}>
              {movie.category?.map((item: any) => item.name).join(", ")}
            </div>
            <div className={cx("country")}>
              {movie.country?.map((item: any) => item.name).join(", ")}
            </div>
          </div>
        </div>
      )}
    >
      <Link
        className={cx("link-movie")}
        href={`${routes.phim}/${movie.slug}`}
        {...props}
      >
        <div className={cx("movie-inner")}>
          <div className={cx("img-movie")}>
            <div>
              <Image
                src={`${base_url_image}/uploads/movies/${movie.thumb_url}`}
                alt={movie.name}
                width={600}
                height={800}
                priority={false}
                quality={100}
                sizes="(max-width: 500px) 100vw, (max-width: 750px) 50vw, 33vw"
              />
              <FontAwesomeIcon
                className={cx("icon-caret")}
                icon={faCaretRight}
              />
              <p className={cx("episode-current")}>
                {movie?.episode_current?.toLowerCase().includes("hoàn tất")
                  ? "Hoàn tất"
                  : movie?.episode_current}
              </p>
            </div>
          </div>
          <div className={cx("name-movie")}>
            <p>{movie.name}</p>
          </div>
        </div>
      </Link>
    </TippyHeadless>
  );
}
