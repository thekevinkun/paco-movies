import { getMovieDetails } from "@api";

let cache: Record<string, any> = {};

export const getCachedMovieDetails = async (mediaType: string, id: number) => {
    const key = `${mediaType}-${id}`;
    if (cache[key]) return cache[key]; // ✅ Already fetched once
  
    const response = await getMovieDetails(mediaType, id);
    const data = await response.json();
  
    cache[key] = data;
    return data;
}