import { Metadata } from "next";

import { ContentMovies } from "@sections";

export const metadata: Metadata = {
  title: "Top Rated Movies — PacoMovies",
  description: "Top rated movie collection's page"
};

const TopRatedMovie = async ({mediaType="movie", category="top_rated"}) => {

  return (
    <ContentMovies 
      mediaType={mediaType}
      category={category}
    />
  )
}

export default TopRatedMovie;