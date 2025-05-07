import type { Metadata } from "next";

import { ContentSearchClient } from "@components/Clients";

import { getSearch } from "@lib/api";

// REQUIRED to avoid build/runtime param bugs
export async function generateStaticParams() {
  return []; // Prevents runtime "await params" error
}

export async function generateMetadata({ searchParams }: {searchParams: Promise<{ query?: string }>}): Promise<Metadata> {
  const { query = "" } = await searchParams;
  const newQuery = query.replace(/-/g, "+");
  const title = newQuery.replace(/\+/g, " ");
  
    return {
      title: title + " — PacoMovies",
      description: "Results of " + title
    };
  }

const Search = async ({ searchParams }: {searchParams: Promise<{ query?: string }>}) => {
  const mediaType = "multi";
  const { query = "" } = await searchParams;
  const queryData = query.replace(/-/g, "+");
  const newQuery = queryData.replace(/\+/g, " ");

  const searchData = await getSearch(mediaType, queryData);

  return (
    <ContentSearchClient 
      data={searchData} 
      mediaType={mediaType}
      query={newQuery || ""}
    />
  )
}

export default Search;