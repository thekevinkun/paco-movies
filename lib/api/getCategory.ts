import { options } from "@lib/api/data";

export const getCategory = async (mediaType: string, category: string) => {
    if (mediaType === "stars") mediaType = "person";

    const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${category}?language=en-US`, options);

    const data = await response.json();

    if (!response.ok || data.success === false)
        throw new Error(data.status_message);
    
    return data;
}