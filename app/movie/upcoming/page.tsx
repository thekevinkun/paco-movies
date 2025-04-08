import { Metadata } from "next";

import { ContentMovies } from "@sections";

export const metadata: Metadata = {
  title: "Upcoming Movies — PacoMovies",
  description: "Upcoming movie collection's page"
};

const UpcomingMovie = async ({mediaType="movie", category="upcoming"}) => {

  return (
    <ContentMovies 
      mediaType={mediaType}
      category={category}
    />
  )
}

export default UpcomingMovie;