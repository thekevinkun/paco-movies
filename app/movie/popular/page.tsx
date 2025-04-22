import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getCategory } from "@api";
import { getCachedGenres } from "@cache";

export const metadata: Metadata = {
  title: "Popular Movies — PacoMovies",
  description: "Popular movie collection's page"
};

const PopularMovie = async ({mediaType="movie", category="popular"}) => {
  const movieResponse = await getCategory(mediaType, category);
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

export default PopularMovie;