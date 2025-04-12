import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getTrending, getGenre } from "@api";

export const metadata: Metadata = {
  title: "TV Shows — PacoMovies",
  description: "TV Show collection's page"
};

const Tv = async ({mediaType="tv", category="trending"}) => {
  const tvResponse = await getTrending(mediaType);
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

export default Tv;
