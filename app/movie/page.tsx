import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getTrending } from "@api";
import { getCachedGenres } from "@cache";

export const metadata: Metadata = {
  title: "Movies — PacoMovies",
  description: "Movie collection's page"
};

const Movie = async ({mediaType="movie", category="trending"}) => {
  const movieResponse = await getTrending(mediaType);
  const movieData = await movieResponse.json();

  if (!movieResponse.ok)
    throw new Error(movieData.error);

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
