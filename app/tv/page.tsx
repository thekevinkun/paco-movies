import { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getCachedTrending, getCachedGenres } from "@lib/cache";

export const metadata: Metadata = {
  title: "TV Shows — PacoMovies",
  description: "TV Show collection's page"
};

const Tv = async ({mediaType="tv", category="trending"}) => {
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
