import {CachedCategoryResponse, IGetByCategoryResponse, IGetStarsResponse } from "@types";

import { getTrending, getStars } from "@lib/api";
import { getFromCache, saveToCache } from "@lib/redis/cache";

export const getCachedTrending = async (mediaType: string, category: string): Promise<CachedCategoryResponse> => {
    const subPath = mediaType === "stars" ? `${mediaType}` : `${mediaType}:${category}`; 
    const cacheKey = mediaType === "stars" ? `${mediaType}_1` : `${category}_1`; 
    const maxAgeMs = 60 * 60; // 1 hour

    const cached = await getFromCache<CachedCategoryResponse>(subPath, cacheKey);
    if (cached) return cached;
    
    try {
        // Try fetching from API
        let data: CachedCategoryResponse;   

        if (mediaType === "stars")
            data = await getStars(mediaType, category) as IGetStarsResponse;
        else
            data = await getTrending(mediaType) as IGetByCategoryResponse;
        
        await saveToCache(subPath, cacheKey, data, maxAgeMs);
        return data;
    } catch(error) {
        // Error if no cache at all
        console.error("API fetch error:", error);
        throw new Error("Failed to fetch trending and no cached data available.");
    }
}