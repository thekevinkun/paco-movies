import { IGetSearchResponse, ITMDBError } from "@types";

import { options } from "@lib/api/data";

export const getSearch = async (mediaType: string, query: string): Promise<IGetSearchResponse> => {
    const response = await fetch(`https://api.themoviedb.org/3/search/${mediaType}?query=${query}&include_adult=false&language=en-US`, options)

    const data: IGetSearchResponse & Partial<ITMDBError> = await response.json();
    
    if (!response.ok || data.success === false)
        throw new Error(data.status_message || "Failed to fetch the query");

    return data; 
}