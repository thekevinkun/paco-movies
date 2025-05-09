import React from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { FaPlay } from "react-icons/fa";

import { FallbackImage, VideoAction } from "@components";

import type { IDetailsMainProps } from "@types";

import { convertRuntime, roundedToFixed, slugify } from "@lib/helpers/helpers";

import {
  CreditList,
  GenreList,
  NetworkList,
  Director,
} from "@components/Common";

const DetailsMain = ({
  id,
  mediaType,
  backdrop,
  poster,
  title,
  rating,
  releaseDate,
  officialTrailer,
  genres,
  tagline,
  overview,
  credits,
  country,
  certification,
  runtime,
  tvrating,
  status,
  networks,
  creators,
}: IDetailsMainProps) => {
  const url = `/title/${mediaType}/${id}-${slugify(title)}`;

  return (
    <section
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url("https://image.tmdb.org/t/p/w1280${backdrop}")`,
      }}
      className="relative w-full h-auto max-md:hidden"
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
      <div className="relative pt-10 pb-16 px-5 z-20">
        <div className="flex gap-10">
          {/* POSTER */}
          <div
            className="relative w-[285px] h-[415px] 
                        max-xl:w-[250px] max-xl:h-[345px]
                        max-lg:w-[235px] max-lg:h-[320px]
                        shadow-lg shadow-light/20 rounded-md"
          >
            <FallbackImage
              src={poster}
              mediaType={mediaType}
              alt="poster"
              fill
              sizes="(min-width: 1280px) 285px,
                                (min-width: 1024px) 250px, 235px"
              placeholder="blur"
              blurDataURL="/images/blur.jpg"
              className="object-cover rounded-md opacity-95"
            />
          </div>

          <div className="flex-1">
            {/* TITLE */}
            <Link href={url} className="inline-block w-fit">
              <h2
                className="text-light text-2xl
                                font-extrabold capitalize hover:text-tale"
              >
                {title}{" "}
                <span className="font-light">
                  {releaseDate && `(${moment(releaseDate).format("YYYY")})`}
                </span>
              </h2>
            </Link>

            {/* FACTS */}
            <div
              className="pt-1 text-light font-normal
                            flex items-center gap-2 max-xl:gap-1"
            >
              {/* MOVIE TV RATE & RELEASE DATE COUNTRY */}
              {mediaType === "movie" && releaseDate ? (
                <div className="flex items-center gap-2 max-xl:gap-1">
                  {certification && (
                    <span
                      className="px-1 text-sm max-lg:text-base 
                                            font-medium bg-dark border border-gray-500"
                    >
                      {certification}
                    </span>
                  )}

                  <span className="text-sm max-xl:text-xs max-lg:text-sm">
                    {releaseDate && `${moment(releaseDate).format("L")}`}
                    {` (${country?.iso_3166_1 ?? ""})`}
                  </span>

                  <span>|</span>
                </div>
              ) : (
                <>
                  {tvrating && (
                    <>
                      <span
                        className="px-1 text-sm max-lg:text-base 
                                            font-medium bg-dark border border-gray-500"
                      >
                        {tvrating}
                      </span>

                      <span>|</span>
                    </>
                  )}
                </>
              )}

              {/* SHOW GENRES */}
              <div>
                <GenreList
                  mediaType={mediaType}
                  genres={genres}
                  containerStyles="text-sm max-xl:text-xs max-lg:text-sm"
                  childStyles="text-sm max-xl:text-xs max-lg:text-sm"
                />
              </div>

              {/* RUNTIME MOVIE or TV STATUS AIR */}
              {mediaType === "movie" &&
                typeof runtime === "number" &&
                runtime > 0 && (
                  <>
                    <span>|</span>

                    <span className="text-sm max-xl:text-xs max-lg:text-sm">
                      {convertRuntime(runtime)}
                    </span>
                  </>
                )}

              {mediaType === "tv" && status && (
                <>
                  <span>|</span>
                  <span className="italic text-sm max-xl:text-xs max-lg:text-sm">
                    {status}
                  </span>
                </>
              )}
            </div>

            {/* RATING, NETWORKS & TRAILER */}
            <div className="pt-9 flex items-center">
              {/* RATING */}
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/star-2.svg"
                  alt="rating star"
                  width={32}
                  height={32}
                  sizes="32px"
                  className="relative object-contain bottom-[1.7px]"
                />

                <span
                  className={`text-light text-lg
                                    ${
                                      rating > 0
                                        ? "font-semibold"
                                        : "font-normal italic"
                                    }`}
                >
                  {rating > 0 ? roundedToFixed(rating, 1) : "NaN"}
                </span>
              </div>

              {/* TV NETWORKS */}
              {mediaType === "tv" && networks && (
                <div className="ml-10 flex items-center gap-2">
                  <NetworkList
                    mediaType={mediaType}
                    networks={networks}
                    containerStyles="w-[53px] h-[30px]"
                  />
                </div>
              )}

              {/* PLAY TRAILER */}
              {officialTrailer && (
                <VideoAction
                  href={`${url}#play=${officialTrailer.key}`}
                  videoKey={officialTrailer.key}
                  videoTitle={officialTrailer.name}
                  containerStyles="py-1 px-1.5 flex items-center gap-2 ml-10
                                        bg-transparent text-light hover:bg-tale/80 rounded-md
                                        transition-colors duration-100"
                >
                  <FaPlay className="text-2xl" />
                  <span className="font-semibold">Play Trailer</span>
                </VideoAction>
              )}
            </div>

            {/* TAGLINE */}
            <div className="pt-7">
              <h3
                className="text-lg max-xl:text-sm
                                italic text-light-1"
              >
                {tagline}
              </h3>
            </div>

            {/* OVERVIEW */}
            <div className="text-light pt-5">
              <h3 className="text-lg font-semibold">Overview</h3>
              <p className="pt-2 font-normal max-xl:text-sm">{overview}</p>
            </div>

            {/* CREDITS */}
            <div className="pt-7 text-light">
              {/* DIRECTOR or CREATORS */}
              {mediaType === "movie" && credits.crew.length > 0 && (
                <div
                  className="py-2 flex items-baseline font-semibold
                                    border-b border-gray-500"
                >
                  <h3
                    className="basis-[15%] max-xl:basis-[20%] 
                                        max-lg:basis-[15%] text-lg max-xl:text-base"
                  >
                    Director
                  </h3>

                  <Director
                    crews={credits.crew}
                    childStyles="max-xl:text-sm max-sm:text-xs"
                  />
                </div>
              )}

              {mediaType === "tv" && creators && creators.length > 0 && (
                <div
                  className="py-2 flex items-baseline font-semibold
                                    border-b border-gray-500"
                >
                  <h3
                    className="basis-[15%] max-xl:basis-[20%] 
                                        max-lg:basis-[15%] text-lg max-xl:text-base"
                  >
                    Creators
                  </h3>

                  <div className="flex items-center gap-2">
                    <CreditList
                      items={creators ?? []}
                      childStyles="max-xl:text-sm max-sm:text-xs"
                    />
                  </div>
                </div>
              )}

              {/* WRITERS */}
              {mediaType === "movie" && credits.crew.length > 0 && (
                <div
                  className="py-2 flex items-baseline font-semibold
                                    border-b border-gray-500"
                >
                  <h3
                    className="basis-[15%] max-xl:basis-[20%] 
                                        max-lg:basis-[15%] text-lg max-xl:text-base"
                  >
                    Writers
                  </h3>

                  <div className="flex flex-wrap items-center gap-2">
                    <CreditList
                      items={credits.crew}
                      filterJobs={["Writer", "Screenplay", "Characters"]}
                      childStyles="max-xl:text-sm max-sm:text-xs"
                    />
                  </div>
                </div>
              )}

              {/* STARS */}
              {credits.cast.length > 0 && (
                <div
                  className="py-2 flex items-baseline font-semibold
                                    border-b border-gray-500"
                >
                  <h3
                    className="basis-[15%] max-xl:basis-[20%] 
                                        max-lg:basis-[15%] text-lg max-xl:text-base"
                  >
                    Stars
                  </h3>

                  <div className="flex flex-wrap items-center gap-2">
                    <CreditList
                      items={credits.cast}
                      childStyles="max-xl:text-sm max-sm:text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsMain;
