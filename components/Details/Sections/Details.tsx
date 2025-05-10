import React from "react";
import Link from "next/link";
import moment from "moment";

import { FaImdb, FaFacebook, FaInstagram } from "react-icons/fa";
import { SiWikidata } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { RxExternalLink } from "react-icons/rx";

import type { IDetailsProps } from "@types";

const Details = ({
  mediaType,
  details,
  releaseDate,
  tvratings,
  originCountry,
  externalIds,
}: IDetailsProps) => {
  return (
    <>
      <h3 className="text-main text-2xl max-sm:text-xl font-semibold">
        Details
      </h3>

      <div className="pt-5 w-[90%] max-md:w-[100%]">
        {/* RELEASE DATE */}
        <div className="py-3 text-main grid grid-cols-[30%_1fr]
            max-[1178px]:grid-cols-[36%_1fr] max-lg:grid-cols-[35%_1fr]
            max-md:gap-x-3  
            items-baseline border-b border-gray-500"
        >
          <h3 className="text-lg max-md:text-base max-sm:text-sm font-semibold">
            {mediaType === "movie" ? "Release Date" : "First Air Date"}
          </h3>

          {mediaType === "movie" && releaseDate?.date ? (
            <p className="max-md:text-sm max-sm:text-xs">
              {moment(releaseDate.date).format("LL")}
              <span> ({releaseDate?.iso_3166_1?.native_name || ""})</span>
            </p>
          ) : mediaType === "tv" && details?.first_air_date ? (
            <p className="max-md:text-sm max-sm:text-xs">
              {moment(details.first_air_date).format("LL")}
              <span>
                {" "}
                {typeof tvratings?.iso_3166_1 === "object" &&
                "native_name" in tvratings?.iso_3166_1
                  ? `(${tvratings?.iso_3166_1?.native_name || ""})`
                  : ""}
              </span>
            </p>
          ) : (
            <p className="italic max-md:text-sm max-sm:text-xs">Unknown date</p>
          )}
        </div>

        {/* MOVIE COUNTRIES */}
        <div className="py-3 text-main grid grid-cols-[30%_1fr]
            max-[1178px]:grid-cols-[36%_1fr] max-lg:grid-cols-[35%_1fr]
            max-md:gap-x-3   
            items-baseline border-b border-gray-500"
        >
          <h3 className="text-lg max-md:text-base max-sm:text-sm font-semibold">
            Countries of Origin
          </h3>

          <div className="flex flex-wrap items-center gap-2 max-md:text-sm max-sm:text-xs">
            {originCountry.slice(0, 3).map((country, index) => (
              <React.Fragment key={country?.iso_3166_1 || index}>
                <p>{country.native_name}</p>
                <span className="bullet-separator"> &#8226; </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* MOVIE HOMEPAGE */}
        {details.homepage && (
          <div className="py-3 text-main grid grid-cols-[30%_1fr]
              max-[1178px]:grid-cols-[36%_1fr] max-lg:grid-cols-[35%_1fr]
              max-md:gap-x-3   
              items-baseline border-b border-gray-500"
          >
            <h3 className="text-lg max-md:text-base max-sm:text-sm font-semibold">
              Official Site
            </h3>

            <div className="flex flex-wrap items-center gap-1">
              <Link
                href={`${details?.homepage}`}
                className="text-tale max-md:text-sm max-sm:text-xs hover:underline"
              >
                Homepage
              </Link>

              <RxExternalLink className="text-tale max-md:text-xs" />
            </div>
          </div>
        )}

        {/* MOVIE EXTERNAL SITES */}
        <div className="py-3 text-main grid grid-cols-[30%_1fr]
              max-[1178px]:grid-cols-[36%_1fr] max-lg:grid-cols-[35%_1fr]
              max-md:gap-x-3  
              items-baseline border-b border-gray-500"
          >
          <h3 className="text-lg max-md:text-base max-sm:text-sm font-semibold">
            External Sites
          </h3>

          <div className="flex flex-wrap items-center gap-5">
            {externalIds.twitter_id && (
              <Link
                href={`https://twitter.com/${externalIds.twitter_id}`}
                target="_blank"
              >
                <FaXTwitter className="text-2xl" />
              </Link>
            )}

            {externalIds.facebook_id && (
              <Link
                href={`https://facebook.com/${externalIds.facebook_id}`}
                target="_blank"
              >
                <FaFacebook className="text-2xl" />
              </Link>
            )}

            {externalIds.instagram_id && (
              <Link
                href={`https://instagram.com/${externalIds.instagram_id}`}
                target="_blank"
              >
                <FaInstagram className="text-2xl" />
              </Link>
            )}

            {externalIds.imdb_id && (
              <Link
                href={`https://imdb.com/title/${externalIds.imdb_id}`}
                target="_blank"
              >
                <FaImdb className="text-2xl" />
              </Link>
            )}

            {externalIds.wikidata_id && (
              <Link
                href={`https://wikidata.org/wiki/${externalIds.wikidata_id}`}
                target="_blank"
              >
                <SiWikidata className="text-2xl" />
              </Link>
            )}
          </div>
        </div>

        {/* MOVIE LANGUAGE */}
        <div className="py-3 text-main grid grid-cols-[30%_1fr]
              max-[1178px]:grid-cols-[36%_1fr] max-lg:grid-cols-[35%_1fr] 
              max-md:gap-x-3  
              items-baseline border-b border-gray-500"
        >
          <h3 className="text-lg max-md:text-base max-sm:text-sm font-semibold">
            Language
          </h3>

          <div className="flex flex-wrap items-center gap-2 max-md:text-sm max-sm:text-xs">
            {details.spoken_languages.slice(0, 3).map((lang) => (
              <React.Fragment key={lang.name}>
                <p>{lang.name || lang.english_name}</p>
                <span className="bullet-separator"> &#8226; </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* MOVIE COMPANIES */}
        <div className="py-3 text-main grid grid-cols-[30%_1fr]
            max-[1178px]:grid-cols-[36%_1fr] max-lg:grid-cols-[35%_1fr]
            max-md:gap-x-3    
            items-baseline border-b border-gray-500"
        >
          <h3 className="text-lg max-md:text-base max-sm:text-sm font-semibold">
            Production Companies
          </h3>

          <div className="flex flex-wrap items-center gap-2 max-md:text-sm max-sm:text-xs">
            {details.production_companies
              .slice(0, 3)
              .map((company) => (
                <React.Fragment key={company.id}>
                  <p className="">
                    {company.name}
                  </p>
                  <span className="bullet-separator">
                    {" "}
                    &#8226;{" "}
                  </span>
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
