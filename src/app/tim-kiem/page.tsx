"use client";

import { WrapperMovieMain } from "@/components/MovieItem/WrapperMovie/WrapperMovie";
import Pagination from "@/components/Pagination";
import * as searchService from "@/services/searchService";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const pageQuery = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setMovies([]);
    const fetchMovies = async () => {
      const data = await searchService.searchMovies(String(keyword), pageQuery);

      setPagination(data.params.pagination);
      setMovies(data);
    };
    fetchMovies();
  }, [keyword, pageQuery]);

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
