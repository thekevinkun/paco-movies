import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { FaPlay } from "react-icons/fa";

import { convertRuntime, roundedToFixed } from "@helpers/helpers";
import { IDetailsMovieMain } from "@types";

const getGenres = (mediaType: string, genres: any) => {
    return genres.map((genre: any) => (
      <Fragment key={genre.id}>
        <Link
          href={`/genre/${mediaType}/${genre.id + "-" + genre.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}
          className="inline-block text-sm font-normal hover:text-tale"
        >
          {genre.name}
        </Link>
        <span className="bullet-separator text-sm font-normal"> &#8226; </span>
      </Fragment>
    ))
}
  
const getDirector = (crews: any) => {
    const director = crews.find((person: any) => person.job === "Director");
  
    return (
      <Link 
        href={`/name/${director.id + "-" + director.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`} 
        className="hover:underline hover:text-tale"
      > 
        <p className="text-sm max-sm:text-xs">
            {director.name}
        </p>
      </Link>
    )
}
  
const getWriters = (crews: any) => {
    return crews.filter((person: any) => person.job === "Writer" || person.job === "Screenplay" 
          || person.job === "Characters").slice(0, 3).map((item: any) => (
      
      <React.Fragment key={item.id}>
        <Link 
          href={`/name/${item.id + "-" + item.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`} 
          className="hover:underline hover:text-tale"
        >
          <p className="text-sm max-sm:text-xs">
            {item.name}
          </p>
        </Link>
  
        <span className="bullet-separator text-sm max-sm:text-xs"> &#8226; </span>
      </React.Fragment>
    ))
  }
  
const getStars = (casts: any) => {
    return casts.slice(0, 3).map((item: any) => (
      <Fragment key={item.id}>
        <Link 
            href={`/name/${item.id + "-" + item.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`} 
            className="hover:underline hover:text-tale"
        >
          <p className="text-sm max-sm:text-xs">
            {item.name}
          </p>
        </Link>
        <span className="bullet-separator text-sm max-sm:text-xs"> &#8226; </span>
      </Fragment>
    ))
}

const DetailsMovieMainMobile = ({id, mediaType, backdrop, poster, title, rating, releaseDate, 
    country, certification, runtime, genres, overview, credits}: IDetailsMovieMain) => {
  return (
    <section className="hidden max-md:block">
        <div
            style={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url("https://image.tmdb.org/t/p/original${backdrop}")`,
                }}
              className="relative w-full h-64"
        >
            <div
                style={{
                backgroundImage:
                    "linear-gradient(to right, rgba(0, 0, 0, 0.5) calc((50vw - 170px) - 340px), rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.2) 100%)",
                }}
                className="w-full h-full absolute top-0 right-0"
            ></div>

            {/* POSTER */}
            <div className="p-3 w-52 h-full max-sm:w-44">
                <Image
                    priority
                    unoptimized
                    loader={() => poster && `https://image.tmdb.org/t/p/original${poster}`}
                    src={poster ? `https://image.tmdb.org/t/p/original${poster}` 
                            : "/assets/images/not-found-poster.jpg"}
                    alt="Poster"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full object-cover rounded-md opacity-95"
                />
            </div>
        </div>

        <div className="relative pt-4 z-40">
            {/* TITLE */}
            <Link href={`/title/${mediaType}/${id + "-" + title.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}>
                <h2 className="text-main text-2xl text-center font-extrabold capitalize hover:text-tale">
                    {title}{" "}
                    <span className="font-light">
                        {releaseDate &&
                        `(${moment(releaseDate).format("YYYY")})`}
                    </span>
                </h2>
            </Link>
            
            {/* RATING & TRAILER */}
            <div className="pt-7 flex items-center justify-center">
                <div className="flex items-center gap-1">
                    <Image
                        src="/icons/star-2.svg"
                        alt="Rating Star"
                        width={29}
                        height={29}
                        className="relative object-contain bottom-[1.7px]"
                    />

                    <span className="text-main text-lg font-semibold">
                        {rating > 0  ? roundedToFixed(rating, 1) : "N"}
                    </span>
                </div>

                <Link
                    href={`/title/${mediaType}/${id + "-" + title.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}#`}
                    className="flex items-center gap-2 ml-10 text-main hover:text-light-2"
                >
                    <FaPlay className="text-2xl"/>
                    <span className="font-semibold">Play Trailer</span>
                </Link>
            </div>

            {/* FACTS */}
            <div className="mt-7 py-4 bg-dark-2 border-y border-dark 
                    text-light-1 font-normal flex flex-col items-center justify-center gap-1">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium bg-dark border border-gray-500 px-1">
                        {certification}
                    </span>

                    <span className="text-sm">
                        {releaseDate && `${moment(releaseDate).format("L")}`}    
                        {` (${country.iso_3166_1})`}
                    </span>
                </div>
                
                <span className="text-sm">
                    {convertRuntime(runtime)}
                </span>

                <div>
                    {getGenres(mediaType, genres)}
                </div>  
            </div>

            {/* OVERVIEW */}
            <div className="px-3 pt-7">
                <div>
                    <h3 className="text-main text-lg font-semibold">
                        Overview
                    </h3>
                    <p className="text-main pt-2 text-sm font-normal">
                        {overview}
                    </p>
                </div>

                {/* CREDITS */}
                <div className="pt-7 text-main">
                    <div className="py-2 flex items-center font-semibold border-b border-gray-500">
                        <h3 className="basis-[20%]">
                            Director
                        </h3>

                        {getDirector(credits.crew)}
                    </div>

                    <div className="py-2 flex items-center font-semibold border-b border-gray-500">
                        <h3 className="basis-[20%]">
                            Writers
                        </h3>
                        
                        <div className="flex items-center gap-2">
                            {getWriters(credits.crew)}
                        </div>
                    </div>

                    <div className="py-2 flex items-center font-semibold border-b border-gray-500">
                        <h3 className="basis-[20%]">
                            Stars
                        </h3>

                        <div className="flex items-center gap-2">
                            {getStars(credits.cast)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default DetailsMovieMainMobile;