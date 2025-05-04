import { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getByCategory } from "@lib/api";
import { getCachedGenres } from "@lib/cache";

export const metadata: Metadata = {
  title: "Top Rated Movies — PacoMovies",
  description: "Top rated movie collection's page"
};

const TopRatedMovie = async ({mediaType="movie", category="top_rated"}) => {
  const movieData = await getByCategory(mediaType, category);
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

export default TopRatedMovie;