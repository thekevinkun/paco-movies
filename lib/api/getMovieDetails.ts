"use server"

import { options } from "@lib/api/data";

export const getMovieDetails = async (mediaType: string, titleId: number) => {
    let response: any = {};

    // Get details
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}?language=en-US`, options);
    const details = await response.json();
    if (!response.ok || details.success === false)
        throw new Error(details.status_message);
    // console.log("details: ", details);

    // Get origin country of movie
    response = await fetch("https://api.themoviedb.org/3/configuration/countries?language=en-US", options);
    let countries = await response.json();
    if (!response.ok || countries.success === false)
        throw new Error(countries.status_message);

    const originCountry = details.origin_country
        .map((code: any) => countries.find((country: any) => country.iso_3166_1 === code))
        .filter((country: any): country is typeof countries[number] => country !== undefined);
    // console.log("originCountry: ", originCountry);

    // Get release date and certification
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/release_dates`, options);
    let releaseDate = await response.json();
    if (!response.ok || releaseDate.success === false)
        throw new Error(releaseDate.status_message);
    // console.log("releaseDate: ", releaseDate);

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

    // Step 3: Extract the release_date and certification (if available)
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
    }

    const countryCode = releaseInfo?.iso_3166_1 || null;
    
    const releaseDateCountry = countries.find((c: any) => c.iso_3166_1 === countryCode);

    releaseDate = {
        iso_3166_1: releaseDateCountry,
        date: releaseDateValue,
        certification: certification
    };

    // console.log("last releaseDate: ", releaseDate);
    
    // Get credits
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/credits?language=en-US`, options);
    const credits = await response.json();
    if (!response.ok || credits.success === false)
        throw new Error(credits.status_message);

    // Get Images
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/images`, options);
    const images = await response.json();
    if (!response.ok || images.success === false)
        throw new Error(images.status_message);

    // Get videos
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/videos?language=en-US`, options);
    const videos = await response.json();
    if (!response.ok || videos.success === false)
        throw new Error(videos.status_message);

    // Get External Ids
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/external_ids`, options);
    const externalIds = await response.json();
    if (!response.ok || externalIds.success === false)
        throw new Error(externalIds.status_message);

    // Get Reviews
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/reviews?language=en-US`, options);
    const reviews = await response.json();
    if (!response.ok || reviews.success === false)
        throw new Error(reviews.status_message);

    // Get Recommendations
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/recommendations?language=en-US`, options);
    const recommendations = await response.json();
    if (!response.ok || recommendations.success === false)
        throw new Error(recommendations.status_message);

    const data = {
        details: details,
        releaseDate: releaseDate,
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