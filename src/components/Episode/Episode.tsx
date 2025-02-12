"use client";

import classNames from "classnames/bind";

import styles from "./Episode.module.scss";
import { useParams, useRouter } from "next/navigation";

const cx = classNames.bind(styles);

export default function Episode({ episodes, statusMovie }: any) {
  let { tenphim, tapphim } = useParams();
  const episodeSlug =
    typeof tapphim === "string" ? tapphim.split("-")[1] : undefined;
  const router = useRouter();

  const handleEpisodeChange = (newEpisode: string) => {
    router.push(`/phim/${tenphim}/tap-${newEpisode}`);
  };

  if (statusMovie.toLowerCase() === "trailer") {
    return (
      <div className={cx("episodes")}>
        <h2>Tập phim</h2>
        <div>Phim đang được cập nhật...</div>
      </div>
    );
  }

  return (
    <div className={cx("episodes")}>
      <h2>Tập phim</h2>
      <div>
        {episodes.map((item: any, index: number) => (
          <button
            onClick={() => handleEpisodeChange(`${item.slug}`)}
            key={index}
            className={cx(
              "btn-episode",
              episodeSlug === item.slug && "active-episode"
            )}
          >
            <div>{item.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
