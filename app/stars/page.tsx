import { Metadata } from "next";

import { ContentMovies } from "@sections";

export const metadata: Metadata = {
  title: "Stars — PacoMovies",
  description: "Star collection's page"
};

const Stars = async ({mediaType="stars", category="trending"}) => {

  return (
    <ContentMovies 
      mediaType={mediaType}
      category={category}
    />
  )
}

export default Stars;
