import { Metadata } from "next";

import { ContentMovies } from "@sections";

export const metadata: Metadata = {
  title: "TV Shows — PacoMovies",
  description: "TV Show collection's page"
};

const Tv = async ({mediaType="tv", category="trending"}) => {

  return (
    <ContentMovies 
      mediaType={mediaType}
      category={category}
    />
  )
}

export default Tv;
