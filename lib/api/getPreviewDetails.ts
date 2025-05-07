"use server"

import { options } from "@lib/api/data";

import type {
    IGetPreviewDetailsResponse,
    ITMDBError,
    MovieDetails,
    ReleaseDatesResponse,
    ReleaseDatePreview,
    ReleaseDateResult,
    TvRatingResponse,
    TvRatings,
    TvRatingResult,
    CreditsMovie,
} from "@types";

export const getPreviewDetails = async (mediaType: string, titleId: number): Promise<IGetPreviewDetailsResponse> => {
    let response: Response;

    // Get details
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}?language=en-US`, options);
    const details: MovieDetails & Partial<ITMDBError> = await response.json();
    if (!response.ok || details.success === false)
        throw new Error(details.status_message);

    let releaseDateApiResponse: ReleaseDatesResponse & Partial<ITMDBError> | null = null;
    let ratings: TvRatingResponse & Partial<ITMDBError> | null = null;

    let releaseDateInfo: ReleaseDatePreview | null = null;
    let tvRatingsInfo: TvRatings | null = null;

    if (mediaType === "movie") {
        // Get release date and certification
        response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/release_dates`, options);
        releaseDateApiResponse = await response.json();
        if (!response.ok || releaseDateApiResponse?.success === false)
            throw new Error(releaseDateApiResponse?.status_message);

        let releaseInfo: ReleaseDateResult | null = null;
    
        // Try to find "US" release first
        const usRelease = releaseDateApiResponse?.results.find((item) => item.iso_3166_1 === "US");
        if (usRelease) {
            releaseInfo = usRelease;
        } else {
            // Look for a production country match with valid certification
            releaseInfo = releaseDateApiResponse?.results.find((item) => {
                const isProductionCountry = details.production_countries.some(
                    (country) => country.iso_3166_1 === item.iso_3166_1
                );
            
                const hasValidCertification = item.release_dates.some(
                    (rd) => rd.certification && rd.certification.trim() !== ""
                );
            
                return isProductionCountry && hasValidCertification;
            }) ?? null;
        }
    
        // Extract the release_date and certification (if available)
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
            }
        // Otherwise, just get the very first result of releaseDate
        } else {
            releaseInfo = releaseDateApiResponse?.results[0] ?? null;
            releaseDateValue = releaseInfo?.release_dates[0].release_date ?? null;
            certification = releaseInfo?.release_dates[0].certification ?? null;
        }
    
        releaseDateInfo = {
            iso_3166_1: releaseInfo?.iso_3166_1 ?? null,
            date: releaseDateValue,
            certification: certification
        };

    } else {
        // rating certification
        response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/content_ratings`, options);
        ratings = await response.json();
        if (!response.ok || ratings?.success === false) {
            throw new Error(ratings?.status_message);
        }
       
        let ratingsInfo: TvRatingResult | null = null;

        // Try to find "US" release first
        const usRelease = ratings?.results.find((item) => item.iso_3166_1 === "US");
        if (usRelease) {
            ratingsInfo = usRelease;
        } else {
            // Look for a production country match with valid certification
            ratingsInfo = ratings?.results.find((item) =>
                details.production_countries.some(
                    (country) => country.iso_3166_1 === item.iso_3166_1 && item.rating
                )
            ) ?? null;
        }

        // Otherwise, just get the very first result of releaseDate
        if (!ratingsInfo) {
            ratingsInfo = ratings?.results[0] ?? null;
        }

        tvRatingsInfo = {
            iso_3166_1: ratingsInfo?.iso_3166_1 ?? "",      
            rating: ratingsInfo?.rating ?? ""
        }
    }

    // Get credits
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/credits?language=en-US`, options);
    const credits: CreditsMovie & Partial<ITMDBError> = await response.json();
    if (!response.ok || credits.success === false)
        throw new Error(credits.status_message);


    return mediaType === "movie" ? {
        details: details,
        releaseDate: releaseDateInfo,
        credits: credits
    } :{
        details: details,
        ratings: tvRatingsInfo,
        credits: credits};
}