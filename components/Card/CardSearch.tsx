import React from "react";

import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { FallbackImage, MotionDiv } from "@components";

import type { ICardSearchProps } from "@types";

import { cardMovieVariants } from "@lib/utils/motion";
import { roundedToFixed, slugify } from "@lib/helpers/helpers";

const CardSearch = ({ id, name, photo, mediaType, 
    releaseDate, vote, overview, department, works }: ICardSearchProps) => {

    const fullRoute = id + "-" + `${slugify(name)}`;
    const routeMovie = "/title" + `/${mediaType}` + `/${fullRoute}`;
    const routePerson = "/name" + `/${fullRoute}`;
    
    return (
        <MotionDiv 
            variants={cardMovieVariants}
            className="w-full h-52 max-md:h-48 flex 
                mt-4 border border-gray-500 rounded-tr-lg
                shadow-inner shadow-dark-1"
        >
            {/* PHOTO */}
            <Link 
                href={mediaType === "movie" || mediaType === "tv" ? routeMovie : routePerson} 
                className="relative group bg-dark
                    w-[138px] max-md:w-[127px] max-xs:w-[115px] h-full"
            >
                <FallbackImage
                    src={photo}
                    mediaType={mediaType}
                    alt={mediaType === "movie" 
                        || mediaType === "tv" ? "poster" : "profile"
                    }
                    fill
                    sizes="(min-width: 768px) 138px, 127px"
                    placeholder="blur"
                    blurDataURL="/images/blur.jpg"
                    className="object-cover opacity-90 transition-opacity
                        duration-100 group-hover:opacity-55"
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
                                alt="rating popularity"
                                width={19}
                                height={19}
                                sizes="19px"
                                className="relative object-contain"
                            />

                            
                            <span 
                                className={`text-main-1 text-sm
                                ${vote > 0 ? "font-medium" : "font-normal italic"}`}
                            >
                                {vote > 0 ? roundedToFixed(vote, 2) : "NaN"}
                            </span>
                        </div>
                    :
                        <div className="flex items-center gap-1">
                            <Image
                                src="/icons/star.svg"
                                alt="rating star"
                                width={14}
                                height={14}
                                sizes="14px"
                                className="relative object-contain bottom-[0.4px]"
                            />

                            <span 
                                className={`text-main-1 text-sm
                                ${vote > 0 ? "font-medium" : "font-normal italic"}`}
                            >
                                {vote > 0 ? roundedToFixed(vote, 1) : "NaN"}
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
                    <p className="italic text-main text-xs max-xs:text-[0.675rem]">
                        {moment(releaseDate).format("Do MMMM YYYY")}
                    </p>
                }

                {department && 
                    <p className="italic text-main text-sm max-xs:text-xs">
                        {department}
                    </p>
                }

                {overview &&
                    <p className="line-clamp-3 mt-auto text-main text-sm max-xs:text-xs font-normal">
                        {overview}
                    </p> 
                }
                
                { works &&
                    <div className="pt-3 pr-7">
                        {works?.map((work) => {
                            const title = work.title ?? work.name ?? "untitled"
                            const route = `/title/${work.media_type}/${work.id}-${slugify(title)}`
                            
                            return (
                                <React.Fragment key={work.id}>
                                    <Link
                                        href={route} 
                                        title={work.title || work.name} 
                                        className="inline-block"
                                    >
                                        <p className="text-main text-sm max-md:text-xs max-xs:text-[0.675rem] hover:text-tale
                                            max-xs:truncate max-xs:w-fit max-xs:max-w-[125px]">
                                            {work.title || work.name}
                                        </p>
                                    </Link>
                                    <span className="bullet-separator max-xs:align-top text-main text-sm max-md:text-xs max-xs:text-[0.675rem]"> &#8226; </span>
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