import { Metadata } from "next";

import { ContentMovies } from "@sections";

export const metadata: Metadata = {
  title: "Popular Stars — PacoMovies",
  description: "Popular stars collection's page"
};

const TvPopular = async ({mediaType="stars", category="popular"}) => {

  return (
    <ContentMovies 
      mediaType={mediaType}
      category={category}
    />
  )
}

export default TvPopular;