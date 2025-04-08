import { Metadata } from "next";

import { ContentMovies } from "@sections";

export const metadata: Metadata = {
  title: "TV Shows Popular — PacoMovies",
  description: "TV Show popular collection's page"
};

const TvPopular = async ({mediaType="tv", category="popular"}) => {

  return (
    <ContentMovies 
      mediaType={mediaType}
      category={category}
    />
  )
}

export default TvPopular;