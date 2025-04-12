import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getTrending, getGenre } from "@api";

export const metadata: Metadata = {
  title: "Movies — PacoMovies",
  description: "Movie collection's page"
};

const Movie = async ({mediaType="movie", category="trending"}) => {
  const movieResponse = await getTrending(mediaType);
  const movieData = await movieResponse.json();

  if (!movieResponse.ok)
    throw new Error(movieData.error);

  const genreResponse = await getGenre(mediaType);
  const genreData = await genreResponse.json();

  if (!genreResponse.ok)
    throw new Error(genreData.error);

  return (
    <ContentMovies 
      data={movieData}
      genre={genreData.genres}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default Movie;
