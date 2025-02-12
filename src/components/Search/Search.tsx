"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import TippyHeadless from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faSearch,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Search.module.scss";
import useDebounce from "@/hooks/useDebounce";
import * as searchService from "@/services/searchService";
import { MovieItemSearch } from "@/components/MovieItem";

const cx = classNames.bind(styles);

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string>("");
  const [movies, setMovies] = useState<any>([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceValue = useDebounce(value, 500);

  const handleClear = useCallback(() => {
    setValue("");
    setMovies([]);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (debounceValue.trim() === "") {
      setMovies([]);
      return;
    }

    const fechApi = async () => {
      setLoading(true);

      try {
        const lstMovie = await searchService.searchMovies(debounceValue, 1);
        setMovies(lstMovie || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fechApi();
  }, [debounceValue]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("search")}>
        <TippyHeadless
          interactive
          placement="bottom-start"
          visible={showResult && Array.isArray(movies.items)}
          onClickOutside={() => setShowResult(false)}
          appendTo="parent"
          render={(attrs) => (
            <div className={cx("search-result")} tabIndex={-1} {...attrs}>
              {movies?.items?.map((movie: any) => (
                <div key={movie._id} className={cx("item-wrapper")}>
                  <MovieItemSearch
                    movie={movie}
                    base_url_image={movies.APP_DOMAIN_CDN_IMAGE}
                    onClick={() => {
                      setShowResult(false);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm kiếm..."
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onFocus={() => setShowResult(true)}
          />
        </TippyHeadless>

        {!!value && !loading && (
          <Tippy content="Xóa">
            <button className={cx("clear")} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </Tippy>
        )}
        {loading && (
          <FontAwesomeIcon icon={faSpinner} className={cx("loading")} />
        )}

        <Link
          className={cx("btn-search")}
          href={`/tim-kiem?keyword=${debounceValue}`}
        >
          <FontAwesomeIcon icon={faSearch} />
        </Link>
      </div>
    </div>
  );
}
