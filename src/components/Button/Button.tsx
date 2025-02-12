"use client";

import { useToast } from "@/hooks/ToastContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import * as favouriteService from "@/services/favouriteService";
import { useRouter } from "next/navigation";

export default function Button({
  children,
  slug,
  name,
  episode,
  favourite = false,
  history = false,
  ...props
}: any) {
  const { data: session } = useSession();
  const { showToast } = useToast();

  const addMovieFavourite = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();

      const username = session?.user?.username;
      if (!username) {
        showToast("Vui lòng đăng nhập!", "error", "top-center");
        return;
      }

      const response = await favouriteService.addMovieFavourite(
        slug,
        name,
        username
      );

      switch (response.status) {
        case 201:
          showToast("Phim đã được thêm vào danh sách yêu thích!", "success");
          break;
        case 409:
          showToast(
            response.data || "Phim đã có trong danh sách yêu thích!",
            "info"
          );
          break;
        default:
          console.error(
            "Lỗi khi thêm vào danh sách yêu thích:",
            response.message
          );
          showToast("Có lỗi xảy ra khi thêm phim!", "error");
          break;
      }
    },
    [name, slug, session?.user?.username]
  );

  const addMovieHistory = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();

      try {
        const username = session?.user?.username;

        await axios.post("/api/danh-sach/lich-su", {
          slug,
          name,
          episode,
          username,
        });
      } catch (error) {
        console.error("Lỗi khi thêm vào danh sách lịch sử.");
      }
    },
    [episode, name, slug, session?.user?.username]
  );

  const handleClick = (e: React.MouseEvent) => {
    if (favourite) {
      addMovieFavourite(e);
    } else if (history) {
      addMovieHistory(e);
    } else {
      console.warn("Không có hành động nào được chỉ định.");
    }
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

export function ButtonChangePage({ slug, last, children }: any) {
  const router = useRouter();
  const { showToast } = useToast();

  const handleChangePage = (newSlug: string) => {
    if (slug === 0) {
      showToast("Đây là tập đầu tiên!", "info");
    } else if (slug === last + 1) {
      showToast("Đây là tập mới nhất!", "info");
    } else {
      showToast("Chuyển tập thành công!", "success");
      router.push(`tap-${newSlug}`);
    }
  };

  return <button onClick={() => handleChangePage(slug)}>{children}</button>;
}
