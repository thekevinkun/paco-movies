"use client"

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMenu } from "@contexts/MenuContext";
import { dedupeResults } from "@helpers/helpers";
import { parentStaggerVariants } from "@lib/utils/motion";

import { Spinner, MotionDiv } from "@components";

const CardMovieTop = dynamic(() => import("@components/Card/CardMovieTop"), {
  ssr: false,
  loading: () => <Spinner />
});
const CardMovie = dynamic(() => import("@components/Card/CardMovie"), {
  ssr: false,
  loading: () => null
});
const LoadMore = dynamic(() => import("@components/LoadMore"), {
  ssr: false,
  loading: () => null
});

const ContentMovies = ({ data, genre, mediaType, category }: 
    {data: any, genre?: any, mediaType: string, category: string}) => {

  const { handleChangeMediaType, handleChangeCategory } = useMenu();
  const [useData, setUseData] = useState<any>(data);

  const handleNextPage = (newData: any) => {
    const oldResults = useData.results;
    const combinedResults = [...oldResults, ...newData.results];
    const uniqueResults = dedupeResults(combinedResults);

    setUseData({
      ...newData,
      results: uniqueResults,
    });
  }

  useEffect(() => {
    handleChangeMediaType(mediaType, genre);
    handleChangeCategory(category);
  }, [])

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
    <section className="relative mt-20 max-md:mt-10 px-6 max-lg:px-5 max-md:px-3.5">
      <MotionDiv 
        variants={parentStaggerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardMovieTop 
          id={useData?.results[0].id}
          poster={useData?.results[0].poster_path}
          backDrop={useData?.results[0].backdrop_path}
          title={useData?.results[0].title || useData?.results[0].name}
          overview={useData?.results[0].overview}
          mediaType={useData?.results[0].media_type || mediaType}
          releaseDate={useData?.results[0].release_date || useData?.results[0].first_air_date}
          rating={useData?.results[0].vote_average}
        />
      </MotionDiv>
      
      <MotionDiv 
        variants={parentStaggerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-rows-1 pt-8 pb-12
          grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 
          gap-x-3 gap-y-5 max-md:gap-y-4"
      >
          {gridMovies.map((item: any) => (
            <CardMovie
              key={item.id}
              id={item.id}
              poster={item.poster_path}
              title={item.title || item.name}
              mediaType={item.media_type || mediaType}
              releaseDate={item.release_date || item.first_air_date}
              rating={item.vote_average}
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
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            );
          })}
      </MotionDiv>
      
      {useData?.page < useData?.total_pages &&
        <LoadMore 
          page={useData.page}
          mediaType={mediaType}
          category={category}
          onNextPage={handleNextPage}
        />
      }
    </section>
  )
}

export default ContentMovies;