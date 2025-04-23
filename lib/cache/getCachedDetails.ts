import { getMovieDetails } from "@lib/api";
import { getFromCache, saveToCache } from "@lib/cache/cache";

export const getCachedDetails = async (mediaType: string, id: number) => {
    const subPath = `title/${mediaType}`;  // e.g., title/movie or title/movie
    const cacheKey = `${mediaType}_${id}`;   // e.g., movie_157336
    const maxAgeMs = 60 * 60 * 1000;          // 60 minutes

    const cached = await getFromCache(subPath, cacheKey, maxAgeMs);
    if (cached) return cached;
    
    try {
        // Try fetching from API
        const data = await getMovieDetails(mediaType, id);
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