import { options } from "@lib/api/data";
import { isNumeric } from "@lib/helpers/helpers";

import {
  CachedNextPageResponse,
  IGetByCategoryResponse,
  IGetSearchResponse,
  ITMDBError,
} from "@types";

export const getNextPage = async (
  mediaType: string,
  category: string,
  query: string,
  page: number
) => {
  if (mediaType === "stars") mediaType = "person";

  let response: Response;

  let data: CachedNextPageResponse & Partial<ITMDBError>;

  if (category === "search") {
    response = await fetch(
      `https://api.themoviedb.org/3/search/${mediaType}?query=${query}&include_adult=false&language=en-US&page=${page}`,
      options
    );
    data = (await response.json()) as IGetSearchResponse;
  } else if (isNumeric(category)) {
    response = await fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${category}&page=${page}`,
      options
    );
    data = (await response.json()) as IGetByCategoryResponse;
  } else if (category === "trending") {
    response = await fetch(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US&page=${page}`,
      options
    );
    data = (await response.json()) as IGetByCategoryResponse;
  } else {
    response = await fetch(
      `https://api.themoviedb.org/3/${mediaType}/${category}?language=en-US&page=${page}`,
      options
    );
    data = (await response.json()) as IGetByCategoryResponse;
  }

  if (!response.ok || data.success === false)
    throw new Error(data.status_message || "Failed to fetch next page");

  return data;
};
