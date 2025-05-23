import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ContentMoviesClient } from "@components/Clients";

import type { Genre, IGetByCategoryResponse } from "@types";

import { getByGenre } from "@lib/api";
import { getCachedGenres } from "@lib/redis";
import { slugify } from "@lib/helpers/helpers";

export const dynamic = "force-dynamic";

// REQUIRED to avoid build/runtime param bugs
export async function generateStaticParams() {
  return []; // Prevents runtime "await params" error
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const mediaType = "movie";
  const { name } = await params;
  const genreId = name.split("-")[0];

  try {
    const genre = (await getCachedGenres(mediaType)) as Genre[];
    const genreFind = genre.find((g) => g.id.toString() === genreId);
    const genreName = genreFind ? genreFind.name : "Unknown Genre";

    return {
      title: genreName + " Movies — PacoMovies",
      description: "Discover " + genreName + " Movies.",
    };
  } catch (error) {
    console.error("generateMetadata error:", error);
    return {
      title: "Error — PacoMovies",
      description: "Failed to load genre.",
    };
  }
}

const GenreMovie = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  const mediaType = "movie";
  const { name } = await params;
  const [genreId, ...slugParts] = name.split("-");
  const currentSlug = slugParts.join("-");

  const movieData = (await getByGenre(
    mediaType, 
    genreId
  ))  as IGetByCategoryResponse;
  
  const genreData = (await getCachedGenres(
    mediaType
  )) as Genre[];

  const genreFind = genreData.find((g) => g.id.toString() === genreId);
  const trueSlug = slugify(genreFind?.name ?? "");

  if (trueSlug && currentSlug !== trueSlug) 
      redirect(`/genre/${mediaType}/${genreId}-${trueSlug}`);

  return (
    <ContentMoviesClient
      data={movieData}
      genres={genreData}
      mediaType={mediaType}
      category={genreId}
      categoryTitle={trueSlug + " Movies"}
    />
  );
};

export default GenreMovie;
