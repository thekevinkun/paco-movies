import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getByGenre, getCachedGenres } from "@server/api";
import { isNumeric } from "@helpers/helpers";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  params = await params;
  const genreId = params.name.substring(0, params.name.indexOf("-"));

  const genre = await getCachedGenres("movie");
  const genreFind = genre.find((g: any) => g.id.toString() === genreId);
  const genreName = genreFind ? genreFind.name : "Unknown Genre";

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

  const genreData = await getCachedGenres(mediaType);

  return (
    <ContentMovies 
      data={movieData}
      genre={genreData}
      mediaType={mediaType}
      category={genreId}
    />
  )
}

export default GenreMovie;