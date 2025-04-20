import React from "react";
import Link from "next/link";
import moment from "moment";

import { FaImdb, FaFacebook, FaInstagram } from "react-icons/fa";
import { SiWikidata } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { RxExternalLink } from "react-icons/rx";

const Details = ({details, releaseDate, externaIds}: 
      {details: any, releaseDate: any, externaIds: any}) => {
  
  return (
    <div className="pt-16 max-sm:pt-12">
      <h3 className="text-main text-2xl max-sm:text-xl font-semibold">
        Details
      </h3>

      <div className="pt-5 w-[90%] max-md:w-[100%]">
        {/* RELEASE DATE */}
        <div className="py-3 text-main flex items-center border-y border-gray-500">
          <h3 className="basis-[30%] max-sm:basis-[40%] text-lg 
                max-md:text-base max-sm:text-sm font-semibold"
          >
              Release Date
          </h3>

          {releaseDate ? 
            <p className="max-md:text-sm max-sm:text-xs">
              {moment(releaseDate.release_date.release_date).format("LL")}
              <span>
                {" "}({releaseDate.iso_3166_1.name})
              </span>
            </p>
          :
            <p className="italic max-md:text-sm max-sm:text-xs">
              Unknown date
            </p>
          }
        </div>
        
        {/* MOVIE COUNTRIES */}
        <div className="py-3 text-main flex items-center border-b border-gray-500">
          <h3 className="basis-[30%] max-sm:basis-[40%] 
              text-lg max-md:text-base max-sm:text-sm font-semibold"
          >
            Countries of Origin
          </h3>

          <div className="flex items-center gap-2 max-md:text-sm max-sm:text-xs">
            {details.origin_country.slice(0, 3).map((country: any) => (
              <React.Fragment key={country}>
                <p>
                  {country}
                </p>
                <span className="bullet-separator"> &#8226; </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* MOVIE HOMEPAGE */}
        {details.homepage && 
          <div className="py-3 text-main flex items-center border-b border-gray-500">
            <h3 className="basis-[30%] max-sm:basis-[40%] 
                text-lg max-md:text-base max-sm:text-sm font-semibold"
            >
              Official Site
            </h3>
            
            <div className="flex items-center gap-1">
              <Link 
                href={`${details?.homepage}`} 
                className="text-tale max-md:text-sm max-sm:text-xs hover:underline"
              >
                  Homepage
              </Link>

              <RxExternalLink className="text-tale max-md:text-xs"/>
            </div>
          </div>
        }

        {/* MOVIE EXTERNAL SITES */}
        <div className="py-3 text-main flex items-center border-b border-gray-500">
          <h3 className="basis-[30%] max-sm:basis-[40%] 
              text-lg max-md:text-base max-sm:text-sm font-semibold"
          >
            External Sites
          </h3>
          
          <div className="flex items-center gap-5">
            { externaIds.twitter_id &&
              <Link 
                href={`https://twitter.com/${externaIds.twitter_id}`}
                target="_blank"
              >
                <FaXTwitter className="text-2xl"/>
              </Link>
            }

            {externaIds.facebook_id &&
              <Link 
                href={`https://facebook.com/${externaIds.facebook_id}`}
                target="_blank"
              >
                <FaFacebook className="text-2xl"/>
              </Link>
            }

            {externaIds.instagram_id &&
              <Link 
                href={`https://instagram.com/${externaIds.instagram_id}`}
                target="_blank"
              >
                <FaInstagram className="text-2xl"/>
              </Link>
            }

            {externaIds.imdb_id &&
              <Link 
                href={`https://imdb.com/title/${externaIds.imdb_id}`}
                target="_blank"
              >
                <FaImdb className="text-2xl"/>
              </Link>
            }

            {externaIds.wikidata_id &&
              <Link 
                href={`https://wikidata.org/wiki/${externaIds.wikidata_id}`}
                target="_blank"
              >
                <SiWikidata className="text-2xl"/>
              </Link>
            }
          </div>
        </div>

        {/* MOVIE LANGUAGE */}
        <div className="py-3 text-main flex items-center border-b border-gray-500">
          <h3 className="basis-[30%] max-sm:basis-[40%] 
              text-lg max-md:text-base max-sm:text-sm font-semibold"
          >
            Language
          </h3>
          
          <div className="flex items-center gap-2 max-md:text-sm max-sm:text-xs">
            {details.spoken_languages.slice(0, 3).map((lang: any) => (
              <React.Fragment key={lang.name}>
                <p>
                  {lang.name || lang.english_name}
                </p>
                <span className="bullet-separator"> &#8226; </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* MOVIE COMPANIES */}
        <div className="py-3 text-main flex items-center border-b border-gray-500">
          <h3 className="basis-[30%] max-sm:basis-[40%] 
                text-lg max-md:text-base max-sm:text-sm font-semibold"
          >
              Production Companies
          </h3>

          <div className="flex items-center gap-2 max-md:text-sm max-sm:text-xs">
            {details.production_companies.slice(0, 3).map((company: any) => (
              <React.Fragment key={company.id}>
                <p>
                  {company.name}
                </p>
                <span className="bullet-separator"> &#8226; </span>
              </React.Fragment>
            ))}
          </div>
      </div>
      </div>
    </div>
  )
}

export default Details;