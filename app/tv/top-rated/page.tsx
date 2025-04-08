import { Metadata } from "next";

import { ContentMovies } from "@sections";

export const metadata: Metadata = {
  title: "TV Shows Top Rated — PacoMovies",
  description: "TV Show top rated collection's page"
};

const TvTopRated = async ({mediaType="tv", category="top_rated"}) => {

  return (
    <ContentMovies 
      mediaType={mediaType}
      category={category}
    />
  )
}

export default TvTopRated;