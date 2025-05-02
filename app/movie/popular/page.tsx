import { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getCategory } from "@lib/api";
import { getCachedGenres } from "@lib/cache";

export const metadata: Metadata = {
  title: "Popular Movies — PacoMovies",
  description: "Popular movie collection's page"
};

const PopularMovie = async ({mediaType="movie", category="popular"}) => {
  const movieData = await getCategory(mediaType, category);
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

export default PopularMovie;