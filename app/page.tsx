import { ContentMovies } from "@sections";

import { getTrending } from "@api/getTrending";

const Home = async ({mediaType="all", category="trending"}) => {
  const response = await getTrending(mediaType);
  const data = await response.json();
  
  if (!response.ok)
    throw new Error(data.error);

  return (
    <ContentMovies 
      data={data}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default Home;
