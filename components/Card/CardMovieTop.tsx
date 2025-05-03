import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { FallbackImage, MotionDiv, VideoAction } from "@components";
import { cardMovieVariants } from "@lib/utils/motion";

import { FaPlay } from "react-icons/fa";
import { ICardMovieTop } from "@types";
import { roundedToFixed, slugify } from "@lib/helpers/helpers";

const CardMovieTop = ({id, poster, backDrop, title, 
      overview, mediaType, releaseDate, rating, trailer}: ICardMovieTop) => {
        
  const fullRoute = id + "-" + `${slugify(title)}`;
  const routeMovie = "/title" + `/${mediaType}` + `/${fullRoute}`;
  const routePerson = "/name" + `/${fullRoute}`;

  return (
    <MotionDiv 
      variants={cardMovieVariants}
      className="flex h-[410px] max-md:hidden"
    >
      {/* Poster on left side */}
      <div className="max-xl:hidden relative w-72 h-auto 
        bg-dark rounded-l-md grow shrink-0 basis-auto"
      >
        <FallbackImage
          src={poster}
          mediaType={mediaType}
          alt="poster"
          fill
          sizes="(min-width: 1280px) 288px"
          placeholder="blur"
          blurDataURL="/images/blur.jpg"
          className="object-cover rounded-l-md opacity-90"
        />
      </div>

      {/* Details on right side    */}
      <div
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url("https://image.tmdb.org/t/p/w1280${backDrop}")`
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
                alt="rating star"
                width={25}
                height={25}
                sizes="25px"
                className="relative object-contain bottom-[1.2px]"
              />

               <span 
                className={`text-[17px] text-light
                  ${rating > 0 ? "font-semibold" : "font-normal italic"}`}
               >
                  {rating > 0 ? roundedToFixed(rating, 1) : "NaN"}
               </span>
            </div>

            {(mediaType !== "person" && trailer) &&
              <VideoAction
                href={`${routeMovie}#play=${trailer.key}`}
                videoKey={trailer.key}
                videoTitle={trailer.name}
                containerStyles="py-1 px-1.5 flex items-center gap-2 ml-10
                  bg-transparent text-light hover:bg-tale/80 rounded-md
                  transition-colors duration-100"
              >
                <FaPlay className="text-lg"/>
                <span className="font-semibold">Play Trailer</span>
              </VideoAction>
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