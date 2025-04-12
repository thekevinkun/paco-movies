import { options } from "@api/data";

export const getCategory = async (mediaType: string, category: string) => {
    try {
        if (mediaType === "stars") mediaType = "person";

        const response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${category}?language=en-US`, options);

        const data = await response.json();

        if (data.success === false) {
            throw new Error(data.status_message);
        }

        return new Response(JSON.stringify(data), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({error: error}), {status: 500});
    } 
}