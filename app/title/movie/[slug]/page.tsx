import { Metadata } from "next";

import { ContentDetails } from "@sections";

import { getMovieDetails } from "@api";
import { isNumeric } from "@helpers/helpers";

export async function generateMetadata({params, mediaType="movie"}: 
      {params: any, mediaType: string}): Promise<Metadata> {
  params = await params;
  const titleId = params.slug.substring(0, params.slug.indexOf("-"));
  
  const response = await getMovieDetails(mediaType, !isNumeric(params.slug) ? titleId : params.slug);
  const data = await response.json();

  const title = data.details.title;

  return {
    title: title + " — PacoMovies",
    description: title + " details page",
  };
}

const TitleMovie = async ({params, mediaType="movie"}: {params: any, mediaType: string}) => {
  params = await params;
  const titleId = params.slug.substring(0, params.slug.indexOf("-"));

  const response = await getMovieDetails(mediaType, !isNumeric(params.slug) ? titleId : params.slug);
  const data = await response.json();

  if (!response.ok)
    throw new Error(data.error);

  return (
    <ContentDetails 
        data={data}
        mediaType={mediaType}
    />
  )
}

export default TitleMovie;