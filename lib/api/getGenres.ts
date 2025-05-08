import { options } from "@lib/api/data";

import { IGetGenreResponse, ITMDBError } from "@types";

export const getGenres = async (
  mediaType: string
): Promise<IGetGenreResponse> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/${mediaType}/list?language=en`,
    options
  );

  const data: IGetGenreResponse & Partial<ITMDBError> = await response.json();

  if (!response.ok || data.success === false)
    throw new Error(data.status_message);

  return { genres: data.genres };
};
