import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getCategory } from "@lib/api";
import { getCachedGenres } from "@lib/cache";

export const metadata: Metadata = {
  title: "Now Playing Movies — PacoMovies",
  description: "Now playing movie collection's page"
};

const NowPlayingMovie = async ({mediaType="movie", category="now_playing"}) => {
  const movieData = await getCategory(mediaType, category);
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
