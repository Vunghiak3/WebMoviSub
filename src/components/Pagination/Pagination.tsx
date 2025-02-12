"use client";

import classNames from "classnames/bind";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

import styles from "./Pagination.module.scss";

const cx = classNames.bind(styles);

const Pagination: FC<Pagination> = ({
  currentPage,
  pageRanges,
  totalItems,
  totalItemsPerPage,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const totalPages = Math.ceil(totalItems / totalItemsPerPage);
  let startPage = currentPage;
  let endPage = currentPage + pageRanges - 1;
  if (endPage > totalPages) {
    startPage = totalPages - pageRanges + 1;
    endPage = totalPages;
  }

  const handleChangePage = (newPage: number) => {
    if (newPage === 0) {
      return;
    } else if (newPage === totalPages) {
      return;
    }

    if (pathname === "/tim-kiem") {
      router.push(`?keyword=${keyword}&page=${newPage}`);
    } else {
      router.push(`?page=${newPage}`);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <button onClick={() => handleChangePage(currentPage - 1)}>
        <FontAwesomeIcon className={cx("icon")} icon={faAngleLeft} />
      </button>

      <div className={cx("main")}>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={index}
            className={cx(startPage + index === currentPage && "active-button")}
            onClick={() => handleChangePage(startPage + index)}
          >
            {startPage + index}
          </button>
        ))}
      </div>

      <button onClick={() => handleChangePage(currentPage + 1)}>
        <FontAwesomeIcon className={cx("icon")} icon={faAngleRight} />
      </button>
    </div>
  );
};

export default Pagination;
