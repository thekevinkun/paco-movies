import { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getByCategory } from "@lib/api";
import { getCachedGenres } from "@lib/cache";

export const metadata: Metadata = {
  title: "Now Playing Movies — PacoMovies",
  description: "Now playing movie collection's page"
};

const NowPlayingMovie = async ({mediaType="movie", category="now_playing"}) => {
  const movieData = await getByCategory(mediaType, category);
  const genreData = await getCachedGenres(mediaType);
  
  return (
    <ContentMoviesClient 
      data={movieData}
      genre={genreData}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default NowPlayingMovie;
