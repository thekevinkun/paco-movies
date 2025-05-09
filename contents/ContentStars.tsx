"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMenu } from "@contexts/MenuContext";

import { Spinner, MotionDiv } from "@components";

import { IContentStarsProps, IGetStarsResponse } from "@types";

import { dedupeResults } from "@lib/helpers/helpers";
import { parentStaggerVariants } from "@lib/utils/motion";

const CardPerson = dynamic(() => import("@components/Card/CardPerson"), {
  ssr: false,
  loading: () => <Spinner />,
});
const LoadMore = dynamic(() => import("@components/LoadMore"), {
  ssr: false,
  loading: () => null,
});

const ContentStars = ({ data, mediaType, category }: IContentStarsProps) => {
  const { handleChangeMediaType, handleChangeCategory } = useMenu();
  const [useData, setUseData] = useState<IGetStarsResponse>(data);

  const handleNextPage = (newData: IGetStarsResponse) => {
    const oldResults = useData?.results;
    const combinedResults = [...oldResults, ...newData.results];
    const uniqueResults = dedupeResults(combinedResults);

    setUseData({
      ...newData,
      results: uniqueResults,
    });
  };

  useEffect(() => {
    handleChangeMediaType(mediaType ?? "");
    handleChangeCategory(category ?? "");
  }, []);

  const [columns, setColumns] = useState(3); // Default to desktop (4 columns)

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkSize = () => {
      const width = window.innerWidth;

      if (width <= 768) {
        setColumns(2); // Tablet to mobile
      } else if (width <= 1024) {
        setColumns(3); // Tablet
      } else if (width <= 1280) {
        setColumns(2);
      } else {
        setColumns(3); // Desktop
      }
    };

    checkSize(); // Initial run
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Hero movie shown only on desktop
  const remainder = useData?.results.length % columns;
  const placeholders = remainder === 0 ? 0 : columns - remainder;

  return (
    <section className="relative mt-14 max-md:mt-14 px-6 max-lg:px-5 max-md:px-3.5">
      <MotionDiv
        variants={parentStaggerVariants}
        initial="hidden"
        animate="visible"
        className="pt-8 pb-12 grid grid-rows-1 grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-3 
          max-md:grid-cols-2 gap-x-3 gap-y-10 max-md:gap-x-5 max-md:gap-y-7 max-sm:gap-x-4"
      >
        {useData?.results.map((item) => (
          <CardPerson
            key={item.id}
            id={item.id}
            name={item.name ?? ""}
            photo={item.profile_path}
            department={item.known_for_department}
            popularity={item.popularity ?? 0}
            works={item.known_for}
          />
        ))}

        {/* Add invisible placeholders for last empty column */}
        {Array.from({ length: placeholders }).map((_, i) => (
          <div key={`placeholder-${i}`} className="invisible" />
        ))}
      </MotionDiv>

      {useData?.page < useData?.total_pages && (
        <LoadMore
          page={useData.page}
          mediaType={mediaType}
          category={category ?? ""}
          onNextPage={handleNextPage}
        />
      )}
    </section>
  );
};

export default ContentStars;
