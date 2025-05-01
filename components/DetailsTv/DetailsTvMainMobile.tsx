import React from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { FaPlay } from "react-icons/fa";

import { FallbackImage } from "@components";

import { IDetailsTvMain } from "@types";
import { roundedToFixed, slugify } from "@helpers/helpers";

const getGenres = (mediaType: string, genres: any) => {
  return genres.map((genre: any) => (
    <React.Fragment key={genre.id}>
      <Link
        href={`/genre/${mediaType}/${genre.id}-${slugify(genre.name)}`}
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
        href={`/name/${item.id}-${slugify(item.name)}`}
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
        href={`/name/${item.id}-${slugify(item.name)}`}
        className="max-xl:text-sm hover:underline hover:text-tale"
      >
        <p>{item.name}</p>
      </Link>

      <span className="max-xl:text-sm bullet-separator"> &#8226; </span>
    </React.Fragment>
  ))
}

const DetailsTvMainMobile = ({id, mediaType, backdrop, poster, name, rating, releaseDate, 
      tvrating, status, networks, genres, tagline, overview, creators, stars}: IDetailsTvMain) => {
  
  const url = `/title/${mediaType}/${id}-${slugify(name)}`;

  return (
    <section className="hidden max-md:block">
      <div
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url("https://image.tmdb.org/t/p/w1280${backdrop}")`,
          }}
          className="relative w-full h-72 max-sm:h-64"
      >
        <div
          style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.5) calc((50vw - 170px) - 340px), rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.2) 100%)",
          }}
          className="w-full h-full absolute top-0 right-0"
        ></div>
      </div>
        
      <div className="relative pt-4 z-20">
        {/* TITLE */}
        <Link href={url}>
            <h2 className="text-main text-2xl text-center font-extrabold
                capitalize hover:text-tale"
            >
              {name}{" "}
              <span className="font-light">
                  {releaseDate &&
                  `(${moment(releaseDate).format("YYYY")})`}
              </span>
            </h2>
        </Link>

        {/* POSTER */}
        <div className="mt-5 mx-auto relative w-48 h-60 
            max-sm:w-40 max-sm:h-52 shadow-lg shadow-light/10 rounded-md"
        >
            <FallbackImage
              src={poster}
              mediaType={mediaType}
              alt="poster"
              fill
              sizes="(min-width: 640px) 192px, 208px"
              placeholder="blur"
              blurDataURL="/images/blur.jpg"
              className="object-cover rounded-md opacity-95"
            />
        </div>

        {/* RATING, NETWORKS & TRAILER */}
        <div className="pt-7 flex items-center justify-center">
          <div className="flex items-center gap-1">
            <Image
              src="/icons/star-2.svg"
              alt="Rating Star"
              width={29}
              height={29}
              sizes="29px"
              className="relative object-contain bottom-[1.7px]"
            />

            <span 
              className={`text-main text-lg 
              ${rating > 0 ? "font-semibold" : "font-normal italic"}`}
            >
              {rating > 0 ? roundedToFixed(rating, 1) : "NaN"}
            </span>
          </div>

          <div className="ml-10 flex items-center gap-1">
            {getNetworks(mediaType, networks)}
          </div>

          <Link
            href={`${url}#`}
            className="flex items-center gap-2 ml-10 text-main hover:text-light-2"
          >
            <FaPlay className="text-2xl"/>
            <span className="font-semibold">Play Trailer</span>
          </Link>
        </div>

          {/* FACTS */}
          <div 
            className="mt-7 py-4 bg-dark-2 border-y border-dark 
            text-light-1 font-normal flex flex-col items-center justify-center gap-1"
          >
            {tvrating && 
              <span className="text-sm font-medium bg-dark 
                  border border-gray-500 px-1"
              >
                  {tvrating}
              </span>
            }

            <div>
              {getGenres(mediaType, genres)}
            </div>  

            <span className="italic text-sm">
              {status}
            </span>
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

                <div className="flex items-center gap-2">
                    {getCreators(creators)}
                </div>
              </div>

              <div className="py-2 flex items-center font-semibold border-b border-gray-500">
                <h3 className="basis-[20%]">
                    Stars
                </h3>
                
                <div className="flex items-center gap-2">
                    {getStars(stars)}
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}

export default DetailsTvMainMobile;