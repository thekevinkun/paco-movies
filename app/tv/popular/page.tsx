import { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getByCategory } from "@lib/api";
import { getCachedGenres } from "@lib/cache";

export const metadata: Metadata = {
  title: "TV Shows Popular — PacoMovies",
  description: "TV Show popular collection's page"
};

const TvPopular = async ({mediaType="tv", category="popular"}) => {
  const tvData = await getByCategory(mediaType, category);
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

export default TvPopular;