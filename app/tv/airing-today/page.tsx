import { Metadata } from "next";

import { ContentMovies } from "@sections";

export const metadata: Metadata = {
  title: "TV Shows Airing Today — PacoMovies",
  description: "TV Show airing today collection's page"
};

const TvAiringToday = async ({mediaType="tv", category="airing_today"}) => {

  return (
    <ContentMovies 
      mediaType={mediaType}
      category={category}
    />
  )
}

export default TvAiringToday;
