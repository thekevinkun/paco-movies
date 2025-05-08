import type { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getByCategory } from "@lib/api";
import { getCachedGenres } from "@lib/redis";

export const metadata: Metadata = {
  title: "Popular Movies — PacoMovies",
  description: "Discover popular movies.",
};

export const dynamic = "force-dynamic";

const PopularMovie = async () => {
  const mediaType = "movie";
  const category = "popular";

  const movieData = await getByCategory(mediaType, category);
  const genreData = await getCachedGenres(mediaType);

  return (
    <ContentMoviesClient
      data={movieData}
      genres={genreData}
      mediaType={mediaType}
      category={category}
      categoryTitle="Popular Movies"
    />
  );
};

export default PopularMovie;
