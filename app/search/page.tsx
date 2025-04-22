import { Metadata } from "next";

import { ContentSearch } from "@sections";

import { getSearch } from "@api";

export async function generateMetadata({ searchParams }: any): Promise<Metadata> {
    searchParams = await searchParams;
    const query = searchParams.query.replace(/-/g, "+");
    const title = query.replace(/\+/g, " ");
  
    return {
      title: title + " — PacoMovies",
      description: "Results of " + title
    };
  }

const Search = async ({searchParams, mediaType="multi"}: {searchParams: any, mediaType: string}) => {
  searchParams = await searchParams;
  const query = searchParams.query.replace(/-/g, "+");

  const searchResponse = await getSearch(mediaType, query);
  const searchData = await searchResponse.json();
  
  if (!searchResponse.ok)
    throw new Error(searchData.error);

  return (
    <ContentSearch 
      data={searchData} 
      mediaType={mediaType}
      query={query}
    />
  )
}

export default Search;