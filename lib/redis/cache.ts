"use server"

import { redis } from "@lib/redis/redis";

// Read cached data (If it's expired or not)
export const getFromCache = async <T>(
    subPath: string,
    cacheKey: string,
    maxAgeMs: number,
    allowExpired: boolean = false
): Promise<T | null> => {
    try {
        const redisKey = `${subPath}:${cacheKey}`;
        
        const cachedData = await redis.get(redisKey);

        if (cachedData === null) {
            console.info(`Cache miss for key: ${redisKey}`);
            return null;
        }
        
        if (typeof cachedData !== "string") {
            if (process.env.NODE_ENV === "development") {
                console.warn(`Unexpected data type from Redis for key ${redisKey}:`, cachedData);
            } else {
                console.warn(`Unexpected data type from Redis for key ${redisKey}: type=${typeof cachedData}`)
            }
            return null;
        }

        // Parse the stored JSON data
        const parsed = JSON.parse(cachedData) as {
            data: T;
            timestamp: number;
        };

        const age = Date.now() - parsed.timestamp;

        if (age < maxAgeMs || allowExpired) {
            return parsed.data;
        }

        return null;
    } catch (error) {
        console.error("Redis getFromCache error:", error);
        return null;
    }
}

export async function saveToCache<T>(subPath: string, cacheKey: string, data: T): Promise<void> {
    try {
        const redisKey = `${subPath}:${cacheKey}`;

        const wrappedData = {
            data,
            timestamp: Date.now(),
        };

        // Save data without TTL, because we handle expiration manually (mtime equivalent)
        await redis.set(redisKey, JSON.stringify(wrappedData));
    } catch (error) {
        console.error("Redis saveToCache error:", error);
    }
}