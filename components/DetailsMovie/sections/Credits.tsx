import React from "react";
import Link from "next/link";
import Image from "next/image";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { MdArrowForwardIos } from "react-icons/md";

const getCasts = (casts: any) => {
  return (
    <div className="grid grid-cols-2 gap-y-5">
      {casts.slice(0, 18).map((cast: any) => (
        <div key={cast.id} className="flex items-center gap-5">
          <Link 
            href={`/name/${cast.id + "-" + cast.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`} 
            className="w-32 h-32 bg-dark rounded-full group"
          >
            <Image
              priority
              unoptimized
              loader={() => cast.profile_path &&`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
              src={cast.profile_path ? `https://image.tmdb.org/t/p/w500${cast.profile_path}` 
                : "/images/not-found-person.png"}
              alt="Poster"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full object-cover rounded-full 
                opacity-90 transition-opacity duration-200 group-hover:opacity-55"
            />
          </Link>

          <div>
            <Link 
              href={`/name/${cast.id + "-" + cast.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}
              className="text-main hover:text-tale"
            >
              <p>{cast.name}</p>
            </Link>

            <p className="font-light text-main-1 text-sm">{cast.character}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const getCastsMobile = (casts: any) => {
  return casts.slice(0, 11).map((cast: any) => (
    <div 
      key={cast.id} 
      className="keen-slider__slide flex-shrink-0"
    >
      <div className="flex flex-col gap-3">
        <Link 
          href={`/name/${cast.id + "-" + cast.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`} 
          className="bg-black rounded-full group"
        >
          <Image
            priority
            unoptimized
            loader={() => cast.profile_path &&`https://image.tmdb.org/t/p/original${cast.profile_path}`}
            src={cast.profile_path ? `https://image.tmdb.org/t/p/original${cast.profile_path}` 
              : "/images/not-found-person.png"}
            alt="Poster"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full aspect-square object-cover rounded-full 
              opacity-90 transition-opacity duration-200 group-hover:opacity-55"
          />
        </Link>

        <div className="text-center">
          <Link 
            href={`/name/${cast.id + "-" + cast.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}
            className="text-main hover:text-tale max-sm:text-sm"
          >
            <p>{cast.name}</p>
          </Link>

          <p className="pt-[2px] font-light text-main-1 text-xs max-sm:text-[0.65rem]">
            {cast.character}
          </p>
        </div>
      </div>
    </div>
  ))
}

const getDirector = (crews: any) => {
  const director = crews.find((person: any) => person.job === "Director");

  return (
    <Link 
      href={`/name/${director.id + "-" 
        + director.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`} 
      className="text-main hover:underline hover:text-tale max-md:text-sm max-sm:text-xs"> 

      <p>
        {director.name}
      </p>
    </Link>
  )
}

const getWriters = (crews: any) => {
  return crews.filter((person: any) => person.job === "Writer" 
      || person.job === "Screenplay" || person.job === "Characters").slice(0, 3)
      .map((item: any) => (
    <React.Fragment key={item.id}>
      <Link 
        href={`/name/${item.id + "-" + item.name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`} 
        className="text-main hover:underline hover:text-tale max-md:text-sm max-sm:text-xs">

        <p>{item.name}</p>
      </Link>

      <span className="bullet-separator text-main max-md:text-sm max-sm:text-xs"> &#8226; </span>
    </React.Fragment>
  ))
}

const Credits = ({movieId, mediaType, title, casts, crews}: 
    {movieId: number, mediaType: string, title: string, casts: any, crews: any}) => {
  
  const [sliderRef] = useKeenSlider({
    loop: false,
    breakpoints: {
      "(max-width: 640px)": {
        slides: { perView: 3.25, spacing: 12 },
      },
    },
    slides: {
      perView: 4.25,
      spacing: 12
    },
    mode: "free-snap"
  })
  
  return (
    <>
      <Link 
        href={`/title/${mediaType}/${movieId + "-" 
          + title.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}/fullcredits`} 
        className="group flex items-center w-fit"
      >
        <h3 className="text-main text-2xl max-sm:text-xl font-semibold">Top Cast</h3>
        <span className="pl-3 text-xs text-main-1">{casts.length > 99 ? "99+" : casts.length}</span>
        
        <MdArrowForwardIos 
          className="text-main text-3xl max-sm:text-2xl font-semibold 
            transition-colors duration-200 group-hover:text-tale"
        />
      </Link>
      
      {/* CASTS DESKTOP */}
      <div className="pt-7 max-md:hidden">
        {getCasts(casts)}
      </div>

      {/* CASTS MOBILE */}
      <div 
        className="hidden max-md:block relative pt-7 overflow-hidden 
          max-md:h-full max-w-full"
      >
        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {getCastsMobile(casts)}
        </div>
      </div>

      {/* CREWS CREDITS */}
      <div className="pt-7 max-sm:pt-5 w-[90%] max-md:w-[100%]">
        <div className="py-3 flex items-center font-semibold border-y border-gray-500">
          <h3 className="basis-[17%] max-lg:basis-[20%] 
              text-main text-lg max-md:text-base max-sm:text-sm">
            Director
          </h3>

          {getDirector(crews)}
        </div>

        <div className="py-3 flex items-center font-semibold border-b border-gray-500">
          <h3 className="basis-[17%] max-lg:basis-[20%]
              text-main text-lg max-md:text-base max-sm:text-sm">
            Writers
          </h3>
      
          <div className="flex items-center gap-2">
            {getWriters(crews)}
          </div>
        </div>

        <div className="py-3 font-semibold border-b border-gray-500">
          <Link 
            href={`/title/${mediaType}/${movieId + "-" 
              + title?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}/fullcredits`}
            className="text-main hover:text-tale max-sm:text-sm flex items-center justify-between"
          >
            <h3>All cast & crew</h3>
            <MdArrowForwardIos className="text-lg max-md:text-base font-semibold"/>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Credits;