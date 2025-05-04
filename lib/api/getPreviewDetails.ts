"use server"

import { options } from "@lib/api/data";

export const getPreviewDetails = async (mediaType: string, titleId: number) => {
    let response: any = {};

    // Get details
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}?language=en-US`, options);
    const details = await response.json();
    if (!response.ok || details.success === false)
        throw new Error(details.status_message);

    let releaseDate: any = null;
    let ratings: any = null;

    if (mediaType === "movie") {
        // Get release date and certification
        response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/release_dates`, options);
        releaseDate = await response.json();
        if (!response.ok || releaseDate.success === false)
            throw new Error(releaseDate.status_message);

        let releaseInfo: any = null;
    
        // Try to find "US" release first
        const usRelease = releaseDate.results.find((item: any) => item.iso_3166_1 === "US");
        if (usRelease) {
            releaseInfo = usRelease;
        } else {
            // Look for a production country match with valid certification
            releaseInfo = releaseDate.results.find((item: any) => {
                const isProductionCountry = details.production_countries.some(
                    (country: any) => country.iso_3166_1 === item.iso_3166_1
                );
            
                const hasValidCertification = item.release_dates.some(
                    (rd: any) => rd.certification && rd.certification.trim() !== ""
                );
            
                return isProductionCountry && hasValidCertification;
            });
        }
    
        // Extract the release_date and certification (if available)
        let releaseDateValue: string | null = null;
        let certification: string | null = null;
        
        if (releaseInfo) {
            const validEntry = releaseInfo.release_dates.find(
                (rd: any) => rd.certification && rd.certification.trim() !== ""
            );
            
            // If found a valid entry, use its release_date and certification
            if (validEntry) {
                releaseDateValue = validEntry.release_date;
                certification = validEntry.certification;
            }
        // Otherwise, just get the very first result of releaseDate
        } else {
            releaseInfo = releaseDate.results[0];
            releaseDateValue = releaseInfo.release_dates[0].release_date;
            certification = releaseInfo.release_dates[0].certification;
        }
    
        releaseDate = {
            iso_3166_1: releaseInfo.iso_3166_1,
            date: releaseDateValue,
            certification: certification
        };

    } else {
        // rating certification
        response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/content_ratings`, options);
        ratings = await response.json();
        if (!response.ok || ratings.success === false) {
            throw new Error(ratings.status_message);
        }
       
        let ratingsInfo: any = null;

        // Try to find "US" release first
        const usRelease = ratings.results.find((item: any) => item.iso_3166_1 === "US");
        if (usRelease) {
            ratingsInfo = usRelease;
        } else {
            // Look for a production country match with valid certification
            ratingsInfo = ratings.results.find((item: any) =>
                details.production_countries.some(
                    (country: any) => country.iso_3166_1 === item.iso_3166_1 && item.rating
                )
            );
        }

        // Otherwise, just get the very first result of releaseDate
        if (!ratingsInfo) {
            ratingsInfo = ratings.results[0];
        }

        ratings = {
            iso_3166_1: ratingsInfo.iso_3166_1,
            rating: ratingsInfo.rating
        }
    }

    // Get credits
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/credits?language=en-US`, options);
    const credits = await response.json();
    if (!response.ok || credits.success === false)
        throw new Error(credits.status_message);

    let data: any = {};
    
    if (mediaType === "movie") {
        data = {
            details: details,
            releaseDate: releaseDate,
            credits: credits,
        }
    } else {
        data = {
            details: details,
            ratings: ratings,
            credits: credits,
        }
    }

    return data;
}