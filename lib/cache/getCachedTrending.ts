import { getTrending, getCategory } from "@lib/api";
import { getFromCache, saveToCache } from "@lib/cache/cache";

export const getCachedTrending = async (mediaType: string, category: string) => {
    const subPath = mediaType === "stars" ? `${mediaType}` : `${mediaType}/${category}`; 
    const cacheKey = mediaType === "stars" ? `${mediaType}_1` : `${category}_1`; 
    const maxAgeMs = 60 * 60 * 1000;

    const cached = await getFromCache(subPath, cacheKey, maxAgeMs);
    if (cached) return cached;
    
    try {
        // Try fetching from API
        let data: any = {}

        if (mediaType === "stars")
            data = await getCategory(mediaType, category);
        else
            data = await getTrending(mediaType);
        
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