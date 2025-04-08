import { Metadata } from "next";

import { ContentMovies } from "@sections";

export const metadata: Metadata = {
  title: "Movies — PacoMovies",
  description: "Movie collection's page"
};

const Movie = async ({mediaType="movie", category="trending"}) => {

  return (
    <ContentMovies 
      mediaType={mediaType}
      category={category}
    />
  )
}

export default Movie;
