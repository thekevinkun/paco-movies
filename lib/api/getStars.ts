import { options } from "@lib/api/data";

import type { IGetStarsResponse, ITMDBError } from "@types";

export const getStars = async (mediaType: string, category: string): Promise<IGetStarsResponse> => {
    if (mediaType === "stars") mediaType = "person";

    const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${category}?language=en-US`, options);

    const data: IGetStarsResponse & Partial<ITMDBError> = await response.json();

    if (!response.ok || data.success === false)
        throw new Error(data.status_message || "Failed to fetch stars data.");
    
    return {
        page: data.page,
        results: data.results,
        total_pages: data.total_pages,
        total_results: data.total_results
    }; 
}