"use client";

import classNames from "classnames/bind";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./Favourite.module.scss";
import { MovieItemSearch } from "@/components/MovieItem";
import * as favouriteService from "@/services/favouriteService";
import { useToast } from "@/hooks/ToastContext";
import Pagination from "@/components/Pagination";

const cx = classNames.bind(styles);

export default function FavoritePage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const pageQuery = Number(searchParams.get("page")) || 1;
  const [movies, setMovies] = useState<any>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (session && session.user.id) {
      const fetchMovieFavourite = async () => {
        const data = await favouriteService.getListMovieFavourite(
          session.user.id,
          pageQuery
        );
        setPagination(data.params.pagination);
        setMovies(data);
      };

      fetchMovieFavourite();
    } else {
      console.log("No session or user found.");
    }
  }, [session, pageQuery]);

  const handleRemove = async (slug: string) => {
    if (session && session.user.id) {
      const userId = session.user.id;

      const response = await favouriteService.removeMovieFavourite(
        userId,
        slug
      );

      switch (response.status) {
        case 200:
          showToast(
            response.data || "Phim đã được thêm vào danh sách yêu thích!",
            "success"
          );
          const updatedMovies = await favouriteService.getListMovieFavourite(
            userId,
            pageQuery
          );
          setMovies(updatedMovies);
          break;
        default:
          console.error(response);
          showToast("Có lỗi khi xóa phim!", "error");
          break;
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <table className={cx("table-movie")}>
        <thead className={cx("header")}>
          <tr>
            <th>Tên</th>
            <th>Năm</th>
            <th>Quốc gia</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={cx("body")}>
          {movies?.items?.map((movie: any) => (
            <tr key={movie._id}>
              <td>
                <MovieItemSearch
                  movie={movie}
                  base_url_image={movies.APP_DOMAIN_CDN_IMAGE}
                />
              </td>
              <td>{movie.year}</td>
              <td>
                {movie.country.map((country: any) => country.name).join(", ")}
              </td>
              <td>
                <button
                  className={cx("btn-remove")}
                  onClick={() => handleRemove(movie.slug)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={pagination?.currentPage || 1}
        pageRanges={pagination?.pageRanges || 5}
        totalItems={pagination?.totalItems || 0}
        totalItemsPerPage={pagination?.totalItemsPerPage || 24}
      />
    </div>
  );
}
