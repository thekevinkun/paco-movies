import { getGenres } from "@lib/api";
import { getFromCache, saveToCache } from "@lib/redis/cache";
import { Genre } from "@types";

export async function getCachedGenres(mediaType: string): Promise<Genre[]> {
  const subPath = `genres:${mediaType}`;
  const cacheKey = `genres`;
  const maxAgeMs = 30 * 24 * 60 * 60; // 1 month

  const cached = await getFromCache<Genre[]>(subPath, cacheKey);
  if (cached) return cached;

  try {
    // Try fetching from API
    const data = await getGenres(mediaType);

    await saveToCache(subPath, cacheKey, data.genres, maxAgeMs);

    return data.genres;
  } catch (error) {
    // Error if no cache at all
    console.error("API fetch error:", error);
    throw new Error("Failed to fetch trending and no cached data available.");
  }
}
