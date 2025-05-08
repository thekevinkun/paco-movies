import type { Metadata } from "next";

import { ContentMoviesClient } from "@components/Clients";

import type { Genre } from "@types";

import { getByGenre } from "@lib/api";
import { getCachedGenres } from "@lib/redis";

export const dynamic = "force-dynamic";

// REQUIRED to avoid build/runtime param bugs
export async function generateStaticParams() {
  return []; // Prevents runtime "await params" error
}

export async function generateMetadata({ params }: {params: Promise<{ name: string }>}): Promise<Metadata> {
  const mediaType = "movie";
  const { name } = await params;
  const genreId = name.split("-")[0];

  try {
    const genre = await getCachedGenres(mediaType) as Genre[];
    const genreFind = genre.find((g) => g.id.toString() === genreId);
    const genreName = genreFind ? genreFind.name : "Unknown Genre";

    return {
      title: genreName + " Movies — PacoMovies",
      description: "Discover " + genreName + " Movies."
    };
  } catch (error) {
    console.error("generateMetadata error:", error);
    return {
        title: "Error — PacoMovies",
        description: "Failed to load genre.",
    };
  }
}

const GenreMovie = async ({ params }: {params: Promise<{ name: string }>}) => {
  const mediaType = "movie";
  const { name } = await params;
  const genreId = name.split("-")[0];

  const movieData = await getByGenre(mediaType, genreId);
  const genreData = await getCachedGenres(mediaType);

  return (
    <ContentMoviesClient 
      data={movieData}
      genre={genreData}
      mediaType={mediaType}
      category={genreId}
    />
  )
}

export default GenreMovie;