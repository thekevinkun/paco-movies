import { getGenres } from "@api";

let genreCache: Record<string, any> = {};

export async function getCachedGenres(mediaType: string) {
  if (genreCache[mediaType]) {
    return genreCache[mediaType];
  }

  const response = await getGenres(mediaType);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch genres");
  }

  genreCache[mediaType] = data.genres;
  return data.genres;
}