"use server"

import fs from "fs";
import path from "path";

const CACHE_DIR = path.resolve(process.cwd(), ".cache");

// Checks if the .cache/... folder already exists
function ensureDir(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Read cached data (If it's expired or not)
export const getFromCache = async (
    subPath: string, cacheKey: string,
    maxAgeMs: number,allowExpired: boolean = false) => {

    try {
        // Combines .cache/ folder with a subpath folder like movie/details
        const dirPath = path.join(CACHE_DIR, subPath);
        
        // Combines dir folder above with a filename like movie_157336.json
        const filePath = path.join(dirPath, `${cacheKey}.json`);

        //// Check the expire of cache file
        // gets metadata about the file
        const { mtimeMs } = fs.statSync(filePath);

        // how long ago the file was modified
        const age = Date.now() - mtimeMs;

        // If the cache not old yet and expired cache allow to read
        if (age < maxAgeMs || allowExpired) {
            // Reads the file content as string, Parses it back into a JavaScript object and returns it
            const data = await fs.readFileSync(filePath, "utf-8");
            return JSON.parse(data);
        }

        return null;
    } catch {
        return null;
    }
}

export async function saveToCache(subPath: string, key: string, data: any) {
    // Combines .cache/ folder with a subpath folder like movie/details and check
    const dirPath = path.join(CACHE_DIR, subPath);
    ensureDir(dirPath);

    // Combines dir folder above with a filename like movie_157336.json
    const filePath = path.join(dirPath, `${key}.json`);

    // Write the date into the file name as json
    fs.writeFileSync(filePath, JSON.stringify(data), "utf-8");
}