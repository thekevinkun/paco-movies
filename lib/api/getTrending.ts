import { options } from "@lib/api/data";

export const getTrending = async (mediaType: string) => {
    if (mediaType === "stars") mediaType = "person";
    
    const response = await 
        fetch(`https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US`, options);

    const data = await response.json();
    
    if (!response.ok || data.success === false)
        throw new Error(data.status_message || "Failed to fetch trending");

    return data; 
}