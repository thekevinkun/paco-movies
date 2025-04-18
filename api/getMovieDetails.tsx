"use server"

import { options } from "@api/data";

export const getMovieDetails = async (mediaType: string, titleId: number) => {
    try {
        let response: any = {};

        // Get details
        response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}?language=en-US`, options);
        const details = await response.json();
        if (details.success === false) {
            throw new Error(details.status_message);
        }

        // Get release date and certification
        response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/release_dates`, options);
        let releaseDate = await response.json();
        if (releaseDate.success === false) {
            throw new Error(releaseDate.status_message);
        }

        releaseDate = releaseDate.results.filter((item: any) => {
            if (details.production_countries.some((c: any) => c.iso_3166_1 === "US")) {
                return item.iso_3166_1 === "US";
            } else {
                return details.production_countries.some((c: any) => {
                    if (c.iso_3166_1 === item.iso_3166_1) {
                        let checkCertification = item.release_dates.filter((cr: any) => cr.certification !== "");
                        if (checkCertification.length > 0)
                            return item.iso_3166_1;
                    }
                    return false
                })
            }
        });
        let country = details.production_countries.filter((country: any) => {
            if (country.iso_3166_1 === releaseDate[0].iso_3166_1)
                return country
            return false
        })
        releaseDate = {
            iso_3166_1: country[0],
            release_date: releaseDate[0].release_dates.filter((item: any) => item.certification !== "").slice(0, 1)[0]
        }

        // Get credits
        response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/credits?language=en-US`, options);
        const credits = await response.json();
        if (credits.success === false) {
            throw new Error(credits.status_message);
        }

        // Get Images
        response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/images`, options);
        const images = await response.json();
        if (images.success === false) {
            throw new Error(images.status_message);
        }

        // Get videos
        response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/videos?language=en-US`, options);
        const videos = await response.json();
        if (videos.success === false) {
            throw new Error(videos.status_message);
        }

        // Get External Ids
        response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/external_ids`, options);
        const externalIds = await response.json();
        if (externalIds.success === false) {
            throw new Error(externalIds.status_message);
        }

        // Get Reviews
        response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/reviews?language=en-US`, options);
        const reviews = await response.json();
        if (reviews.success === false) {
            throw new Error(reviews.status_message);
        }

        // Get Recommendations
        response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/recommendations?language=en-US`, options);
        const recommendations = await response.json();
        if (recommendations.success === false) {
            throw new Error(recommendations.status_message);
        }

        const data = {
            details: details,
            releaseDate: releaseDate,
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

        return new Response(JSON.stringify(data), {status: 200});
    } catch (error) {
        return new Response(JSON.stringify({error: error}), {status: 500});
    } 
}