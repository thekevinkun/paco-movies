import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getCategory, getGenre } from "@api";

export const metadata: Metadata = {
  title: "Upcoming Movies — PacoMovies",
  description: "Upcoming movie collection's page"
};

const UpcomingMovie = async ({mediaType="movie", category="upcoming"}) => {
  const movieResponse = await getCategory(mediaType, category);
  const movieData = await movieResponse.json();

  if (!movieResponse.ok)
    throw new Error(movieData.error);

  const genreResponse = await getGenre(mediaType);
  const genreData = await genreResponse.json();

  if (!genreResponse.ok)
    throw new Error(genreData.error);

  return (
    <ContentMovies 
      data={movieData}
      genre={genreData.genres}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default UpcomingMovie;