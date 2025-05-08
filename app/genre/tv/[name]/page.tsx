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
  const mediaType="tv";
  const { name } = await params;
  const genreId = name.split("-")[0];

  try {
    const genre = await getCachedGenres(mediaType) as Genre[];
    const genreFind = genre.find((g) => g.id.toString() === genreId);
    const genreName = genreFind ? genreFind.name : "Unknown Genre";

    return {
      title: genreName + " TV Shows — PacoMovies",
      description: "Discover " + genreName + " TV Shows."
    };
  } catch (error) {
    console.error("generateMetadata error:", error);
    return {
        title: "Error — PacoMovies",
        description: "Failed to load genre.",
    };
  }
}

const GenreTv = async ({ params }: {params: Promise<{ name: string }>}) => {
  const mediaType="tv";
  const { name } = await params;
  const genreId = name.split("-")[0];

  const tvData = await getByGenre(mediaType, genreId);
  const genreData = await getCachedGenres(mediaType);

  const genreFind = genreData.find((g) => g.id.toString() === genreId);
  const genreName = genreFind ? genreFind.name : "Unknown Genre";
  
  return (
    <ContentMoviesClient 
      data={tvData}
      genres={genreData}
      mediaType={mediaType}
      category={genreId}
      categoryTitle={genreName + " TV Shows"}
    />
  )
}

export default GenreTv;