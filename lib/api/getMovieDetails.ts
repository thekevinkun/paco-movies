"use server";

import { options } from "@lib/api/data";

import type {
  IGetMovieDetailsResponse,
  ITMDBError,
  MovieDetails,
  ReleaseDatesResponse,
  VideosResponse,
  ImagesMovieResponse,
  ReviewsResponse,
  RecommendationsResponse,
  ReleaseDate,
  ReleaseDateResult,
  ReleaseDateEntry,
  Country,
  CreditsMovie,
  ExternalIds,
} from "@types";

export const getMovieDetails = async (
  mediaType: string,
  titleId: number
): Promise<IGetMovieDetailsResponse> => {
  let response: Response;

  // Get details
  response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${titleId}?language=en-US`,
    options
  );
  const details: MovieDetails & Partial<ITMDBError> = await response.json();
  if (!response.ok || details.success === false)
    throw new Error(details.status_message);
  // console.log("details: ", details);

  // Get origin country of movie
  response = await fetch(
    "https://api.themoviedb.org/3/configuration/countries?language=en-US",
    options
  );
  const countries: Country[] & Partial<ITMDBError> = await response.json();
  if (!response.ok || countries.success === false)
    throw new Error(countries.status_message);

  const originCountry = details.origin_country
    .map((code) => countries.find((country) => country.iso_3166_1 === code))
    .filter(
      (country): country is (typeof countries)[number] => country !== undefined
    );
  // console.log("originCountry: ", originCountry);

  // Get release date and certification
  response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${titleId}/release_dates`,
    options
  );
  const releaseDateApiResponse: ReleaseDatesResponse & Partial<ITMDBError> =
    await response.json();
  if (!response.ok || releaseDateApiResponse.success === false)
    throw new Error(releaseDateApiResponse.status_message);
  // console.log("releaseDate: ", releaseDate);

  let releaseInfo: ReleaseDateResult | null = null;

  // Try to find "US" release first
  const usRelease = releaseDateApiResponse.results.find(
    (item) => item.iso_3166_1 === "US"
  );
  if (usRelease) {
    releaseInfo = usRelease;
  } else {
    // Look for a production country match with valid certification
    releaseInfo =
      releaseDateApiResponse.results.find((item) => {
        const isProductionCountry = details.production_countries.some(
          (country) => country.iso_3166_1 === item.iso_3166_1
        );

        const hasValidCertification = item.release_dates.some(
          (rd: ReleaseDateEntry) =>
            rd.certification && rd.certification.trim() !== ""
        );

        return isProductionCountry && hasValidCertification;
      }) ?? null;
  }

  // Step 3: Extract the release_date and certification (if available)
  let releaseDateValue: string | null = null;
  let certification: string | null = null;

  if (releaseInfo) {
    const validEntry = releaseInfo.release_dates.find(
      (rd) => rd.certification && rd.certification.trim() !== ""
    );

    // If found a valid entry, use its release_date and certification
    if (validEntry) {
      releaseDateValue = validEntry.release_date;
      certification = validEntry.certification;
    } else {
      releaseInfo = releaseDateApiResponse.results[0];
      releaseDateValue = releaseInfo?.release_dates[0]?.release_date || "";
      certification = releaseInfo?.release_dates[0]?.certification || "";
    }
    // Otherwise, just get the very first result of releaseDate
  } else {
    releaseInfo = releaseDateApiResponse.results[0];
    releaseDateValue = releaseInfo?.release_dates[0]?.release_date || "";
    certification = releaseInfo?.release_dates[0]?.certification || "";
  }

  const countryCode = releaseInfo?.iso_3166_1 || null;

  const releaseDateCountry = countries.find(
    (c) => c.iso_3166_1 === countryCode
  );

  const releaseDateInfo: ReleaseDate = {
    iso_3166_1: releaseDateCountry,
    date: releaseDateValue,
    certification: certification,
  };

  // console.log("last releaseDate: ", releaseDate);

  // Get credits
  response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${titleId}/credits?language=en-US`,
    options
  );
  const credits: CreditsMovie & Partial<ITMDBError> = await response.json();
  if (!response.ok || credits.success === false)
    throw new Error(credits.status_message);

  // Get Images
  response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${titleId}/images`,
    options
  );
  const images: ImagesMovieResponse & Partial<ITMDBError> =
    await response.json();
  if (!response.ok || images.success === false)
    throw new Error(images.status_message);

  // Get videos
  response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${titleId}/videos?language=en-US`,
    options
  );
  const videos: VideosResponse & Partial<ITMDBError> = await response.json();
  if (!response.ok || videos.success === false)
    throw new Error(videos.status_message);

  // Get main trailer
  const trailers = videos.results
    .filter((v) => v.type === "Trailer" && v.official)
    .sort(
      (a, b) =>
        new Date(b.published_at ?? "").getTime() -
        new Date(a.published_at ?? "").getTime()
    );

  const teasers = videos.results
    .filter((v) => v.type === "Teaser" && v.official)
    .sort(
      (a, b) =>
        new Date(b.published_at ?? "").getTime() -
        new Date(a.published_at ?? "").getTime()
    );

  const officialTrailer = trailers[0] || teasers[0] || null;

  // Get External Ids
  response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${titleId}/external_ids`,
    options
  );
  const externalIds: ExternalIds & Partial<ITMDBError> = await response.json();
  if (!response.ok || externalIds.success === false)
    throw new Error(externalIds.status_message);

  // Get Reviews
  response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${titleId}/reviews?language=en-US`,
    options
  );
  const reviews: ReviewsResponse & Partial<ITMDBError> = await response.json();
  if (!response.ok || reviews.success === false)
    throw new Error(reviews.status_message);

  // Get Recommendations
  response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${titleId}/recommendations?language=en-US`,
    options
  );
  const recommendations: RecommendationsResponse & Partial<ITMDBError> =
    await response.json();
  if (!response.ok || recommendations.success === false)
    throw new Error(recommendations.status_message);

  const data = {
    details: details,
    releaseDate: releaseDateInfo,
    officialTrailer: officialTrailer,
    originCountry: originCountry,
    credits: credits,
    media: {
      videos: videos.results.reverse(),
      backdrops: images.backdrops,
      posters: images.posters,
    },
    externalIds: externalIds,
    reviews: reviews.results,
    recommendations: recommendations.results,
  };

  return data;
};
