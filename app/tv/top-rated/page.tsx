import { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getCategory } from "@lib/api";
import { getCachedGenres } from "@lib/cache";

export const metadata: Metadata = {
  title: "TV Shows Top Rated — PacoMovies",
  description: "TV Show top rated collection's page"
};

const TvTopRated = async ({mediaType="tv", category="top_rated"}) => {
  const tvData = await getCategory(mediaType, category);
  const genreData = await getCachedGenres(mediaType);
  
  return (
    <ContentMoviesClient 
      data={tvData}
      genre={genreData}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default TvTopRated;