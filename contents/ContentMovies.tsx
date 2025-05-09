"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMenu } from "@contexts/MenuContext";

import { Spinner, MotionDiv } from "@components";

import { IContentMoviesProps, IGetByCategoryResponse } from "@types";

import { dedupeResults } from "@lib/helpers/helpers";
import { parentStaggerVariants } from "@lib/utils/motion";

const CardMovieTop = dynamic(() => import("@components/Card/CardMovieTop"), {
  ssr: false,
  loading: () => <Spinner />,
});
const CardMovie = dynamic(() => import("@components/Card/CardMovie"), {
  ssr: false,
  loading: () => null,
});
const LoadMore = dynamic(() => import("@components/LoadMore"), {
  ssr: false,
  loading: () => null,
});

const ContentMovies = ({
  data,
  genres,
  mediaType,
  category,
  categoryTitle,
}: IContentMoviesProps) => {
  const { handleChangeMediaType, handleChangeCategory } = useMenu();
  const [useData, setUseData] = useState<IGetByCategoryResponse>(data);
  const firstResult = data.firstResult;

  const handleNextPage = (newData: IGetByCategoryResponse) => {
    const oldResults = useData.results;
    const combinedResults = [...oldResults, ...newData.results];
    const uniqueResults = dedupeResults(combinedResults);

    setUseData({
      ...newData,
      results: uniqueResults,
    });
  };

  useEffect(() => {
    handleChangeMediaType(mediaType, genres);
    handleChangeCategory(category ?? "");
  }, []);

  const [columns, setColumns] = useState(4); // Default to desktop (4 columns)

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkSize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setColumns(2); // Mobile
      } else if (width <= 768) {
        setColumns(3); // Tablet
      } else {
        setColumns(4); // Desktop
      }
    };

    checkSize(); // Initial run
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Hero movie shown only on desktop
  const gridMovies = useData?.results.slice(columns <= 3 ? 0 : 1);
  const remainder = gridMovies.length % columns;
  const placeholders = remainder === 0 ? 0 : columns - remainder;

  return (
    <section className="relative mt-20 max-md:mt-12 px-6 max-lg:px-5 max-md:px-3.5">
      <MotionDiv
        variants={parentStaggerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardMovieTop
          id={firstResult?.result.id || undefined!}
          poster={firstResult?.result.poster_path ?? ""}
          backDrop={firstResult?.result.backdrop_path ?? ""}
          title={
            firstResult?.result.title || firstResult?.result.name || "Untitled"
          }
          overview={firstResult?.result.overview ?? ""}
          mediaType={firstResult?.result.media_type || mediaType}
          releaseDate={
            firstResult?.result.release_date ||
            firstResult?.result.first_air_date ||
            ""
          }
          rating={firstResult?.result.vote_average || 0}
          popularity={firstResult?.result.popularity || 0}
          trailer={firstResult?.officialTrailer || null}
        />
      </MotionDiv>

      <h2
        className="hidden max-lg:block w-fit 
          pl-3 mt-7 max-md:mt-10 max-sm:mt-9
          font-semibold text-main text-xl max-sm:text-lg
          border-l-4 border-tale"
      >
        {categoryTitle}
      </h2>

      <MotionDiv
        variants={parentStaggerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-rows-1 pt-7 max-sm:pt-6 pb-12
          grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 
          gap-x-3 gap-y-5 max-md:gap-y-4"
      >
        {gridMovies.map((item) => (
          <CardMovie
            key={item.id}
            id={item.id}
            poster={item.poster_path ?? ""}
            title={item.title || item.name || "Untitled"}
            mediaType={item.media_type || mediaType}
            releaseDate={item?.release_date || item?.first_air_date || ""}
            rating={item?.vote_average ?? 0}
          />
        ))}

        {/* Add placeholders for last blank column */}
        {Array.from({ length: placeholders }).map((_, i) => {
          const fallbackPoster = gridMovies[i % gridMovies.length]?.poster_path;

          return (
            <div
              key={`placeholder-${i}`}
              className="rounded overflow-hidden h-full bg-gray-800 opacity-25 blur-sm"
              style={{
                backgroundImage: fallbackPoster
                  ? `url(https://image.tmdb.org/t/p/w342${fallbackPoster})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          );
        })}
      </MotionDiv>

      {useData?.page < useData?.total_pages && (
        <LoadMore
          page={useData.page}
          mediaType={mediaType}
          category={category ?? ""}
          onNextPage={handleNextPage}
        />
      )}
    </section>
  );
};

export default ContentMovies;
