import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getCategory } from "@lib/api";
import { getCachedGenres } from "@lib/cache";

export const metadata: Metadata = {
  title: "TV Shows Airing Today — PacoMovies",
  description: "TV Show airing today collection's page"
};

const TvAiringToday = async ({mediaType="tv", category="airing_today"}) => {
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

export default TvAiringToday;
