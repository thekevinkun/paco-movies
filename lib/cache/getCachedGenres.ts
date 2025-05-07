import { getGenres } from "@lib/api";
import { getFromCache, saveToCache } from "@lib/cache/cache";

export async function getCachedGenres(mediaType: string) {
  const subPath = `genres/${mediaType}`;
  const cacheKey = `genres`; 
  const maxAgeMs = 72 * 60 * 60 * 1000;

  const cached = await getFromCache(subPath, cacheKey, maxAgeMs);
  if (cached) return cached;

  try {
    // Try fetching from API
    const data = await getGenres(mediaType);
    await saveToCache(subPath, cacheKey, data.genres);
    return data.genres;
  } catch(error) {
    console.error("API fetch error:", error);

    // Fallback to expired cache if possible
    const expiredCache = await getFromCache(subPath, cacheKey, maxAgeMs, true);
    if (expiredCache) return expiredCache;

    // Error if no cache at all
    throw new Error("Failed to fetch trending and no cached data available.");
  }
}