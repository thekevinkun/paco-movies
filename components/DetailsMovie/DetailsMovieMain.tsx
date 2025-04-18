import React from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { FaPlay } from "react-icons/fa";

import { IDetailsMovieMain } from "@types";
import { convertRuntime, roundedToFixed } from "@helpers/helpers";

const getGenres = (mediaType: string, genres: any) => {
  return genres.map((genre: any) => (
    <React.Fragment key={genre.id}>
      <Link
        href={`/genre/${mediaType}/${genre.id + "-" + genre.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}
        className="inline-block text-sm max-xl:text-xs max-lg:text-sm 
            font-normal hover:text-tale"
      >
        {genre.name}
      </Link>
      <span className="bullet-separator text-sm max-xl:text-xs max-lg:text-sm font-normal"> &#8226; </span>
    </React.Fragment>
  ))
}

const getDirector = (crew: any) => {
  const director = crew.find((person: any) => person.job === "Director");

  return (
    <Link 
      href={`/name/${director.id + "-" + director.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`} 
      className="hover:underline hover:text-tale"
    > 
      <p>{director.name}</p>
    </Link>
  )
}

const getWriters = (crew: any) => {
  return crew.filter((person: any) => person.job === "Writer" || person.job === "Screenplay" 
        || person.job === "Characters").slice(0, 3).map((item: any) => (
    
    <React.Fragment key={item.id}>
      <Link 
        href={`/name/${item.id + "-" + item.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`} 
        className="hover:underline hover:text-tale"
      >
        <p>{item.name}</p>
      </Link>

      <span className="bullet-separator"> &#8226; </span>
    </React.Fragment>
  ))
}

const getStars = (cast: any) => {
  return cast.slice(0, 3).map((item: any) => (
    <React.Fragment key={item.id}>
      <Link 
        href={`/name/${item.id + "-" + item.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`} 
        className="hover:underline hover:text-tale"
      >
        <p>{item.name}</p>
      </Link>

      <span className="bullet-separator"> &#8226; </span>
    </React.Fragment>
  ))
}

const DetailsMovieMain = ({id, mediaType, backdrop, poster, title, rating, releaseDate, 
    country, certification, runtime, genres, tagline, overview, credits}: IDetailsMovieMain) => {
  
  return (
    <section
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${backdrop}")`,
      }}
      className="relative w-full h-full max-h max-md:hidden"
    >
      {/* Background image gradient */}
      <div
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.7) calc((50vw - 170px) - 340px), rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0.5) 100%)",
        }}
        className="w-full h-full absolute top-0 right-0"
      ></div>

      {/* ALL INFORMATION */}
      <div className="relative pt-10 pb-16 max-lg:pb-20 px-5 z-40">
        <div className="flex gap-10">
          {/* POSTER */}
          <Image
            priority
            unoptimized
            loader={() => poster && `https://image.tmdb.org/t/p/original${poster}`}
            src={poster ? `https://image.tmdb.org/t/p/original${poster}` : 
                  "/images/not-found-poster.jpg"}
            alt="Poster"
            width={0}
            height={0}
            sizes="100vw"
            className="w-[285px] h-[415px] max-lg:w-[235px] max-lg:h-[320px]
              object-cover rounded-md opacity-95"
          />

          <div className="flex-1">
            {/* TITLE */}
            <Link href={`/title/${mediaType}/${id + "-" + title.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}>
              <h2 className="text-white text-2xl font-extrabold capitalize hover:text-tale">
                {title}{" "}
                <span className="font-light">
                  {releaseDate &&
                    `(${moment(releaseDate).format("YYYY")})`}
                </span>
              </h2>
            </Link>

            {/* FACTS */}
            <div className="pt-1 text-white font-normal flex items-center gap-2 max-xl:gap-1">
              {/* MOVIE RATE & RELEASE DATE COUNTRY */}
              <div className="flex items-center gap-2 max-xl:gap-1">
                <span className="text-sm max-lg:text-base 
                    font-medium bg-dark border border-slate-100 px-1"
                >
                  {certification}
                </span>

                <span className="text-sm max-xl:text-xs max-lg:text-sm">
                  {releaseDate && `${moment(releaseDate).format("L")}`}    
                  {` (${country.iso_3166_1})`}
                </span>
              </div>
              
              <span>|</span>
              
              {/* SHOW GENRES */}
              <div>
                {getGenres(mediaType, genres)}
              </div>

              <span>|</span>
              
              {/* RUNTIME */}
              <span className="text-sm max-xl:text-xs max-lg:text-sm">
                {convertRuntime(runtime)}
              </span>
            </div>

            {/* RATING & TRAILER */}
            <div className="pt-9 flex items-center">
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/star-2.svg"
                  alt="Rating Star"
                  width={32}
                  height={32}
                  className="relative object-contain bottom-[1.7px]"
                />
    
                <span className="text-white text-lg font-semibold">
                  {rating > 0 ? roundedToFixed(rating, 1) : "N"}
                </span>
              </div>

              <Link
                href={`/title/${mediaType}/${id + "-" + title.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}#`}
                className="flex items-center gap-2 ml-10 text-white hover:text-gray-400"
              >
                <FaPlay className="text-2xl"/>
                <span className="font-semibold">Play Trailer</span>
              </Link>
            </div>

            {/* TAGLINE */}
            <div className="pt-7">
              <h3 className="text-lg italic text-slate-200">{tagline}</h3>
            </div>

            {/* OVERVIEW */}
            <div className="text-white pt-5">
              <h3 className="text-lg font-semibold">Overview</h3>
              <p className="pt-2 font-normal">{overview}</p>
            </div>

            {/* CREDITS */}
            <div className="pt-7 text-white">
              {/* DIRECTOR */}
              <div className="py-2 flex items-center font-semibold border-b border-slate-100">
                <h3 className="basis-[15%] max-xl:basis-[25%] max-lg:basis-[15%] text-lg max-xl:text-base">
                  Director
                </h3>

                {getDirector(credits.crew)}
              </div>
              
              {/* WRITERS */}
              <div className="py-2 flex items-center font-semibold border-b border-slate-100">
                <h3 className="basis-[15%] max-xl:basis-[25%] max-lg:basis-[15%] text-lg max-xl:text-base">
                  Writers
                </h3>
                
                <div className="flex items-center gap-2">
                  {getWriters(credits.crew)}
                </div>
              </div>
              
              {/* STARS */}
              <div className="py-2 flex items-center font-semibold border-b border-slate-100">
                <h3 className="basis-[15%] max-xl:basis-[25%] max-lg:basis-[15%] text-lg max-xl:text-base">
                  Stars
                </h3>

                <div className="flex items-center gap-2">
                  {getStars(credits.cast)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetailsMovieMain;