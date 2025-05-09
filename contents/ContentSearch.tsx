"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMenu } from "@contexts/MenuContext";

import { Spinner, MotionDiv } from "@components";

import { IContentSearchProps, IGetSearchResponse } from "@types";

import { dedupeResults } from "@lib/helpers/helpers";
import { parentStaggerVariants } from "@lib/utils/motion";

const CardSearch = dynamic(() => import("@components/Card/CardSearch"), {
  ssr: false,
  loading: () => <Spinner />,
});
const LoadMore = dynamic(() => import("@components/LoadMore"), {
  ssr: false,
  loading: () => null,
});

const ContentSearch = ({ data, mediaType, query }: IContentSearchProps) => {
  const { handleChangeMediaType, handleChangeCategory } = useMenu();
  const [useData, setUseData] = useState<IGetSearchResponse>(data);

  const handleNextPage = (newData: IGetSearchResponse) => {
    const oldResults = useData.results;
    const combinedResults = [...oldResults, ...newData.results];
    const uniqueResults = dedupeResults(combinedResults);

    setUseData({
      ...newData,
      results: uniqueResults,
    });
  };

  useEffect(() => {
    setUseData(data);
  }, [query]);

  useEffect(() => {
    handleChangeMediaType(mediaType);
    handleChangeCategory("search");
  }, []);

  return (
    <section className="relative flex-1 mt-20 max-md:mt-[80px] px-6 max-lg:px-5 max-md:px-3.5">
      <h2 className="text-main text-lg font-normal">
        <span className="font-semibold">Results for: </span>
        {query?.replace(/\+/g, " ")}
      </h2>

      {useData.results.length === 0 ? (
        <div className="h-[75vh] flex flex-col items-center justify-center">
          <h2 className="font-medium text-lg text-danger text-center">
            Sorry, but nothing matched your search criteria.
            <br />
            Please try again with some different keywords.
          </h2>
        </div>
      ) : (
        <MotionDiv
          variants={parentStaggerVariants}
          initial="hidden"
          animate="visible"
          className="pt-4 pb-12 flex flex-col"
        >
          {useData?.results.map((item) => (
            <CardSearch
              key={item.id}
              id={item.id}
              name={item.title || item.name || "Untitled"}
              photo={item.poster_path || item.profile_path}
              mediaType={item.media_type ?? ""}
              releaseDate={item.release_date || item.first_air_date || ""}
              vote={
                item.media_type === "person"
                  ? item.popularity ?? 0
                  : item.vote_average ?? 0
              }
              overview={item.overview}
              department={item.known_for_department}
              works={item.known_for}
            />
          ))}
        </MotionDiv>
      )}

      {useData?.page < useData?.total_pages && (
        <LoadMore
          page={useData.page}
          mediaType={mediaType}
          category={"search"}
          query={query}
          onNextPage={handleNextPage}
        />
      )}
    </section>
  );
};

export default ContentSearch;
