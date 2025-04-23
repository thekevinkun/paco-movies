import { options } from "@server/api/data";
import { isNumeric } from "@helpers/helpers";

export const getNextPage = async (mediaType: string, category: string, query: string, page: number) => {
    try {
        if (mediaType === "stars") mediaType = "person";

        let response: any = {}

        if (category === "search")
            response = await fetch(`https://api.themoviedb.org/3/search/${mediaType}?query=${query}&include_adult=false&language=en-US&page=${page}`, options);
        else if (isNumeric(category))
            response = await fetch(`https://api.themoviedb.org/3/discover/${mediaType}?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${category}&page=${page}`, options);
        else if (category === "trending")
            response = await fetch(`https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US&page=${page}`, options);
        else
            response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${category}?language=en-US&page=${page}`, options);

        const data = await response.json();

        const errorMsg: any = {error: data.status_message};

        if (data.success === false) {
            throw new Error(errorMsg);
        }

        return data;
    } catch (error) {
        return error;
    } 
}