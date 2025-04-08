import { Metadata } from "next";

import { ContentMovies } from "@sections";

export const metadata: Metadata = {
  title: "TV Shows On The Air — PacoMovies",
  description: "TV show on the air collection's page"
};

const TvOnTheAir = async ({mediaType="tv", category="on_the_air"}) => {

  return (
    <ContentMovies 
      mediaType={mediaType}
      category={category}
    />
  )
}

export default TvOnTheAir;