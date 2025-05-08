import type { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getCachedTrending, getCachedGenres } from "@lib/redis";

export const metadata: Metadata = {
  title: "Trending Movies — PacoMovies",
  description: "Discover what's trending today in movies."
};

export const dynamic = "force-dynamic";

const Movie = async () => {
  const mediaType = "movie";
  const category = "trending";

  const movieData = await getCachedTrending(mediaType, category);
  const genreData = await getCachedGenres(mediaType);
 
  return (
    <ContentMoviesClient 
      data={movieData}
      genre={genreData}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default Movie;
