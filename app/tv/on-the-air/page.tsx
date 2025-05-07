import type { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getByCategory } from "@lib/api";
import { getCachedGenres } from "@lib/cache";

export const metadata: Metadata = {
  title: "TV Shows On The Air — PacoMovies",
  description: "Discover what's TV shows On The Air."
};

export const dynamic = "force-dynamic";

const TvOnTheAir = async () => {
  const mediaType="tv";
  const category="on_the_air";

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

export default TvOnTheAir;