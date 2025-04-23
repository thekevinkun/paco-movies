import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getCategory, getCachedGenres } from "@server/api";

export const metadata: Metadata = {
  title: "TV Shows Top Rated — PacoMovies",
  description: "TV Show top rated collection's page"
};

const TvTopRated = async ({mediaType="tv", category="top_rated"}) => {
  const tvResponse = await getCategory(mediaType, category);
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

export default TvTopRated;