import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getCategory } from "@lib/api";
import { getCachedGenres } from "@lib/cache";

export const metadata: Metadata = {
  title: "TV Shows Popular — PacoMovies",
  description: "TV Show popular collection's page"
};

const TvPopular = async ({mediaType="tv", category="popular"}) => {
  const tvData = await getCategory(mediaType, category);
  const genreData = await getCachedGenres(mediaType);
  
  return (
    <ContentMovies 
      data={tvData}
      genre={genreData}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default TvPopular;