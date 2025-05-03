import { Metadata } from "next";

import { ContentStarsClient } from "@components/Clients";

import { getCachedTrending } from "@lib/cache";

export const metadata: Metadata = {
  title: "Stars — PacoMovies",
  description: "Stars collection's page"
};

const Stars = async ({mediaType="stars", category="popular"}) => {
  const data = await getCachedTrending(mediaType, category);
  
  return (
    <ContentStarsClient
      data={data}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default Stars;