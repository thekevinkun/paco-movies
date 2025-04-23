import { options } from "@server/api/data";

export const getGenres = async (mediaType: string) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/${mediaType}/list?language=en`, options);

        const data = await response.json();

        if (data.success === false) {
            throw new Error(data.status_message);
        }

        return new Response(JSON.stringify(data), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({error: error}), {status: 500});
    } 
}