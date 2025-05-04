import { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getByCategory } from "@lib/api";
import { getCachedGenres } from "@lib/cache";

export const metadata: Metadata = {
  title: "Upcoming Movies — PacoMovies",
  description: "Upcoming movie collection's page"
};

const UpcomingMovie = async ({mediaType="movie", category="upcoming"}) => {
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

export default UpcomingMovie;