import type { Metadata } from "next";

import { ContentStarsClient } from "@components/Clients";

import { getCachedTrending } from "@lib/redis";

export const metadata: Metadata = {
  title: "Stars — PacoMovies",
  description: "Discover popular stars around the world.",
};

export const dynamic = "force-dynamic";

const Stars = async () => {
  const mediaType = "stars";
  const category = "popular";

  const data = await getCachedTrending(mediaType, category);

  return (
    <ContentStarsClient data={data} mediaType={mediaType} category={category} />
  );
};

export default Stars;
