"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBars,
  faClose,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import TippyHeadless from "@tippyjs/react/headless";

import styles from "./header.module.scss";
import Search from "@/components/Search/Search";
import images from "@/assets/imgs";
import { routes } from "@/routes";

const cx = classNames.bind(styles);

function AuthButton() {
  const { data: session } = useSession();

  return session ? (
    <TippyHeadless
      interactive
      placement="bottom-start"
      render={(attrs) => (
        <div className={cx("detail-menu-user")} tabIndex={-1} {...attrs}>
          <Link className={cx("menu-item-user")} href={routes.profile}>
            Tài khoản
          </Link>
          <Link
            className={cx("menu-item-user")}
            href={`${routes.danhsach}/${routes.yeuthich}`}
          >
            Phim yêu thích
          </Link>
          <Link
            className={cx("menu-item-user")}
            href={`${routes.danhsach}/${routes.lichsu}`}
          >
            Lịch sử xem
          </Link>
          <button className={cx("btn-login")} onClick={() => signOut()}>
            <span>Đăng xuất</span>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </div>
      )}
    >
      <div className={cx("wrapper-user")}>
        <Image
          src={session?.user?.image || images.user.src.src}
          alt="Image User"
          width={30}
          height={30}
        />
        <p className={cx("name-user")}>{session?.user?.name}</p>
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
    </TippyHeadless>
  ) : (
    <Link className={cx("btn-login")} href={routes.dangnhap}>
      Đăng nhập
    </Link>
  );
}

const MenuLinks = () => {
  const pathname = usePathname();
  const links = [
    { href: routes.trangchu, label: "Trang chủ" },
    { href: `${routes.danhsach}/${routes.phimbo}`, label: "Phim bộ" },
    { href: `${routes.danhsach}/${routes.phimle}`, label: "Phim lẻ" },
    { href: `${routes.danhsach}/${routes.tvshows}`, label: "TV Shows" },
    { href: `${routes.danhsach}/${routes.hoathinh}`, label: "Hoạt hình" },
    { href: `${routes.danhsach}/${routes.phimsapchieu}`, label: "Sắp chiếu" },
  ];
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cx("menu-item", pathname === link.href && "active-menu")}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowMenu(window.innerWidth <= 750);
      if (window.innerWidth > 750) {
        setActiveMenu(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleActiveMenu = () => {
    setActiveMenu(!activeMenu);
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("header")}>
          <div className={cx("logo")}>
            <Link href={routes.trangchu}>
              <Image
                src={images.imgLogo.src}
                alt={images.imgLogo.alt}
                priority
              />
            </Link>
          </div>

          <Search />

          <div className={cx("actions")}>
            <AuthButton />
            {showMenu && (
              <FontAwesomeIcon
                icon={faBars}
                className={cx("icon-menu")}
                onClick={handleActiveMenu}
              />
            )}
          </div>
        </div>

        {showMenu && (
          <>
            <div className={cx("menu-responsive", activeMenu && "active-menu")}>
              <div className={cx("header-responsive")}>
                <h2>MoviSubs</h2>
                <FontAwesomeIcon
                  icon={faClose}
                  className={cx("btn-close-responsive")}
                  onClick={handleActiveMenu}
                />
              </div>
              <div className={cx("navbar-responsive")}>
                <MenuLinks />
              </div>
            </div>
            <div
              onClick={handleActiveMenu}
              className={cx("bg-menu-responsive", activeMenu && "active-menu")}
            ></div>
          </>
        )}

        {!showMenu && (
          <div className={cx("nav-menu")}>
            <MenuLinks />
          </div>
        )}
      </div>
    </header>
  );
}

export default memo(Header);
