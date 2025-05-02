import { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getCachedTrending, getCachedGenres } from "@lib/cache";

export const metadata: Metadata = {
  title: "Movies — PacoMovies",
  description: "Movie collection's page"
};

const Movie = async ({mediaType="movie", category="trending"}) => {
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
