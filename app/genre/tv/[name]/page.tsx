import { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import { getByGenre } from "@lib/api";
import { getCachedGenres } from "@lib/cache";
import { isNumeric } from "@helpers/helpers";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  params = await params;
  const genreId = params.name.substring(0, params.name.indexOf("-"));

  const genre = await getCachedGenres("tv");
  const genreFind = genre.find((g: any) => g.id.toString() === genreId);
  const genreName = genreFind ? genreFind.name : "Unknown Genre";

  return {
    title: genreName + " TV Shows — PacoMovies",
    description: genreName + " TV Shows collection's page",
  };
}

const GenreTv = async ({params, mediaType="tv"}: {params: any, mediaType: string}) => {
  params = await params;
  const genreId = await params.name.substring(0, params.name.indexOf("-"));

  const tvData = await getByGenre(mediaType, !isNumeric(params.name) ? genreId : params.name);
  const genreData = await getCachedGenres(mediaType);
  
  return (
    <ContentMoviesClient 
      data={tvData}
      genre={genreData}
      mediaType={mediaType}
      category={genreId}
    />
  )
}

export default GenreTv;