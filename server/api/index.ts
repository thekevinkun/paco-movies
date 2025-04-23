import { getTrending } from "@server/api/getTrending";
import { getCategory } from "@server/api/getCategory";
import { getGenres } from "@server/api/getGenres";
import { getByGenre } from "@server/api/getByGenre";
import { getSearch } from "@server/api/getSearch";
import { getNextPage } from '@server/api/getNextPage';
import { getMovieDetails } from "@server/api/getMovieDetails";

import { getCachedGenres } from "@server/api/getCachedGenres";
import { getCachedMovieDetails } from "@server/api/getCachedMovieDetails";

export {
    getTrending,
    getCategory,
    getGenres,
    getByGenre,
    getSearch,
    getNextPage,
    getMovieDetails,

    getCachedGenres,
    getCachedMovieDetails
}