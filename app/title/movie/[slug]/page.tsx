import type { Metadata } from "next";

import { ContentDetailsClient } from "@components/Clients";

import type { IGetMovieDetailsResponse } from "@types";

import { getCachedDetails } from "@lib/cache";

export const dynamic = "force-static";

// REQUIRED to avoid build/runtime param bugs
export async function generateStaticParams() {
  return []; // Prevents runtime "await params" error
}

export async function generateMetadata({ params }: {params: Promise<{ slug: string }>}): Promise<Metadata> {
  const mediaType = "movie";
  const { slug } = await params;
  const titleId = Number(slug.split("-")[0]);
  
  const data = await getCachedDetails(mediaType, titleId) as IGetMovieDetailsResponse;
  const title = data.details.title;
  const overview = data.details.overview;

  return {
    title: title + " — PacoMovies",
    description: overview,
  };
}

const TitleMovie = async ({ params }: {params: Promise<{ slug: string }>}) => {
  const mediaType = "movie";
  const { slug } = await params;
  const titleId = Number(slug.split("-")[0]);

  const data = await getCachedDetails(mediaType, titleId);

  return (
    <ContentDetailsClient 
      data={data}
      mediaType={mediaType}
    />
  )
}

export default TitleMovie;