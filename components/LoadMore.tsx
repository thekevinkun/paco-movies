"use client"

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Image from "next/image";

import { getNextPage } from "@api";

const LoadMore = ({page, mediaType, category, query, onNextPage}: 
    {page: number, mediaType: string, category: string, query?: string, onNextPage: (items: any) => void}) => {

  const { ref, inView } = useInView();
  
  useEffect(() => {
    const loadNextPage = async (page: number) => {
      const data = await getNextPage(mediaType, category, query!, page);
      
      if (data.error)
        throw new Error(data.error);

      onNextPage(data);
    }

    if (inView) {
      loadNextPage(page + 1);
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="grow pb-10 flex flex-col items-center justify-center"
    >
      <Image
        priority
        unoptimized
        src="/icons/spinner.svg"
        alt="spinner"
        width={0}
        height={0}
        sizes="100vw"
        className="w-[50px] h-[50px] max-sm:w-[45px] max-sm:h-[45px] object-contain"
      />
    </div>
  )
}

export default LoadMore;