import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getCategory, getCachedGenres } from "@server/api";

export const metadata: Metadata = {
  title: "Upcoming Movies — PacoMovies",
  description: "Upcoming movie collection's page"
};

const UpcomingMovie = async ({mediaType="movie", category="upcoming"}) => {
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

export default UpcomingMovie;