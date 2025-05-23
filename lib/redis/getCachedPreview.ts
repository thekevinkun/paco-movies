import { IGetPreviewDetailsResponse } from "@types";

import { getPreviewDetails } from "@lib/api";
import { getFromCache, saveToCache } from "@lib/redis/cache";

export const getCachedPreview = async (
  mediaType: string,
  id: number
): Promise<IGetPreviewDetailsResponse> => {
  const subPath = `previews:${mediaType}`;
  const cacheKey = `preview_${id}`;
  const maxAgeMs = 72 * 60 * 60; // 48 hour

  const cached = await getFromCache<IGetPreviewDetailsResponse>(
    subPath,
    cacheKey
  );
  if (cached) return cached;

  try {
    // Try fetching from API
    const data = (await getPreviewDetails(
      mediaType,
      id
    )) as IGetPreviewDetailsResponse;

    await saveToCache(subPath, cacheKey, data, maxAgeMs);

    return data;
  } catch (error) {
    // Error if no cache at all
    console.error("API fetch error:", error);
    throw new Error("Failed to get preview and no cached data available.");
  }
};
