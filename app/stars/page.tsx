import { Metadata } from "next";

import { ContentStars } from "@sections";

import { getTrending } from "@server/api";

export const metadata: Metadata = {
  title: "Stars — PacoMovies",
  description: "Star collection's page"
};

const Stars = async ({mediaType="stars", category="trending"}) => {
  const response = await getTrending(mediaType);
  const data = await response.json();

  if (!response.ok)
    throw new Error(data.error);

  return (
    <ContentStars 
      data={data}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default Stars;
