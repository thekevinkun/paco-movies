import { IGetPreviewDetailsResponse } from "@types";

import { getPreviewDetails } from "@lib/api";
import { getFromCache, saveToCache } from "@lib/redis/cache";

export const getCachedPreview = async (mediaType: string, id: number): Promise<IGetPreviewDetailsResponse> => {
    const subPath =  `previews/${mediaType}`; 
    const cacheKey = `preview_${id}`; 
    const maxAgeMs = 24 * 60 * 60 * 1000;

    const cached = await getFromCache<IGetPreviewDetailsResponse>(subPath, cacheKey, maxAgeMs);
    if (cached) return cached;

    try {
        // Try fetching from API
        const data = await getPreviewDetails(mediaType, id) as IGetPreviewDetailsResponse;

        await saveToCache(subPath, cacheKey, data);
        
        return data;
    } catch(error) {
        console.error("API fetch error:", error);

        // Fallback to expired cache if possible
        const expiredCache = await getFromCache<IGetPreviewDetailsResponse>(subPath, cacheKey, maxAgeMs, true);
        if (expiredCache) return expiredCache;

        // Error if no cache at all
        throw new Error("Failed to get preview and no cached data available.");
    }
}