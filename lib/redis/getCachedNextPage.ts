import { getNextPage } from "@lib/api";
import { getFromCache, saveToCache } from "@lib/redis/cache";

export const getCachedNextPage = async (
  mediaType: string,
  category: string,
  query: string,
  page: number
) => {
  const subPath =
    mediaType === "stars" ? `${mediaType}` : `${mediaType}:${category}`;
  const cacheKey =
    mediaType === "stars" ? `${mediaType}_${page}` : `${category}_${page}`;
  const maxAgeMs = 60 * 60; // 1 hour

  const cached = await getFromCache(subPath, cacheKey);
  if (cached) return cached;

  try {
    // Try fetching from API
    const data = await getNextPage(mediaType, category, query, page);

    // Only cache if trending or stars
    const isCacheable = category === "trending" || mediaType === "stars";

    if (isCacheable) await saveToCache(subPath, cacheKey, data, maxAgeMs);

    return data;
  } catch (error) {
    // Error if no cache at all
    console.error("API fetch error:", error);
    throw new Error("Failed to fetch trending and no cached data available.");
  }
};
