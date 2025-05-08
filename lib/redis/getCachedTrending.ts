import {CachedCategoryResponse, IGetByCategoryResponse, IGetStarsResponse } from "@types";

import { getTrending, getStars } from "@lib/api";
import { getFromCache, saveToCache } from "@lib/redis/cache";

export const getCachedTrending = async (mediaType: string, category: string): Promise<CachedCategoryResponse> => {
    const subPath = mediaType === "stars" ? `${mediaType}` : `${mediaType}/${category}`; 
    const cacheKey = mediaType === "stars" ? `${mediaType}_1` : `${category}_1`; 
    const maxAgeMs = 30 * 60 * 1000;

    const cached = await getFromCache<CachedCategoryResponse>(subPath, cacheKey, maxAgeMs);
    if (cached) return cached;
    
    try {
        // Try fetching from API
        let data: CachedCategoryResponse;   

        if (mediaType === "stars")
            data = await getStars(mediaType, category) as IGetStarsResponse;
        else
            data = await getTrending(mediaType) as IGetByCategoryResponse;
        
        await saveToCache(subPath, cacheKey, data);
        return data;
    } catch(error) {
        console.error("API fetch error:", error);

        // Fallback to expired cache if possible
        const expiredCache = await getFromCache<CachedCategoryResponse>(subPath, cacheKey, maxAgeMs, true);
        if (expiredCache) return expiredCache;

        // Error if no cache at all
        throw new Error("Failed to fetch trending and no cached data available.");
    }
}