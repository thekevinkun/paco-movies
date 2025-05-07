import type { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getByCategory } from "@lib/api";
import { getCachedGenres } from "@lib/cache";

export const metadata: Metadata = {
  title: "Upcoming Movies — PacoMovies",
  description: "Discover upcoming movies."
};

export const dynamic = "force-dynamic";

const UpcomingMovie = async () => {
  const mediaType = "movie";
  const category = "upcoming";
  
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