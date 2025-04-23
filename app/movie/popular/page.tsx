import { Metadata } from "next";

import { ContentMovies } from "@sections";

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
    <ContentMovies 
      data={movieData}
      genre={genreData}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default PopularMovie;