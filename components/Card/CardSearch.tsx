import React from "react";

import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { MotionDiv } from "@components/MotionDiv";

import { ICardSearch } from "@types";
import { cardMovieVariants } from "@utils/motion";
import { roundedToFixed } from "@helpers/helpers";

const CardSearch = ({ id, index, name, photo, mediaType, 
    releaseDate, vote, overview, department, works }: ICardSearch) => {

    const fullRoute = id + "-" + name?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-");
    const routeMovie = "/title" + `/${mediaType}` + `/${fullRoute}`;
    const routePerson = "/name" + `/${fullRoute}`;

  return (
    <MotionDiv 
        variants={cardMovieVariants(index * 0.25)}
        initial="hidden"
        animate="visible"
        viewport={{ amount: 0 }}
        className="w-full h-52 flex mt-4 border border-gray-500 rounded-tr-lg"
    >
        {/* PHOTO */}
        <Link 
            href={mediaType === "movie" || mediaType === "tv" ? routeMovie : routePerson} 
            className="bg-dark w-[138px] h-full"
        >
            <Image
                priority
                unoptimized
                loader={() => photo && `https://image.tmdb.org/t/p/w500${photo}`}
                src={photo ? `https://image.tmdb.org/t/p/w500${photo}` : 
                    mediaType === "person" ? "/images/not-found-person.png" : 
                    "/images/not-found-poster.jpg"
                }
                alt="Photo"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full object-cover opacity-90"
            />
        </Link>

        {/* DETAILS */}
        <div className="flex flex-1 flex-col py-2 px-3">
            {/* RATING */}
            <div className="flex justify-between items-center">
                <Link 
                    href={`/${mediaType === "person" ? "stars" : mediaType}`} 
                    className="rounded-sm border border-gray-500 px-1">
                    <p className="text-main-1 text-[11px]"
                >
                    {mediaType}
                    </p>
                </Link>
                
                { mediaType === "person" ?
                    <div className="flex items-center gap-1">
                        <Image
                            src="/icons/popularity.svg"
                            alt="Rating Popularity"
                            width={19}
                            height={19}
                            className="relative object-contain"
                        />

                        <span className="text-main-1 text-sm">
                            {vote > 0 ? roundedToFixed(vote, 1) : "N"}
                        </span>
                    </div>
                :
                    <div className="flex items-center gap-1">
                        <Image
                        src="/icons/star.svg"
                        alt="Rating Star"
                        width={14}
                        height={14}
                        className="relative object-contain bottom-[0.4px]"
                        />

                        <span className="text-main-1 text-sm">
                            {vote > 0 ? roundedToFixed(vote, 1) : "N"}
                        </span>
                    </div>
                }
            </div>

            <Link 
                href={mediaType === "movie" || mediaType === "tv" ? routeMovie : routePerson}  
                title={name} 
                className="pt-3 inline-block w-fit"
            >
                <h3 className="text-main max-md:text-sm font-semibold hover:text-tale">
                    {name}
                </h3>
            </Link>
            
            {releaseDate && 
                <p className="text-main-1 text-xs">
                    {moment(releaseDate).format("Do MMMM YYYY")}
                </p>
            }

            {department && 
                <p className="text-main-1 text-sm">
                    {department}
                </p>
            }

            {overview &&
                <p className="overview-line-clamp mt-auto text-main text-sm font-normal">
                    {overview}
                </p> 
            }
            
            { works &&
                <div className="pt-3">
                    {works?.map((work: any) => {
                        const title = work.title || work.name
                        const route = "/title" + `/${work.media_type}` + 
                            `/${work.id}-${title?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`
                        
                        return (
                            <React.Fragment key={work.id}>
                                <Link
                                    href={route} 
                                    title={work.title || work.name} 
                                    className="inline-block"
                                >
                                    <p 
                                        className="truncate w-fit max-w-[155px] 
                                            text-main-1 text-xs hover:text-tale"
                                    >
                                        {work.title || work.name}
                                    </p>
                                </Link>
                                <span className="bullet-separator align-top text-main-1 text-xs"> &#8226; </span>
                            </React.Fragment>
                        )
                    })}
                </div>
            }
        </div>
    </MotionDiv>
  )
}

export default CardSearch;