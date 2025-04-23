import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getCachedTrending, getCachedGenres } from "@lib/cache";

export const metadata: Metadata = {
  title: "Movies — PacoMovies",
  description: "Movie collection's page"
};

const Movie = async ({mediaType="movie", category="trending"}) => {
  const movieData = await getCachedTrending(mediaType, category);
  const genreData = await getCachedGenres(mediaType);
 
  return (
    <ContentMovies 
      data={movieData}
      genre={genreData}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default Movie;
