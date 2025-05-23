import type { Metadata } from "next";
import { redirect } from "next/navigation";
import moment from "moment";

import { ContentDetailsClient } from "@components/Clients";

import type { IGetMovieDetailsResponse } from "@types";

import { getCachedDetails } from "@lib/redis";
import { slugify } from "@lib/helpers/helpers";

export const dynamic = "force-dynamic";

// REQUIRED to avoid build/runtime param bugs
export async function generateStaticParams() {
  return []; // Prevents runtime "await params" error
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const mediaType = "movie";
  const { slug } = await params;
  const titleId = Number(slug.split("-")[0]);

  try {
    const data = (await getCachedDetails(
      mediaType,
      titleId
    )) as IGetMovieDetailsResponse;
    const title = data.details.title;
    const overview = data.details.overview;
    const date = data.details.release_date;

    const titleHead = date
      ? `${title} (${moment(date).format("YYYY")}) — PacoMovies`
      : `${title} — PacoMovies`;

    return {
      title: titleHead,
      description: overview,
    };
  } catch (error) {
    console.error("generateMetadata error:", error);
    return {
      title: "Error — PacoMovies",
      description: "Failed to load movie details.",
    };
  }
}

const TitleMovie = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const mediaType = "movie";
  const { slug } = await params;
  const [titleId, ...slugParts] = slug.split("-");
  const currentSlug = slugParts.join("-");

  const data = (await getCachedDetails(
    mediaType, 
    Number(titleId)
  )) as IGetMovieDetailsResponse;

  const trueSlug = slugify(data.details.title ?? "");

  if (trueSlug && currentSlug !== trueSlug) 
    redirect(`/title/${mediaType}/${titleId}-${trueSlug}`);

  return <ContentDetailsClient data={data} mediaType={mediaType} />;
};

export default TitleMovie;
