import { Metadata } from "next";

import { ContentMovies } from "@sections";

export const metadata: Metadata = {
  title: "Now Playing Movies — PacoMovies",
  description: "Now playing movie collection's page"
};

const NowPlayingMovie = async ({mediaType="movie", category="now_playing"}) => {

  return (
    <ContentMovies 
      mediaType={mediaType}
      category={category}
    />
  )
}

export default NowPlayingMovie;
