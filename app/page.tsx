import { ContentMovies } from "@sections";

const Home = async ({mediaType="all", category="trending"}) => {

  return (
    <ContentMovies 
      mediaType={mediaType}
      category={category}
    />
  )
}

export default Home;
