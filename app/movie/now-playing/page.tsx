import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getCategory } from "@api";
import { getCachedGenres } from "@cache";

export const metadata: Metadata = {
  title: "Now Playing Movies — PacoMovies",
  description: "Now playing movie collection's page"
};

const NowPlayingMovie = async ({mediaType="movie", category="now_playing"}) => {
  const movieResponse = await getCategory(mediaType, category);
  const movieData = await movieResponse.json();

  if (!movieResponse.ok)
    throw new Error(movieData.error);

  const genreData = await getCachedGenres(mediaType);
  
  return (
    <ContentMovies 
      data={movieData}
      genre={genreData}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default NowPlayingMovie;
