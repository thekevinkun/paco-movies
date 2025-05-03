import { ContentMoviesClient } from "@components/Clients";

import { getCachedTrending } from "@lib/cache";

const Home = async ({mediaType="all", category="trending"}) => {
  const data = await getCachedTrending(mediaType, category);

  return (
    <ContentMoviesClient 
      data={data}
      mediaType={mediaType}
      category={category}
    />
  )
}

export default Home;
