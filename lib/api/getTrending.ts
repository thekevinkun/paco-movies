import { options } from "@lib/api/data";

import type { MediaItem, VideoItem, IGetByCategoryResponse } from "@types";

export const getTrending = async (
  mediaType: string
): Promise<IGetByCategoryResponse> => {
  if (mediaType === "stars") mediaType = "person";

  const response = await fetch(
    `https://api.themoviedb.org/3/trending/${mediaType}/day?language=en-US`,
    options
  );

  const data = await response.json();

  if (!response.ok || data.success === false)
    throw new Error(data.status_message || "Failed to fetch trending data.");

  if (!Array.isArray(data.results) || data.results.length === 0)
    throw new Error("No results found for this category.");

  let firstResult: IGetByCategoryResponse["firstResult"] = undefined;

  const firstItem: MediaItem = data.results[0];

  if (!firstItem || !firstItem.id)
    throw new Error("Invalid first result: missing ID or Media Type.");

  // Only get trailer for movie/tv (not person)
  if (firstItem.media_type !== "person") {
    // Get video
    const videoRes = await fetch(
      `https://api.themoviedb.org/3/${firstItem.media_type}/${firstItem.id}/videos?language=en-US`,
      options
    );
    const videoData = await videoRes.json();
    if (!videoRes.ok || videoData.success === false)
      throw new Error(videoData.status_message || "Failed to fetch videos.");

    // Get main trailer
    const trailers = (videoData.results as VideoItem[])
      .filter((v: VideoItem) => v.type === "Trailer" && v.official)
      .sort(
        (a, b) =>
          new Date(b.published_at ?? "").getTime() -
          new Date(a.published_at ?? "").getTime()
      );

    const teasers = (videoData.results as VideoItem[])
      .filter((v: VideoItem) => v.type === "Teaser" && v.official)
      .sort(
        (a, b) =>
          new Date(b.published_at ?? "").getTime() -
          new Date(a.published_at ?? "").getTime()
      );

    const officialTrailer = trailers[0] || teasers[0] || null;

    firstResult = {
      result: firstItem,
      officialTrailer: officialTrailer,
    };
  } else {
    firstResult = {
      result: firstItem,
      officialTrailer: null,
    };
  }

  return {
    page: data.page,
    firstResult: firstResult,
    results: data.results,
    total_pages: data.total_pages,
    total_results: data.total_results,
  };
};
