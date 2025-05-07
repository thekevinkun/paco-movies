"use server"

import { options } from "@lib/api/data";

import type {
    IGetMovieDetailsResponse,
    ITMDBError,
    MovieDetails,
    TvRatingResponse,
    VideosResponse,
    ImagesMovieResponse,
    ReviewsResponse,
    RecommendationsResponse,
    TvRatings,
    TvRatingResult,
    Country,
    CreditsMovie,
    ExternalIds,
} from "@types";

export const getTvDetails = async (mediaType: string, titleId: number): Promise<IGetMovieDetailsResponse> => {
    let response: Response;

    // Get details
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}?language=en-US`, options);
    const details: MovieDetails & Partial<ITMDBError> = await response.json();
    if (!response.ok || details.success === false) {
        throw new Error(details.status_message);
    }

    // Get origin country of movie
    response = await fetch("https://api.themoviedb.org/3/configuration/countries?language=en-US", options);
    const countries: Country[] & Partial<ITMDBError> = await response.json();
    if (!response.ok || countries.success === false)
        throw new Error(countries.status_message);

    const originCountry = details.origin_country
        .map((code) => countries.find((country) => country.iso_3166_1 === code))
        .filter((country): country is typeof countries[number] => country !== undefined);

    // rating certification
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/content_ratings`, options);
    const ratings: TvRatingResponse & Partial<ITMDBError> = await response.json();
    if (!response.ok || ratings.success === false) {
        throw new Error(ratings.status_message);
    }

    let ratingsInfo: TvRatingResult | null = null;

    // Try to find "US" release first
    const usRelease = ratings.results.find((item) => item.iso_3166_1 === "US");
    if (usRelease) {
        ratingsInfo = usRelease;
    } else {
        // Look for a production country match with valid certification
        ratingsInfo = ratings.results.find((item) =>
            details.production_countries.some(
              (country) => country.iso_3166_1 === item.iso_3166_1 && item.rating
            )
        ) ?? null;
    }

    // Otherwise, just get the very first result of releaseDate
    if (!ratingsInfo) {
        ratingsInfo = ratings.results[0];
    }

    const countryCode = ratingsInfo.iso_3166_1 || null;

    const releaseDateCountry = countries.find((c) => c.iso_3166_1 === countryCode);

    const tvRatingsInfo: TvRatings = {
        iso_3166_1: releaseDateCountry,
        rating: ratingsInfo.rating
    }

    // Get credits
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/credits?language=en-US`, options);
    const credits: CreditsMovie & Partial<ITMDBError> = await response.json();
    if (!response.ok || credits.success === false) {
        throw new Error(credits.status_message);
    }

    // Get Images
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/images`, options);
    const images: ImagesMovieResponse & Partial<ITMDBError> = await response.json();
    if (!response.ok || images.success === false) {
        throw new Error(images.status_message);
    }

    // Get videos
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/videos?language=en-US`, options);
    const videos: VideosResponse & Partial<ITMDBError> = await response.json();
    if (!response.ok || videos.success === false) {
        throw new Error(videos.status_message);
    }

    // Get main trailer
    const trailers = videos.results
        .filter((v) => v.type === "Trailer" && v.official)
        .sort((a, b) => new Date(b.published_at ?? "").getTime() - new Date(a.published_at ?? "").getTime());

    const teasers = videos.results
        .filter((v) => v.type === "Teaser" && v.official)
        .sort((a, b) => new Date(b.published_at ?? "").getTime() - new Date(a.published_at ?? "").getTime());
    
    const officialTrailer = trailers[0] || teasers[0] || null;

    // Get External Ids
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/external_ids`, options);
    const externalIds: ExternalIds & Partial<ITMDBError> = await response.json();
    if (!response.ok || externalIds.success === false) {
        throw new Error(externalIds.status_message);
    }

    // Get Reviews
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/reviews?language=en-US`, options);
    const reviews: ReviewsResponse & Partial<ITMDBError> = await response.json();
    if (!response.ok || reviews.success === false) {
        throw new Error(reviews.status_message);
    }

    // Get Recommendations
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/recommendations?language=en-US`, options);
    const recommendations: RecommendationsResponse & Partial<ITMDBError> = await response.json();
    if (!response.ok || recommendations.success === false) {
        throw new Error(recommendations.status_message);
    }

    const data = {
        details: details,
        ratings: tvRatingsInfo,
        officialTrailer: officialTrailer,
        originCountry: originCountry,
        credits: credits,
        media: {
            videos: videos.results.reverse(),
            backdrops: images.backdrops,
            posters: images.posters
        },
        externalIds: externalIds,
        reviews: reviews.results,
        recommendations: recommendations.results
    }

    return data;
}