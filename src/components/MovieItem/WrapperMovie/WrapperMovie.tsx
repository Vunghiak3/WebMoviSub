import classNames from "classnames/bind";
import Link from "next/link";

import styles from "./WrapperMovie.module.scss";
import { MovieCard } from "@/components/MovieItem/MovieItem";

const cx = classNames.bind(styles);

export function WrapperMovieMain({ movies, number, ...props }: any) {
  return (
    <div className={cx("movie-container")} {...props}>
      <h1 className={cx("title")}>{movies.titlePage}</h1>
      <ul className={cx("movielist")}>
        {movies.items
          ?.slice(0, number || movies.params.pagination.totalItemPerPage)
          .map((movie: any) => (
            <li key={movie._id}>
              <MovieCard
                movie={movie}
                base_url_image={movies.APP_DOMAIN_CDN_IMAGE}
              />
            </li>
          ))}
      </ul>
      {number && (
        <Link href={"/" + movies.seoOnPage?.og_url} className={cx("btn-more")}>
          Xem thêm...
        </Link>
      )}
    </div>
  );
}
