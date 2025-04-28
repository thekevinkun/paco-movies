"use client"

import { useEffect, useState } from "react";
import { useMenu } from "@contexts/MenuContext";

import { CardPerson, MotionDiv, LoadMore } from "@components";

import { dedupeResults } from "@helpers/helpers";
import { parentStaggerVariants } from "@lib/utils/motion";

const ContentStars = ({ data, mediaType, category }: 
    {data: any, mediaType: string, category: string}) => {

  const { handleChangeMediaType, handleChangeCategory } = useMenu();
  const [useData, setUseData] = useState<any>(data);

  const handleNextPage = (newData: any) => {
    const oldResults = useData.results;
    const combinedResults = [...oldResults, ...newData.results];
    const uniqueResults = dedupeResults(combinedResults);

    setUseData({
      ...newData,
      results: uniqueResults,
    });
  }

  useEffect(() => {
    handleChangeMediaType(mediaType);
    handleChangeCategory(category);
  }, [])

  return (
    <section className="relative z-20 mt-14 max-md:mt-12 px-6 max-lg:px-5 max-md:px-3.5">
      <MotionDiv 
        variants={parentStaggerVariants}
        initial="hidden"
        animate="visible" 
        className="grid grid-rows-1 grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-3 
          max-md:grid-cols-2 gap-x-3 gap-y-10 max-md:gap-x-5 max-md:gap-y-7 pt-8 pb-12"
      >
        {useData?.results.map((item: any) => (
          <CardPerson
            key={item.id}
            id={item.id}
            name={item.name}
            photo={item.profile_path}
            department={item.known_for_department}
            popularity={item.popularity}
            works={item.known_for}
          />
        ))}
      </MotionDiv>
      
      {useData?.page < useData?.total_pages &&
        <LoadMore 
          page={useData.page}
          mediaType={mediaType}
          category={category}
          onNextPage={handleNextPage}
        />
      }
    </section>
  )
}

export default ContentStars;