"use server";

import { options } from "@lib/api/data";
import { dedupeResults } from "@lib/helpers/helpers";

import type {
  IGetPersonDetailsResponse,
  ITMDBError,
  PersonDetails,
  ImagesPersonResponse,
  CreditsMovie,
  CreditItem,
  ExternalIds,
} from "@types";

export const getPersonDetails = async (
  mediaType: string,
  nameId: number
): Promise<IGetPersonDetailsResponse> => {
  let response: Response;

  // Get details
  response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${nameId}?language=en-US`,
    options
  );
  const details: PersonDetails & Partial<ITMDBError> = await response.json();
  if (!response.ok || details.success === false) {
    throw new Error(details.status_message);
  }

  // Get credits
  response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${nameId}/combined_credits?language=en-US`,
    options
  );
  const credits: CreditsMovie & Partial<ITMDBError> = await response.json();
  if (!response.ok || credits.success === false) {
    throw new Error(credits.status_message);
  }

  let cast = credits.cast.map(
    (obj): CreditItem => ({
      ...obj,
      release_date: obj.first_air_date || obj.release_date || "",
    })
  );

  cast = cast.sort((a, b) => {
    if (a.release_date === "") return 1;
    if (b.release_date === "") return -1;

    const dateA = new Date(a.release_date ?? "").getTime();
    const dateB = new Date(b.release_date ?? "").getTime();

    if (dateA === dateB) return 0;
    return dateB - dateA;
  });

  let crew = credits.crew.map(
    (obj): CreditItem => ({
      ...obj,
      release_date: obj.first_air_date || obj.release_date || "",
    })
  );

  crew = crew.sort((a, b) => {
    if (a.release_date === "") return 1;
    if (b.release_date === "") return -1;

    const dateA = new Date(a.release_date ?? "").getTime();
    const dateB = new Date(b.release_date ?? "").getTime();

    if (dateA === dateB) return 0;
    return dateB - dateA;
  });

  // Get images
  response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${nameId}/images`,
    options
  );
  const imagesPerson: ImagesPersonResponse & Partial<ITMDBError> =
    await response.json();
  if (!response.ok || imagesPerson.success === false) {
    throw new Error(imagesPerson.status_message);
  }

  // Get contacts
  response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${nameId}/external_ids`,
    options
  );
  const externalIds: ExternalIds & Partial<ITMDBError> = await response.json();
  if (!response.ok || externalIds.success === false) {
    throw new Error(externalIds.status_message);
  }

  const data = {
    details: details,
    credits: {
      cast: dedupeResults(cast),
      crew: dedupeResults(crew),
    },
    images: imagesPerson.profiles,
    externalIds: externalIds,
  };

  return data;
};
