import { CachedResponse, IGetMovieDetailsResponse, IGetPersonDetailsResponse } from "@types";

import { getMovieDetails, getTvDetails, getPersonDetails } from "@lib/api";
import { getFromCache, saveToCache } from "@lib/redis/cache";

export const getCachedDetails = async (mediaType: string, id: number): Promise<CachedResponse> => {
    const subPath = mediaType === "person" 
            ? `name` : `title:${mediaType}`;  // e.g., title:movie or title:movie
    const cacheKey = `${mediaType}_${id}`;   // e.g., movie_157336
    const maxAgeMs = 72 * 60 * 60;   // 48 hour

    const cached = await getFromCache<CachedResponse>(subPath, cacheKey);
    if (cached) return cached;
    
    try {
        // Try fetching from API
        let data: CachedResponse;   

        if (mediaType === "movie")
            data = await getMovieDetails(mediaType, id) as IGetMovieDetailsResponse;
        else if (mediaType === "tv")
            data = await getTvDetails(mediaType, id) as IGetMovieDetailsResponse;
        else if (mediaType === "person")
            data = await getPersonDetails(mediaType, id) as IGetPersonDetailsResponse;
        else
            throw new Error("Invalid mediaType");

        await saveToCache(subPath, cacheKey, data, maxAgeMs);

        return data;
    } catch(error) {
        // Error if no cache at all
        console.error("API fetch error:", error);
        throw new Error("Failed to fetch details and no cached data available.");
    }
}