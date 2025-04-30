"use client"

import React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { FallbackImage } from "@components";

import { MdArrowForwardIos } from "react-icons/md";
import { roundedToFixed } from "@helpers/helpers";

const Reviews = ({tvId, mediaType, name, reviews}: 
      {tvId: number, mediaType: string, name: string, reviews: any}) => {

  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  
  const [readMore, setReadMore] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [randomReview, setRandomReview] = useState<number>(0);

  useEffect(() => {
    setRandomReview(Math.floor(Math.random() * reviews.length));
  }, []);

  useEffect(() => {
    const el = paragraphRef.current;

    if (el) {
      // Temporarily remove line clamp
      el.classList.remove("line-clamp-5");

      requestAnimationFrame(() => {
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
        const lines = el.scrollHeight / lineHeight;

        if (lines > 5) {
          setShowReadMore(true);
        }

        // Re-apply the clamp if needed
        if (!readMore) {
          el.classList.add("line-clamp-5");
        }
      });
    }
  }, [randomReview, readMore]);

  return (
    <>
      <Link 
        href={`/title/${mediaType}/${tvId + "-" 
          + name.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}/reviews`} 
        className="group flex items-center w-fit"
      >
        <h3 className="text-main text-2xl max-sm:text-xl font-semibold">User Reviews</h3>
        <span className="pl-3 text-xs text-main-1">{reviews.length}</span>
        
        <MdArrowForwardIos 
          className="text-main text-3xl max-sm:text-2xl font-semibold 
            transition-colors duration-200 group-hover:text-tale"
        />
      </Link>
      
      {/* REVIEW CARD */}
      <div className="pt-7">
        <div className="w-[90%] max-md:w-[100%]">
          <div className="user-review-card">
            <div className="grow">
              {/* USER AVATAR & RATING */}
              <div className="flex flex-col items-center justify-center gap-3">
                <FallbackImage
                    src={reviews[randomReview]?.author_details?.avatar_path}
                    mediaType="person"
                    alt="avatar"
                    width={0}
                    height={0}
                    sizes="(min-width: 768px) 62px, 48px"
                    className="w-[62px] max-md:w-[48px] aspect-square
                      object-cover border border-gray-500 rounded-full"
                />

                <div className="flex items-center gap-1">
                  <Image
                    src="/icons/star-2.svg"
                    alt="Rating Star"
                    width={20}
                    height={20}
                    sizes="20px"
                    className="relative object-contain bottom-[1.5px]"
                  />
      
                  <span 
                    className={`text-lg text-dark 
                      ${reviews[randomReview]?.author_details?.rating > 0 ? 
                      "font-medium" : "font-normal italic"}`}
                  >
                    {reviews[randomReview]?.author_details?.rating > 0 
                      ? roundedToFixed(reviews[randomReview]?.author_details?.rating, 1) : "NaN"}
                  </span>
                </div>
              </div>
                
              {/* USER REVIEW */}
              <div className="pt-3">
                <p 
                  ref={paragraphRef}
                  dangerouslySetInnerHTML={{__html : reviews[randomReview]?.content}}
                  className={`max-md:text-sm ${!readMore && showReadMore ? "line-clamp-5" : ""}`}
                />
                
                {readMore ?
                  <div 
                    className="pt-3 w-fit ml-auto font-semibold 
                      max-sm:text-sm hover:text-tale cursor-pointer"
                    onClick={() => setReadMore(false)}
                  >
                    {" "}Hide
                  </div>
                : (!readMore && showReadMore) &&
                  <div 
                    className="pt-3 w-fit ml-auto font-semibold 
                      max-sm:text-sm hover:text-tale cursor-pointer"
                    onClick={() => setReadMore(true)}
                  >
                      {" "}Read More
                  </div>}
              </div>
            </div>
          </div>
          
          {/* AUTHOR USERNAME & DATE UPLOAD */}
          <div className="pt-5 font-normal text-main-1 
                text-[0.925rem] max-sm:text-sm max-xs:text-xs
                flex items-center justify-end gap-2"
          >
            <p>
              {moment(reviews[randomReview]?.created_at).format("MMM Do, YYYY")}
            </p>
            <span className="font-semibold"> &#8226; </span>
            <p>
              {reviews[randomReview]?.author_details?.username}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reviews;