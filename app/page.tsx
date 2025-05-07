import { ContentMoviesClient } from "@components/Clients";

import { getCachedTrending } from "@lib/cache";

export const dynamic = "force-dynamic";

const Home = async () => {
  const mediaType="all";
  const category="trending";
  
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
