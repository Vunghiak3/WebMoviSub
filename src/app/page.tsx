import * as movieService from "@/services/movieService";
import {WrapperMovieMain} from "@/components/MovieItem/WrapperMovie/WrapperMovie";
import {Suspense} from "react";

export default async function Home() {
    // const newMovies = await movieService.getListMovieBySlug(
    //     "phim-moi-cap-nhat",
    //     1
    // );
    // const trailerMovies = await movieService.getListMovieBySlug(
    //     "phim-sap-chieu",
    //     1
    // );

    // const numberItemMovie = 10;

    return (
        <div>
            {/* <Suspense
                fallback={
                    <div style={{margin: 10}}>Đang tải phim mới cập nhật...</div>
                }
            >
                <WrapperMovieMain movies={newMovies} number={numberItemMovie}/>
            </Suspense>

            <Suspense
                fallback={<div style={{margin: 10}}>Đang tải phim sắp chiếu...</div>}
            >
                <WrapperMovieMain movies={trailerMovies} number={numberItemMovie}/>
            </Suspense> */}
        </div>
    );
}
