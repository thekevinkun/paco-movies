"use client";

import { useState } from "react";

import Link from "next/link";
import moment from "moment";

import { BsLink } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram } from "react-icons/fa";

import { FallbackImage } from "@components";

import type { IDetailsPersonMain } from "@types";

import { calculateAge } from "@lib/helpers/helpers";

const DetailsPersonMain = ({ details, externalIds }: IDetailsPersonMain) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <section className="relative pt-8 px-5 max-md:px-3 z-20">
      {/* PERSON's PHOTO and CONTACTS */}
      <div className="flex max-sm:flex-col gap-x-8 max-sm:gap-y-3">
        <div className="flex flex-col max-sm:items-center gap-5">
          <div
            className="relative w-[308px] max-md:w-[225px]
                max-sm:w-[255px] max-2xs:w-[220px] aspect-[2/3] rounded-md"
          >
            <FallbackImage
              src={details.profile_path}
              mediaType="person"
              alt="profile"
              fill
              sizes="(min-width: 768px) 308px,
                      (min-width: 640px) 225px, 
                      (min-width: 375px) 255px, 220px"
              placeholder="blur"
              blurDataURL="/images/blur.jpg"
              className="object-cover rounded-md opacity-90"
            />
          </div>

          {externalIds && (
            <div className="text-main max-sm:pb-2 flex items-center gap-5">
              {externalIds.twitter_id && (
                <Link
                  href={`https://twitter.com/${externalIds.twitter_id}`}
                  target="_blank"
                >
                  <FaXTwitter className="text-3xl max-lg:text-2xl" />
                </Link>
              )}

              {externalIds.facebook_id && (
                <Link
                  href={`https://facebook.com/${externalIds.facebook_id}`}
                  target="_blank"
                >
                  <FaFacebook className="text-3xl max-lg:text-2xl" />
                </Link>
              )}

              {externalIds.instagram_id && (
                <Link
                  href={`https://instagram.com/${externalIds.instagram_id}`}
                  target="_blank"
                >
                  <FaInstagram className="text-[34px] max-lg:text-[28px]" />
                </Link>
              )}

              {details.homepage && (
                <>
                  <span className="text-3xl font-light">|</span>

                  <Link href={details.homepage} target="_blank">
                    <BsLink className="text-4xl max-lg:text-3xl" />
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {/* PERSON DETAILS */}
        <div className="flex-1">
          {/* NAME */}
          <h2 className="font-extrabold text-2xl text-main capitalize max-sm:text-center">
            {details.name}
          </h2>

          {/* BORN, BIRTH AND DEATH */}
          <div
            className="pt-7 flex flex-wrap items-center
              max-sm:items-start max-sm:justify-center gap-x-8 gap-y-5"
          >
            <div>
              <h3 className="font-semibold text-lg text-main max-sm:text-center">
                Born
              </h3>

              {details.birthday ? (
                <p className="font-normal text-main max-2xs:text-sm">
                  {moment(details.birthday).format("LL")}

                  {!details.deathday && (
                    <span className="text-sm max-2xs:text-xs font-light max-sm:block max-sm:text-center">
                      {" "}
                      ({calculateAge(details.birthday)} years old)
                    </span>
                  )}
                </p>
              ) : (
                <p className="font-light italic text-main max-2xs:text-sm">Unknown date</p>
              )}
            </div>

            {details?.deathday && (
              <div>
                <h3 className="font-semibold text-lg text-main max-sm:text-center">
                  Death
                </h3>
                <p className="font-normal text-main max-2xs:text-sm">
                  {moment(details.deathday).format("LL")}
                  <span
                    className="text-sm max-2xs:text-xs font-light
                    max-sm:block max-sm:text-center"
                  >
                    {" "}
                    ({calculateAge(details.birthday ?? "")} years old)
                  </span>
                </p>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-lg text-main max-sm:text-center">
                Place of Birth
              </h3>

              {details.place_of_birth ? (
                <p className="font-normal text-main max-2xs:text-sm">
                  {" "}
                  {details.place_of_birth}
                </p>
              ) : (
                <p className="font-light italic text-main max-2xs:text-sm">Unknown place</p>
              )}
            </div>
          </div>

          {/* PERSON BIO */}
          <div className="pt-6 max-sm:pt-10">
            <h3 className="mb-3 font-semibold text-lg text-main max-sm:text-center">
              Biography
            </h3>

            {details.biography ? (
              <>
                <p
                  className={`${!readMore ? "!line-clamp-10" : ""}
                    max-sm:px-2 font-normal text-main 
                    max-2xs:text-sm text-justify leading-[26.75px] max-2xs:leading-[27.5px]`}
                >
                  {details.biography}

                  {readMore && (
                    <span
                      className="font-semibold text-main max-2xs:text-sm hover:text-tale cursor-pointer"
                      onClick={() => setReadMore(false)}
                    >
                      {" "}
                      Hide
                    </span>
                  )}
                </p>

                {!readMore && (
                  <span
                    className="max-sm:px-2 font-semibold text-main max-2xs:text-sm hover:text-tale cursor-pointer"
                    onClick={() => setReadMore(true)}
                  >
                    {" "}
                    Read More
                  </span>
                )}
              </>
            ) : (
              <p
                className="mt-[-9px] italic font-light
                text-main max-2xs:text-sm text-justify max-sm:text-center"
              >
                No biography.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsPersonMain;
