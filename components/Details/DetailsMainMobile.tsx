import React from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { FaPlay } from "react-icons/fa";

import { FallbackImage, VideoAction } from "@components";
import {
  GenreList,
  NetworkList
} from "@components/Common";

import type { IDetailsMainProps } from "@types";

import { convertRuntime, roundedToFixed, slugify } from "@lib/helpers/helpers";

const DetailsMainMobile = ({
  id,
  mediaType,
  backdrop,
  poster,
  title,
  rating,
  releaseDate,
  officialTrailer,
  genres,
  overview,
  country,
  certification,
  runtime,
  tvrating,
  status,
  networks
}: IDetailsMainProps) => {
  const url = `/title/${mediaType}/${id}-${slugify(title)}`;

  return (
    <section className="hidden max-md:block max-md:mt-2">
      <div
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url("https://image.tmdb.org/t/p/w780${backdrop}")`,
        }}
        className="relative w-full h-96 max-sm:h-80 max-xs:h-64"
      >
        {/* Background image gradient */}
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
        <Link href={url} className="block w-fit mx-auto px-5">
          <h2
            className="text-main text-2xl text-center font-extrabold
                        capitalize hover:text-tale"
          >
            {title}{" "}
            <span className="font-light">
              {releaseDate && `(${moment(releaseDate).format("YYYY")})`}
            </span>
          </h2>
        </Link>

        {/* POSTER */}
        <div
          className="mt-5 mx-auto relative w-48 h-64 
                    max-sm:w-40 max-sm:h-56 shadow-lg shadow-light/10 rounded-md"
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
          {/* RATING */}
          <div className="flex items-center gap-2">
            <Image
              src="/icons/star-2.svg"
              alt="rating star"
              width={27}
              height={27}
              sizes="27px"
              className="relative object-contain bottom-[1.8px]"
            />

            <span
              className={`text-main text-lg 
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
            <div className="ml-10 flex items-center gap-1">
              <NetworkList
                mediaType={mediaType}
                networks={networks}
                containerStyles="w-[53px] h-[30px]"
              />
            </div>
          )}

          {officialTrailer && (
            <VideoAction
              href={`${url}#play=${officialTrailer.key}`}
              videoKey={officialTrailer.key}
              videoTitle={officialTrailer.name}
              containerStyles="py-1 px-1.5 flex items-center gap-2 ml-10
                                bg-transparent text-main hover:bg-tale/80 
                                rounded-md transition-colors duration-100"
            >
              <FaPlay className="text-2xl" />
              <span className="font-semibold">Play Trailer</span>
            </VideoAction>
          )}
        </div>

        {/* FACTS */}
        <div
          className="mt-7 py-4 bg-dark-2 border-y border-dark 
                    text-light-1 font-normal flex flex-col items-center justify-center gap-1"
        >
          {/* MOVIE TV RATE & RELEASE DATE COUNTRY */}
          {mediaType === "movie" && releaseDate ? (
            <div className="flex items-center gap-2">
              {certification && (
                <span
                  className="px-1 text-sm font-medium
                                    bg-dark border border-gray-500"
                >
                  {certification}
                </span>
              )}

              <span className="text-sm">
                {releaseDate && `${moment(releaseDate).format("L")}`}
                {` (${country?.iso_3166_1 ?? ""})`}
              </span>
            </div>
          ) : (
            <>
              {tvrating && (
                <span
                  className="px-1 mb-1 text-sm font-medium
                                bg-dark border border-gray-500"
                >
                  {tvrating}
                </span>
              )}
            </>
          )}

          {/* RUNTIME MOVIE or TV STATUS AIR */}
          {mediaType === "movie" &&
            typeof runtime === "number" &&
            runtime > 0 && (
              <span className="text-sm">{convertRuntime(runtime)}</span>
            )}

          {mediaType === "tv" && status && (
            <>
              <span className="italic text-sm">{status}</span>
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
        </div>

        {/* OVERVIEW */}
        <div className="px-3 pt-7">
          <div>
            <h3 className="text-main text-lg font-semibold">Overview</h3>
            <p className="pt-2 text-main text-sm font-normal">{overview}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsMainMobile;
