import type { IApiOptions } from "@types"

export const options: IApiOptions = {
    method: "GET",
    cache: "no-cache",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
}