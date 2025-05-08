import type { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getByCategory } from "@lib/api";
import { getCachedGenres } from "@lib/redis";

export const metadata: Metadata = {
  title: "Popular TV Shows — PacoMovies",
  description: "Discover Popular TV shows."
};

export const dynamic = "force-dynamic";

const TvPopular = async () => {
  const mediaType="tv";
  const category="popular";

  const tvData = await getByCategory(mediaType, category);
  const genreData = await getCachedGenres(mediaType);
  
  return (
    <ContentMoviesClient 
      data={tvData}
      genres={genreData}
      mediaType={mediaType}
      category={category}
      categoryTitle="Popular TV Shows"
    />
  )
}

export default TvPopular;