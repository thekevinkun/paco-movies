import { options } from "@lib/api/data";

export const getTrending = async (mediaType: string) => {
    if (mediaType === "stars") mediaType = "person";
    
    const response = await 
        fetch(`https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US`, options);

    const data = await response.json();
    
    if (!response.ok || data.success === false)
        throw new Error(data.status_message || "Failed to fetch trending");

    let firstResult: any = {};

    // Get first movie or tv data
    if (mediaType !== "person") {
        const getFirstData = data.results.slice(0, 1)[0];

        // Get video
        const response = await fetch(`https://api.themoviedb.org/3/${getFirstData.media_type}/${getFirstData.id}/videos?language=en-US`, options);
        const videos = await response.json();
        if (!response.ok || videos.success === false)
            throw new Error(videos.status_message);

        // Get main trailer
        const trailers = videos.results
            .filter((v: any) => v.type === "Trailer" && v.official)
            .sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

        const teasers = videos.results
            .filter((v: any) => v.type === "Teaser" && v.official)
            .sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

        const officialTrailer = trailers[0] || teasers[0] || null;

        firstResult = {
            result: getFirstData,
            officialTrailer: officialTrailer
        }
    }   

    return {
        page: data.page,
        firstResult: firstResult,
        results: data.results,
        total_pages: data.total_pages,
        total_results: data.total_results
    }; 
}