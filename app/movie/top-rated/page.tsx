import type { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getByCategory } from "@lib/api";
import { getCachedGenres } from "@lib/redis";

export const metadata: Metadata = {
  title: "Top Rated Movies — PacoMovies",
  description: "Discover top rated movies.",
};

export const dynamic = "force-dynamic";

const TopRatedMovie = async () => {
  const mediaType = "movie";
  const category = "top_rated";

  const movieData = await getByCategory(mediaType, category);
  const genreData = await getCachedGenres(mediaType);

  return (
    <ContentMoviesClient
      data={movieData}
      genres={genreData}
      mediaType={mediaType}
      category={category}
      categoryTitle="Top Rated Movies"
    />
  );
};

export default TopRatedMovie;
