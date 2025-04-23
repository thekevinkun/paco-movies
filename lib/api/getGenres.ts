import { options } from "@lib/api/data";

export const getGenres = async (mediaType: string) => {
    const response = await fetch(`https://api.themoviedb.org/3/genre/${mediaType}/list?language=en`, options);

    const data = await response.json();

    if (!response.ok || data.success === false)
        throw new Error(data.status_message);

    return data.genres;
}