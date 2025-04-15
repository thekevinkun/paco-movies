import { options } from "@api/data";

export const getSearch = async (mediaType: string, query: string) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/${mediaType}?query=${query}&include_adult=false&language=en-US`, options)

        const data = await response.json();

        if (data.success === false) {
            throw new Error(data.status_message);
        }

        return new Response(JSON.stringify(data), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({error: error}), {status: 500});
    } 
}