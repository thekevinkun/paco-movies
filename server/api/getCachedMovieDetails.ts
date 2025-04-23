import { getMovieDetails } from "@server/api";
import { getFromCache, saveToCache } from "@utils/cache";

let cache: Record<string, any> = {};

export const getCachedMovieDetails = async (mediaType: string, id: number) => {
    const cacheKey = `${mediaType}_${id}`;
    const maxAgeMs = 5 * 60 * 1000; // 5 minutes

    const cached = await getFromCache(cacheKey, maxAgeMs);
    if (cached) return cached;
  
    const response = await getMovieDetails(mediaType, id);
    const data = await response.json();
  
    if (response.ok) {
        await saveToCache(cacheKey, data);
    }

    return data;
}