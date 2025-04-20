import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { MotionDiv } from "@components";
import { cardMovieVariants } from "@utils/motion";

import { FaPlay } from "react-icons/fa";
import { ICardMovieTop } from "@types";
import { roundedToFixed } from "@helpers/helpers";

const CardMovieTop = ({id, poster, backDrop, title, 
      overview, mediaType, releaseDate, rating}: ICardMovieTop) => {
  const fullRoute = id + "-" + title?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-");
  const routeMovie = "/title" + `/${mediaType}` + `/${fullRoute}`;
  const routePerson = "/name" + `/${fullRoute}`;

  return (
    <MotionDiv 
      variants={cardMovieVariants(0.25)}
      initial="hidden"
      animate="visible"
      viewport={{ amount: 0 }}
      className="flex h-[410px] max-md:hidden"
    >
      {/* Poster on left side */}
      <div className="max-xl:hidden bg-dark rounded-l-md grow shrink-0 basis-auto w-72">
        <Image
          priority
          unoptimized
          loader={() => poster && `https://image.tmdb.org/t/p/original${poster}`}
          src={poster ? `https://image.tmdb.org/t/p/original${poster}` : 
            mediaType === "person" ? "/images/not-found-person.png" : "/images/not-found-poster.jpg"}
          alt="Poster"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover rounded-l-md opacity-90"
        />
      </div>

      {/* Details on right side    */}
      <div
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url("https://image.tmdb.org/t/p/original${backDrop}")`
        }}
        className="relative w-full rounded-r-md max-xl:rounded-md p-8"
      >
        {/* Background image gradient */}
        <div
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0.7) calc((50vw - 170px) - 340px), rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.3) 100%)",
          }}
          className="w-full h-full absolute top-0 right-0 rounded-r-md max-xl:rounded-md"
        ></div>

        {/* Details content */}
        <div className="relative w-full h-full flex flex-col justify-center z-30">
          {/* Title */}
          <Link 
            href={ mediaType === "movie" || mediaType === "tv" ? routeMovie : routePerson} 
            title={title} 
            className="inline-block w-fit"
          >
            <h2 className="text-2xl text-light font-extrabold capitalize hover:text-tale">
              {title}{" "}

              <span className="font-light">
                {releaseDate && `(${moment(releaseDate).format("YYYY")})`}
              </span>
            </h2>
          </Link>

          {/* Facts */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-light font-normal capitalize">
              {mediaType}
            </span>
          </div>

          {/* Features */}
          <div className="flex items-center pt-8">
            <div className="flex items-center gap-1.5">
              <Image
                src="/icons/star.svg"
                alt="Rating Star"
                width={25}
                height={25}
                className="relative object-contain bottom-[1.2px]"
              />

               <span 
                className={`text-[17px] text-light
                  ${rating > 0 ? "font-semibold" : "font-normal italic"}`}
               >
                  {rating > 0 ? roundedToFixed(rating, 1) : "NaN"}
               </span>
            </div>

            {mediaType !== "person" &&
              <Link
                href={`${routeMovie}#`}
                className="flex items-center gap-2 ml-10 text-light hover:text-light-2"
              >
                <FaPlay className="text-lg "/>
                <span className="font-semibold">Play Trailer</span>
              </Link>
            }
          </div>

          {/* Overview */}
          {mediaType !== "person" && 
            <div className="pt-8">
              <h3 className="font-semibold text-lg text-light">Overview</h3>
              <p className="line-clamp-3 text-light font-normal pt-2">
                {overview}
              </p>
            </div>
          }
        </div>
      </div>
    </MotionDiv>
  )
}

export default CardMovieTop;