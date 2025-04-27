import React from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { FallbackImage } from "@components";
import { FaPlay } from "react-icons/fa";

import { IDetailsTvMain } from "@types";
import { roundedToFixed } from "@helpers/helpers";

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

const getNetworks = (mediaType: string, networks: any) => {
  return networks.map((network: any) => (
    <Link 
      key={network.id} 
      href="#" 
      className="bg-white p-1 rounded-sm w-[53px] h-[30px]"
    >
      <FallbackImage 
        src={network.logo_path}
        mediaType={mediaType}
        alt="logo"
        width={0}
        height={0}
        sizes="53px"
        className="w-full h-full object-contain"
      />
    </Link>
  ))
}

const getCreators = (creators: any) => {
  return creators?.slice(0, 3).map((item: any) => (
    <React.Fragment key={item.id}>
      <Link 
        href={`/name/${item.id + "-" + item.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`} 
        className="max-xl:text-sm hover:underline hover:text-tale"
      >
        <p>{item.name}</p>
      </Link>

      <span className="max-xl:text-sm bullet-separator"> &#8226; </span>
    </React.Fragment>
  ))
}

const getStars = (stars: any) => {
  return stars.slice(0, 3).map((item: any) => (
    <React.Fragment key={item.id}>
      <Link 
        href={`/name/${item.id + "-" + item.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`} 
        className="max-xl:text-sm hover:underline hover:text-tale"
      >
        <p>{item.name}</p>
      </Link>

      <span className="max-xl:text-sm bullet-separator"> &#8226; </span>
    </React.Fragment>
  ))
}

const DetailsTvMain = ({id, mediaType, backdrop, poster, name, rating, releaseDate, 
      tvrating, status, networks, genres, tagline, overview, creators, stars}: IDetailsTvMain) => {
  
  return (
    <section
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url("https://image.tmdb.org/t/p/w1280${backdrop}")`,
      }}
      className="relative w-full h-svh max-md:hidden"
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
      <div className="relative pt-10 pb-2 px-5 z-40">
        <div className="flex gap-10">
          {/* POSTER */}
          <div className="relative w-[285px] h-[415px] 
              max-xl:w-[250px] max-xl:h-[345px]
              max-lg:w-[235px] max-lg:h-[320px]
              shadow-lg shadow-light/20 rounded-md"
          >
            <FallbackImage
              src={poster}
              mediaType={mediaType}
              alt="poster"
              fill
              sizes="(max-width: 1024px) 235px,
                      (max-width: 1280px) 250px,
                      285px"
              placeholder="blur"
              blurDataURL="/images/blur.jpg"
              className="object-cover rounded-md opacity-95"
            />
          </div>

          <div className="flex-1">
            {/* TITLE */}
            <Link href={`/title/${mediaType}/${id + "-" + name?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}>
              <h2 className="text-light text-2xl font-extrabold capitalize hover:text-tale">
                {name}{" "}
                <span className="font-light">
                  {releaseDate &&
                    `(${moment(releaseDate).format("YYYY")})`}
                </span>
              </h2>
            </Link>

            {/* FACTS */}
            <div className="pt-1 text-light font-normal flex items-center gap-2 max-xl:gap-1">
              {/* TV RATE */}
              {tvrating && 
                <span className="text-sm max-lg:text-base 
                    font-medium bg-dark border border-gray-500 px-1"
                >
                  {tvrating}
                </span>
              }
              
              {/* SHOW GENRES */}
              <span>|</span>
              <div>
                {getGenres(mediaType, genres)}
              </div>
              
              {/* STATUS AIR */}
              <span>|</span>
              <span className="italic text-sm max-xl:text-xs max-lg:text-sm">
                {status}
              </span>
            </div>

            {/* RATING, NETWORKS & TRAILER */}
            <div className="pt-9 flex items-center">
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/star-2.svg"
                  alt="Rating Star"
                  width={32}
                  height={32}
                  sizes="32px"
                  className="relative object-contain bottom-[1.7px]"
                />
    
                <span 
                  className={`text-light text-lg
                  ${rating > 0 ? "font-semibold" : "font-normal italic"}`}
                >
                  {rating > 0 ? roundedToFixed(rating, 1) : "NaN"}
                </span>
              </div>
              
              <div className="ml-10 flex items-center gap-2">
                {getNetworks(mediaType, networks)}
              </div>

              <Link
                href={`/title/${mediaType}/${id + "-" + name?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}#`}
                className="flex items-center gap-2 ml-10 text-light hover:text-light-2"
              >
                <FaPlay className="text-2xl"/>
                <span className="font-semibold">Play Trailer</span>
              </Link>
            </div>

            {/* TAGLINE */}
            <div className="pt-7">
              <h3 className="text-lg max-xl:text-sm italic text-light-1">{tagline}</h3>
            </div>

            {/* OVERVIEW */}
            <div className="text-light pt-5">
              <h3 className="text-lg font-semibold">Overview</h3>
              <p className="pt-2 font-normal max-xl:text-sm">
                {overview}
              </p>
            </div>

            {/* CREDITS */}
            <div className="pt-7 text-light">
              {/* DIRECTOR */}
              <div className="py-2 flex items-center font-semibold border-b border-gray-500">
                <h3 className="basis-[15%] max-xl:basis-[20%] max-lg:basis-[15%]
                  text-lg max-xl:text-base"
                >
                  Creator
                </h3>

                <div className="flex items-center gap-2">
                  {getCreators(creators)}
                </div> 
              </div>
              
              {/* STARS */}
              <div className="py-2 flex items-center font-semibold border-b border-gray-500">
                <h3 className="basis-[15%] max-xl:basis-[20%] max-lg:basis-[15%]
                  text-lg max-xl:text-base"
                >
                  Stars
                </h3>

                <div className="flex items-center gap-2">
                  {getStars(stars)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetailsTvMain;