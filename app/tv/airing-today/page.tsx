import type { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getByCategory } from "@lib/api";
import { getCachedGenres } from "@lib/cache";

export const metadata: Metadata = {
  title: "TV Shows Airing Today — PacoMovies",
  description: "Discover what's TV shows Airing Today."
};

export const dynamic = "force-dynamic";

const TvAiringToday = async () => {
  const mediaType="tv";
  const category="airing_today";

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

export default TvAiringToday;
