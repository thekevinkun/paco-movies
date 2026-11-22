"use server";

import { redis } from "@lib/redis/redis";

export const getFromCache = async <T>(
  subPath: string,
  cacheKey: string
): Promise<T | null> => {
  try {
    const redisKey = `${subPath}:${cacheKey}`;
    const cachedData = await redis.get(redisKey);

    if (cachedData === null) {
      return null;
    }

    // Redis may return an already-parsed object or a JSON string.
    const parsed =
      typeof cachedData === "string"
        ? JSON.parse(cachedData)
        : cachedData;

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "data" in parsed
    ) {
      return parsed.data as T;
    }

    console.warn(`Invalid cache structure for key: ${redisKey}`);
    return null;
  } catch (error) {
    console.error("Redis getFromCache error:", error);
    return null;
  }
};

export async function saveToCache<T>(
  subPath: string,
  cacheKey: string,
  data: T,
  ttlSeconds?: number
): Promise<void> {
  try {
    const redisKey = `${subPath}:${cacheKey}`;

    const wrappedData = {
      data,
      timestamp: Date.now(),
    };

    if (ttlSeconds) {
      await redis.set(redisKey, JSON.stringify(wrappedData), {
        ex: ttlSeconds,
      });
    } else {
      await redis.set(redisKey, JSON.stringify(wrappedData));
    }
  } catch (error) {
    console.error("Redis saveToCache error:", error);
  }
}
