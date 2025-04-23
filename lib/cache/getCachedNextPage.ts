import { getNextPage } from "@lib/api";
import { getFromCache, saveToCache } from "@lib/cache/cache";

export const getCachedNextPage = async (
    mediaType: string, category: string, 
    query: string, page: number
  ) => {
    const subPath = `${mediaType}/${category}`;
    const cacheKey = `${category}_${page}`; 
    const maxAgeMs = 30 * 60 * 1000;

    const cached = await getFromCache(subPath, cacheKey, maxAgeMs);
    if (cached) return cached;

    try {
        // Try fetching from API
        const data = await getNextPage(mediaType, category, query, page);

        // No need to cache search data
        if (!query || category !== "search") 
            await saveToCache(subPath, cacheKey, data);
        
        return data;
    } catch(error) {
        // Fallback to expired cache if possible
        const expiredCache = await getFromCache(subPath, cacheKey, maxAgeMs, true);
        if (expiredCache) return expiredCache;

        // Error if no cache at all
        throw new Error("Failed to fetch trending and no cached data available.");
    }
}