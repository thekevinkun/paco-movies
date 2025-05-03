import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { FallbackImage, MotionDiv } from "@components";
import { cardMovieVariants } from "@lib/utils/motion";

import { AiOutlineExclamationCircle } from "react-icons/ai";
import { ICardMovie } from "@types";
import { roundedToFixed, slugify } from "@lib/helpers/helpers";

const CardMovie = ({id, poster, title, mediaType, releaseDate, rating}: ICardMovie) => {
  const fullRoute = id + "-" + `${slugify(title)}`;
  const routeMovie = "/title" + `/${mediaType}` + `/${fullRoute}`;
  const routePerson = "/name" + `/${fullRoute}`;

  return (
    <MotionDiv
      variants={cardMovieVariants}
      className="flex flex-col"
    >
      {/* POSTER */}
      <Link
        href={mediaType === "movie" || mediaType === "tv" ? routeMovie : routePerson} 
        className="relative w-full aspect-[2/3] bg-dark rounded-tr-lg"
      >
        <FallbackImage
          src={poster}
          mediaType={mediaType}
          alt="poster"
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          placeholder="blur"
          blurDataURL="/images/blur.jpg"
          className="object-cover rounded-tr-lg opacity-90"
        />
      </Link>

      {/* DETAILS */}
      <div className="p-2 max-md:py-3 bg-card bg-opacity-95 rounded-br-lg">
        <div className="flex justify-between items-center">
          <Link 
            href={ mediaType === "movie" || mediaType === "tv" ? routeMovie : routePerson}  
            title={title} 
            className="inline-block w-fit pr-3"
          >
            <h2 className="line-clamp-1 text-main 
              max-md:text-sm font-semibold hover:text-tale"
            >
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
              alt="rating star"
              width={18}
              height={18}
              sizes="18px"
              className="relative object-contain bottom-[0.4px]"
            />

            <span 
              className={`text-main-1 text-sm
                ${rating > 0 ? "font-medium" : "font-normal italic"}`}
            >
              {rating > 0 ? roundedToFixed(rating, 1) : "NaN"}
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