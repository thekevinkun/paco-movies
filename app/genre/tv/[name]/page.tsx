import { Metadata } from "next";

import { ContentMovies } from "@sections";

import { getGenre, getByGenre } from "@api";
import { isNumeric, toTitleCase } from "@helpers/helpers";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  params = await params;
  const genreName = await toTitleCase(params.name.substring(params.name.indexOf("-") + 1));

  return {
    title: genreName + " TV Shows — PacoMovies",
    description: genreName + " TV Shows collection's page",
  };
}

const GenreTv = async ({params, mediaType="tv"}: {params: any, mediaType: string}) => {
  params = await params;
  const genreId = await params.name.substring(0, params.name.indexOf("-"));

  const tvResponse = await getByGenre(mediaType, !isNumeric(params.name) ? genreId : params.name);
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
      category={genreId}
    />
  )
}

export default GenreTv;