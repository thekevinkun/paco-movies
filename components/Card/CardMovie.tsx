import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { MotionDiv } from "@components";
import { cardMovieVariants } from "@utils/motion";

import { AiOutlineExclamationCircle } from "react-icons/ai";
import { ICardMovie } from "@types";
import { roundedToFixed } from "@helpers/helpers";

const CardMovie = ({id, index, poster, title, mediaType, releaseDate, rating}: ICardMovie) => {
  const fullRoute = id + "-" + title?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-");
  const routeMovie = "/title" + `/${mediaType}` + `/${fullRoute}`;
  const routePerson = "/name" + `/${fullRoute}`;

  return (
    <MotionDiv 
      variants={cardMovieVariants(index * 0.25)}
      initial="hidden"
      animate="visible"
      viewport={{ amount: 0 }}
      className="flex flex-col"
    >

      {/* POSTER */}
      <Link
        href={mediaType === "movie" || mediaType === "tv" ? routeMovie : routePerson} 
        className="bg-dark rounded-tr-lg h-full"
      >
        <Image
          priority
          unoptimized
          loader={() => poster && `https://image.tmdb.org/t/p/w500${poster}`}
          src={poster ? `https://image.tmdb.org/t/p/w500${poster}` : 
            mediaType === "person" ? "/assets/images/not-found-person.png" 
            : "/assets/images/not-found-poster.jpg"
          }
          alt="Poster"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover rounded-tr-lg opacity-90"
        />
      </Link>

      {/* DETAILS */}
      <div className="p-2 max-md:py-3 bg-card bg-opacity-95 rounded-br-lg">
        <div className="flex justify-between items-center">
          <Link 
            href={ mediaType === "movie" || mediaType === "tv" ? routeMovie : routePerson}  
            title={title} 
            className="inline-block w-fit"
          >
            <h2 className="title-line-clamp text-main max-md:text-sm font-semibold hover:text-tale">
              {title}
            </h2>
          </Link>

          <Link
            href={`/${mediaType}`}
            className="rounded-sm border border-gray-500 px-1"
          >
            <span className="text-main-1 text-[11px]">
              {mediaType}
            </span>
          </Link>
        </div>

        <div className="pt-5 w-full flex items-center">
          <div className="flex items-center gap-1">
            <Image
              src="/icons/star.svg"
              alt="Rating Star"
              width={18}
              height={18}
              className="relative object-contain bottom-[0.4px]"
            />

            <span className="text-main-1 text-sm">
              {rating > 0 ? roundedToFixed(rating, 1) : "N"}
            </span>
          </div>

          <p className="ml-auto text-main-1 text-xs">
            {releaseDate && `${moment(releaseDate).format("ll")}`}
          </p>

          <AiOutlineExclamationCircle
            className="ml-2 text-lg text-main-1 hover:text-gray-700 cursor-pointer"
            onClick={() => {}}
          />
        </div>
      </div>
    </MotionDiv>
  )
}

export default CardMovie;