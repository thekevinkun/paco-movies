"use client";

import dynamic from "next/dynamic";

import { Spinner } from "@components";

import type { IDetailsPersonMore } from "@types";

const PersonKnownFor = dynamic(
  () => import("@components/Details/Sections/PersonKnownFor"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);
const PersonPhotos = dynamic(
  () => import("@components/Details/Sections/PersonPhotos"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);
const PersonCredits = dynamic(
  () => import("@components/Details/Sections/PersonCredits"),
  {
    ssr: false,
    loading: () => <Spinner />,
  }
);

const DetailsPersonMore = ({
  details,
  credits,
  images,
}: IDetailsPersonMore) => {
  return (
    <section className="py-12 px-5 max-md:px-3">
      {credits.cast.length > 0 && (
        <div className="pt-5 pb-16 max-sm:pb-12">
          <PersonKnownFor works={credits.cast} />
        </div>
      )}

      {images.length > 0 && (
        <div className="pb-16 max-sm:pb-12">
          <PersonPhotos
            personId={details.id}
            name={details.name}
            images={images}
          />
        </div>
      )}

      <div className="pb-16 max-sm:pb-12">
        <PersonCredits credits={credits} />
      </div>

      <div className="mb-[-2rem]"></div>
    </section>
  );
};

export default DetailsPersonMore;
