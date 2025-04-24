"use client"

import { useEffect, useState } from "react";
import { useMenu } from "@contexts/MenuContext";

import { CardSearch, MotionDiv, LoadMore } from "@components";

import { parentStaggerVariants } from "@lib/utils/motion";
import { dedupeResults } from "@helpers/helpers";

const ContentSearch = ({ data, mediaType, query }: 
    {data: any, mediaType: string, query: string}) => {

  const { handleChangeMediaType, handleChangeCategory } = useMenu();
  const [useData, setUseData] = useState<any>(data);

  const handleNextPage = (newData: any) => {
    const oldResults = useData.results;
    
    data = newData;
    data.results = [...oldResults, ...newData.results];

    const uniqueResults = dedupeResults(data.results);
    data.results = uniqueResults;

    setUseData(data);
  }
  
  useEffect(() => {
    setUseData(data);
  }, [query])

  useEffect(() => {
    handleChangeMediaType(mediaType);
    handleChangeCategory("search");
  }, [])

  return (
    <section className="flex-1 mt-20 max-md:mt-[72px] px-6 max-lg:px-5 max-md:px-3.5">
      <h2 className="text-main text-lg font-normal">
        <span className="font-semibold">
            Results for: {" "}  
        </span>{query?.replace(/\+/g, " ")}
      </h2>
      
      { useData.results.length === 0 ?
        <div className="h-[75vh] flex flex-col items-center justify-center">
          <h2 className="font-medium text-lg text-danger text-center">
            Sorry, but nothing matched your search criteria. 
            <br/>
            Please try again with some different keywords.
          </h2>
        </div>
      :
        <MotionDiv 
          variants={parentStaggerVariants}
          initial="hidden"
          animate="visible"className="pt-4 pb-12 flex flex-col"
        >
          {useData?.results.map((item: any) => (
            <CardSearch
              key={item.id}
              id={item.id}
              name={item.title || item.name}
              photo={item.poster_path || item.profile_path}
              mediaType={item.media_type}
              releaseDate={item.release_date || item.first_air_date}
              vote={item.vote_average || item.popularity}
              overview={item.overview}
              department={item.known_for_department}
              works={item.known_for}
            />
          ))}
        </MotionDiv>
      }
      
      { useData?.page < useData?.total_pages &&
        <LoadMore 
            page={useData.page}
            mediaType={mediaType}
            category={"search"}
            query={query}
            onNextPage={handleNextPage}
        />
      } 
    </section>
  )
}

export default ContentSearch;