import fs from "fs";
import path from "path";

const CACHE_DIR = path.resolve(process.cwd(), ".cache");

// Checks if the .cache folder already exists
if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR);
}

// Read cached data (If it's expired or not)
export async function getFromCache(key: string, maxAgeMs: number): Promise<any | null> {
    // Combines .cache/ folder with a filename like movie_157336.json
    const filePath = path.join(CACHE_DIR, key + ".json");

    // If there’s no file with that name, return null (cache miss)
    if (!fs.existsSync(filePath)) return null;

    //// Check the expire of cache file
    // gets metadata about the file
    const { mtimeMs } = fs.statSync(filePath);

    // how long ago the file was modified
    const age = Date.now() - mtimeMs;

    // If it’s older than the allowed age, return null (expired cache)
    if (age > maxAgeMs) {
        return null;
    }

    // Reads the file content as string, Parses it back into a JavaScript object and returns it
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
}

export async function saveToCache(key: string, data: any) {
    // Combines .cache/ folder with a filename like movie_157336.json
    const filePath = path.join(CACHE_DIR, key + ".json");

    // Write the date into the file name as json
    fs.writeFileSync(filePath, JSON.stringify(data), "utf-8");
}