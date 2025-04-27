"use server"

import { options } from "@lib/api/data";

export const getTvDetails = async (mediaType: string, titleId: number) => {
    let response: any = {};

    // Get details
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}?language=en-US`, options);
    const details = await response.json();
    if (!response.ok || details.success === false) {
        throw new Error(details.status_message);
    }

    // Get origin country of movie
    response = await fetch("https://api.themoviedb.org/3/configuration/countries?language=en-US", options);
    let countries = await response.json();
    if (!response.ok || countries.success === false)
        throw new Error(countries.status_message);

    const originCountry = details.origin_country
        .map((code: any) => countries.find((country: any) => country.iso_3166_1 === code))
        .filter((country: any): country is typeof countries[number] => country !== undefined);

    // rating certification
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/content_ratings`, options);
    let ratings = await response.json();
    if (!response.ok || ratings.success === false) {
        throw new Error(ratings.status_message);
    }

    if (ratings.results.length > 1) {
        ratings = ratings.results.filter((item: any) => {
            if (details.production_countries.some((c: any) => c.iso_3166_1 === "US")) {
                return item.iso_3166_1 === "US";
            } else {
                return details.production_countries.some((c: any) => {
                    if (c.iso_3166_1 === item.iso_3166_1) {
                        if (item.rating)
                            return item.iso_3166_1;
                    }
                    return false
                })
            }
        });
    } else {
        ratings = ratings.results;
    }

    let country = details.production_countries.map((country: any) => {
        if (country.iso_3166_1 === ratings[0].iso_3166_1)
            return country
        return ""
    })

    ratings = {
        descriptors: ratings[0].descriptors,
        iso_3166_1: ratings[0].iso_3166_1,
        name: country[0].name,
        rating: ratings[0].rating
    }

    // Get credits
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/credits?language=en-US`, options);
    const credits = await response.json();
    if (!response.ok || credits.success === false) {
        throw new Error(credits.status_message);
    }

    // Get Images
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/images`, options);
    const images = await response.json();
    if (!response.ok || images.success === false) {
        throw new Error(images.status_message);
    }

    // Get videos
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/videos?language=en-US`, options);
    const videos = await response.json();
    if (!response.ok || videos.success === false) {
        throw new Error(videos.status_message);
    }

    // Get External Ids
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/external_ids`, options);
    const externalIds = await response.json();
    if (!response.ok || externalIds.success === false) {
        throw new Error(externalIds.status_message);
    }

    // Get Reviews
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/reviews?language=en-US`, options);
    const reviews = await response.json();
    if (!response.ok || reviews.success === false) {
        throw new Error(reviews.status_message);
    }

    // Get Recommendations
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${titleId}/recommendations?language=en-US`, options);
    const recommendations = await response.json();
    if (!response.ok || recommendations.success === false) {
        throw new Error(recommendations.status_message);
    }

    const data = {
        details: details,
        ratings: ratings,
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