"use client";

import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faHome } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useParams } from "next/navigation";

import styles from "./BreadCrumb.module.scss";

const cx = classNames.bind(styles);

function BreadCrumb({ breadCrumb }: any) {
  const { tapphim } = useParams();

  return (
    <nav className={cx("breadcrumb")}>
      <FontAwesomeIcon icon={faHome} />
      <Link href={`/`} className={cx("item-path")}>
        Trang chủ
      </Link>
      {Array.isArray(breadCrumb) ? (
        breadCrumb.map((item: any, index: number) => (
          <div key={index}>
            <FontAwesomeIcon icon={faAngleRight} />
            <Link
              href={item.slug ? item.slug : tapphim ? "./" : ""}
              className={cx("item-path", item.isCurrent && "item-path-active")}
            >
              {item.name}
            </Link>
          </div>
        ))
      ) : (
        <div>Không có đường dẫn</div>
      )}
    </nav>
  );
}

export default BreadCrumb