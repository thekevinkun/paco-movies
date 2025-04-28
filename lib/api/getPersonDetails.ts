"use server"

import { options } from "@lib/api/data";

export const getPersonDetails = async (mediaType: string, nameId: number) => {
    let response: any = {};

    // Get details
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${nameId}?language=en-US`, options);
    const details = await response.json();
    if (!response.ok || details.success === false) {
        throw new Error(details.status_message);
    }

    // Get credits
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${nameId}/combined_credits?language=en-US`, options);
    const credits = await response.json();
    if (!response.ok || credits.success === false) {
        throw new Error(credits.status_message);
    }

    const cast = credits.cast.map((obj: any) => {
        if (obj.first_air_date) {
            obj.release_date = obj.first_air_date
            delete obj.first_air_date
        }
        return obj;
    })

    const crew = credits.crew.map((obj: any) => {
        if (obj.first_air_date) {
            obj.release_date = obj.first_air_date
            delete obj.first_air_date
        }
        return obj;
    })

    // Get images
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${nameId}/images`, options);
    const images = await response.json();
    if (!response.ok || images.success === false) {
        throw new Error(images.status_message);
    }

    // Get contacts
    response = await fetch(`https://api.themoviedb.org/3/${mediaType}/${nameId}/external_ids`, options);
    const externalIds = await response.json();
    if (!response.ok || externalIds.success === false) {
        throw new Error(externalIds.status_message);
    }

    const data = {
        details: details,
        credits: {
            cast: cast.sort((a: any, b: any) => {
                if (a.release_date === "") return 1;
                if (b.release_date === "") return -1;

                const dateA = new Date(a.release_date).getTime();
                const dateB = new Date(b.release_date).getTime();

                if (dateA === dateB) return 0;
                return dateB - dateA;
            }),
            crew: crew.sort((a: any, b: any) => {
                if (a.release_date === "") return 1;
                if (b.release_date === "") return -1;

                const dateA = new Date(a.release_date).getTime();
                const dateB = new Date(b.release_date).getTime();

                if (dateA === dateB) return 0;
                return dateB - dateA;
            })
        },
        images: images.profiles,
        externalIds: externalIds
    }

    return data;
}