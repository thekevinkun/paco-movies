import { Metadata } from "next";

import { ContentStars } from "@sections";

import { getTrending } from "@lib/api";

export const metadata: Metadata = {
  title: "Stars — PacoMovies",
  description: "Star collection's page"
};

const Stars = async ({mediaType="stars", category="trending"}) => {
  const data = await getTrending(mediaType);

  return (
    <ContentStars 
      data={data}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default Stars;
