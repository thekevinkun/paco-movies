import { Metadata } from "next";

import { ContentStarsClient } from "@components/Clients";

import { getCategory } from "@lib/api";

export const metadata: Metadata = {
  title: "Popular Stars — PacoMovies",
  description: "Popular stars collection's page"
};

const StarsPopular = async ({mediaType="stars", category="popular"}) => {
  const data = await getCategory(mediaType, category);

  return (
    <ContentStarsClient
      data={data}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default StarsPopular;