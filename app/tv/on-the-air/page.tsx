import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getCategory, getGenre } from "@api";

export const metadata: Metadata = {
  title: "TV Shows On The Air — PacoMovies",
  description: "TV show on the air collection's page"
};

const TvOnTheAir = async ({mediaType="tv", category="on_the_air"}) => {
  const tvResponse = await getCategory(mediaType, category);
  const tvData = await tvResponse.json();

  if (!tvResponse.ok)
    throw new Error(tvData.error);

  const genreResponse = await getGenre(mediaType);
  const genreData = await genreResponse.json();

  if (!genreResponse.ok)
    throw new Error(genreData.error);

  return (
    <ContentMovies 
      data={tvData}
      genre={genreData.genres}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default TvOnTheAir;