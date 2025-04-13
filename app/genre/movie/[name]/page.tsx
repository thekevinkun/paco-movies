import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getGenre, getByGenre } from "@api";
import { isNumeric, toTitleCase } from "@helpers/helpers";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  params = await params;
  const genreName = await toTitleCase(params.name.substring(params.name.indexOf("-") + 1));

  return {
    title: genreName + " Movies — PacoMovies",
    description: genreName + " Movie collection's page",
  };
}

const GenreMovie = async ({params, mediaType="movie"}: {params: any, mediaType: string}) => {
  params = await params;
  const genreId = await params.name.substring(0, params.name.indexOf("-"));

  const movieResponse = await getByGenre(mediaType, !isNumeric(params.name) ? genreId : params.name);
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
      category={genreId}
    />
  )
}

export default GenreMovie;