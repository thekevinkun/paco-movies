import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getCategory, getCachedGenres } from "@server/api";

export const metadata: Metadata = {
  title: "TV Shows Popular — PacoMovies",
  description: "TV Show popular collection's page"
};

const TvPopular = async ({mediaType="tv", category="popular"}) => {
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

export default TvPopular;