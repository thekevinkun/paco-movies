"use client";

import React from "react";
import { useEffect } from "react";
import { useMenu } from "@contexts/MenuContext";

import { CardMovieTop, CardMovie, LoadMore } from "@components";

const ContentMovies = ({ mediaType, category }: {mediaType: string, category: string}) => {
  const { handleChangeMediaType, handleChangeCategory } = useMenu();

  useEffect(() => {
    handleChangeMediaType(mediaType);
    handleChangeCategory(category);
  }, [])
  
  return (
    <section className="mt-20 px-6 max-lg:px-5 max-md:px-3.5">
      <div className="flex h-[410px] max-md:hidden">
        <CardMovieTop />
      </div>

      <div className="grid grid-rows-1 grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-2 
            gap-x-3 gap-y-5 max-md:gap-x-1.5 max-md:gap-y-3.5 pt-8 pb-12">
          <CardMovie />
          <CardMovie />
          <CardMovie />
      </div>

      <LoadMore />
    </section>
  )
}

export default ContentMovies;