"use client";

import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import styles from "./LstTypeMovie.module.scss";
import * as movieService from "@/services/movieService";
import { WrapperMovieMain } from "@/components/MovieItem/WrapperMovie/WrapperMovie";
import Pagination from "@/components/Pagination";

const cx = classNames.bind(styles);

export default function LstTypeMovies({ params }: any) {
  const { loaiphim } = params;
  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [titlePage, setTitlePage] = useState("");

  const searchParams = useSearchParams();
  const pageQuery = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setMovies([]);

    const fetchMovies = async () => {
      const data = await movieService.getListMovieBySlug(
        `${String(loaiphim)}`,
        pageQuery
      );

      setMovies(data);
      setPagination(data.params.pagination);
      setTitlePage(`- Danh Sách ${data.titlePage}`);
    };

    fetchMovies();
  }, [loaiphim, pageQuery]);

  useEffect(() => {
    document.title = `MoviSub ${titlePage}`;
  }, [movies]);

  return (
    <>
      <WrapperMovieMain movies={movies} />

      <Pagination
        currentPage={pagination?.currentPage || 1}
        pageRanges={pagination?.pageRanges || 5}
        totalItems={pagination?.totalItems || 0}
        totalItemsPerPage={pagination?.totalItemsPerPage || 24}
      />
    </>
  );
}
