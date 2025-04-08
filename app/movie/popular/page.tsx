import { Metadata } from "next";

import { ContentMovies } from "@sections";

export const metadata: Metadata = {
  title: "Popular Movies — PacoMovies",
  description: "Popular movie collection's page"
};

const PopularMovie = async ({mediaType="movie", category="popular"}) => {

  return (
    <ContentMovies 
      mediaType={mediaType}
      category={category}
    />
  )
}

export default PopularMovie;