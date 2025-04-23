import { options } from "@server/api/data";

export const getByGenre = async (mediaType: string, genre: string) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/${mediaType}?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${genre}`, options);

        const data = await response.json();

        if (data.success === false) {
            throw new Error(data.status_message);
        }

        return new Response(JSON.stringify(data), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({error: error}), {status: 500});
    } 
}