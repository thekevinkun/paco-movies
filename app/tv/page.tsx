import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getTrending } from "@api";
import { getCachedGenres } from "@cache";

export const metadata: Metadata = {
  title: "TV Shows — PacoMovies",
  description: "TV Show collection's page"
};

const Tv = async ({mediaType="tv", category="trending"}) => {
  const tvResponse = await getTrending(mediaType);
  const tvData = await tvResponse.json();

  if (!tvResponse.ok)
    throw new Error(tvData.error);

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

export default Tv;
