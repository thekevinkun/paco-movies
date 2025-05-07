import type { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getCachedTrending, getCachedGenres } from "@lib/cache";

export const metadata: Metadata = {
  title: "Trending TV Shows — PacoMovies",
  description: "Discover what's trending today TV shows.",
};

export const dynamic = "force-dynamic";

const Tv = async () => {
  const mediaType="tv";
  const category="trending";

  const tvData = await getCachedTrending(mediaType, category);
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

export default Tv;
