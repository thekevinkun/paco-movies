import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import { FallbackImage, PreviewAction, MotionDiv } from "@components";

import type { ICardMovieProps } from "@types";

import { cardMovieVariants } from "@lib/utils/motion";
import { roundedToFixed, slugify } from "@lib/helpers/helpers";

const CardMovie = ({
  id,
  poster,
  title,
  mediaType,
  releaseDate,
  rating,
}: ICardMovieProps) => {
  const fullRoute = id + "-" + `${slugify(title)}`;
  const routeMovie = "/title" + `/${mediaType}` + `/${fullRoute}`;
  const routePerson = "/name" + `/${fullRoute}`;

  return (
    <MotionDiv variants={cardMovieVariants} className="flex flex-col">
      {/* POSTER */}
      <Link
        href={
          mediaType === "movie" || mediaType === "tv" ? routeMovie : routePerson
        }
        className="relative w-full aspect-[2/3] bg-dark rounded-tr-lg"
      >
        <FallbackImage
          src={poster}
          mediaType={mediaType}
          alt={
            mediaType === "movie" || mediaType === "tv" ? "poster" : "profile"
          }
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
            href={
              mediaType === "movie" || mediaType === "tv"
                ? routeMovie
                : routePerson
            }
            title={title}
            className="inline-block w-fit pr-3 max-lg:pr-1 max-sm:pr-2"
          >
            <h2
              className="line-clamp-1 text-main 
              max-lg:text-sm max-2xs:text-xs font-semibold hover:text-tale"
            >
              {title}
            </h2>
          </Link>

          <Link
            href={`/${mediaType}`}
            className="p-1 max-2xs:py-0 flex item-center rounded-sm border border-gray-500"
          >
            <span className="text-main-1 text-[11px] max-xs:text-[9px] max-2xs:text-[7px]">
              {mediaType}
            </span>
          </Link>
        </div>

        <div className="pt-5 max-2xs:pt-4 w-full flex items-center">
          <div className="flex items-center gap-1">
            <Image
              src="/icons/star.svg"
              alt="rating star"
              width={0}
              height={0}
              sizes="18px"
              className="relative w-[18px] h-[18px] max-sm:w-4 max-sm:h-4
                  max-2xs:w-3 max-2xs:h-3 object-contain 
                  bottom-[0.4px] max-2xs:bottom-[0.5px]"
            />

            <span
              className={`text-main-1 text-sm max-sm:text-xs max-2xs:text-[0.624rem]
                ${rating > 0 ? "font-medium" : "font-normal italic"}`}
            >
              {rating > 0 ? roundedToFixed(rating, 1) : "NaN"}
            </span>
          </div>

          <p className="ml-auto max-2xs:pt-[1.2px] text-main-1
              text-xs max-xs:text-[0.685rem] max-2xs:text-[0.575rem]"
          >
            {releaseDate && `${moment(releaseDate).format("ll")}`}
          </p>

          {mediaType !== "person" && (
            <PreviewAction
              mediaType={mediaType}
              id={id}
              containerStyles="ml-2 text-lg max-2xs:text-sm text-main-1 hover:text-gray-700"
            >
              <AiOutlineExclamationCircle />
            </PreviewAction>
          )}
        </div>
      </div>
    </MotionDiv>
  );
};

export default CardMovie;
