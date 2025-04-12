import { Metadata } from "next";

import { ContentStars } from "@sections";

import { getCategory } from "@api";

export const metadata: Metadata = {
  title: "Popular Stars — PacoMovies",
  description: "Popular stars collection's page"
};

const StarsPopular = async ({mediaType="stars", category="popular"}) => {
  const response = await getCategory(mediaType, category);
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

export default StarsPopular;