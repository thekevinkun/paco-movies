import type { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getByCategory } from "@lib/api";
import { getCachedGenres } from "@lib/redis";

export const metadata: Metadata = {
  title: "Top Rated TV Shows — PacoMovies",
  description: "Discover Top Rated of TV shows.",
};

export const dynamic = "force-dynamic";

const TvTopRated = async () => {
  const mediaType = "tv";
  const category = "top_rated";

  const tvData = await getByCategory(mediaType, category);
  const genreData = await getCachedGenres(mediaType);

  return (
    <ContentMoviesClient
      data={tvData}
      genres={genreData}
      mediaType={mediaType}
      category={category}
      categoryTitle="Top Rated TV Shows"
    />
  );
};

export default TvTopRated;
