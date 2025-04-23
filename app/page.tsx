import { ContentMovies } from "@sections";

import { getCachedTrending } from "@lib/cache";

const Home = async ({mediaType="all", category="trending"}) => {
  const data = await getCachedTrending(mediaType, category);

  return (
    <ContentMovies 
      data={data}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default Home;
