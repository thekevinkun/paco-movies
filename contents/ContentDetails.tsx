"use client"

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useMenu } from "@contexts/MenuContext";

import { Spinner } from "@components";

import {
  IContentDetailsProps,
  IGetMovieDetailsResponse,
  IGetPersonDetailsResponse
} from "@types";

const DetailsMain = dynamic(() => import("@components/Details/DetailsMain"), {
  ssr: false,
  loading: () => <Spinner />,
});
const DetailsMainMobile = dynamic(() => import("@components/Details/DetailsMainMobile"), {
  ssr: false,
  loading: () => <Spinner />,
});
const DetailsMore = dynamic(() => import("@components/Details/DetailsMore"), {
  ssr: false,
  loading: () => null,
});
const DetailsPersonMain = dynamic(() => import("@components/Details/DetailsPersonMain"), {
  ssr: false,
  loading: () => <Spinner />,
});
const DetailsPersonMore = dynamic(() => import("@components/Details/DetailsPersonMore"), {
  ssr: false,
  loading: () => null,
});

const ContentDetails = ({ data, mediaType }: IContentDetailsProps) => {
  const { handleChangeMediaType, handleChangeCategory } = useMenu();

  useEffect(() => {
    handleChangeMediaType("");
    handleChangeCategory("");
  }, []);

  const renderMovieOrTV = (movieData: IGetMovieDetailsResponse) => (
    <>
      <DetailsMain
        id={movieData.details.id}
        mediaType={mediaType}
        backdrop={movieData.details.backdrop_path ?? ""}
        poster={movieData.details.poster_path ?? ""}
        title={movieData.details.title || movieData.details.name || "Untitled"}
        rating={movieData.details.vote_average ?? 0}
        releaseDate={movieData.releaseDate?.date || movieData.details.first_air_date || ""}
        officialTrailer={movieData.officialTrailer || null}
        genres={movieData.details.genres}
        tagline={movieData.details.tagline}
        overview={movieData.details.overview ?? ""}
        credits={movieData.credits}
        country={movieData.releaseDate?.iso_3166_1 || null}
        certification={movieData.releaseDate?.certification ?? ""}
        runtime={movieData.details.runtime}
        tvrating={movieData.ratings?.rating ?? ""}
        status={movieData.details.status}
        networks={movieData.details.networks}
        creators={movieData.details.created_by}
      />

      <DetailsMainMobile
        id={movieData.details.id}
        mediaType={mediaType}
        backdrop={movieData.details.backdrop_path ?? ""}
        poster={movieData.details.poster_path ?? ""}
        title={movieData.details.title || movieData.details.name || "Untitled"}
        rating={movieData.details.vote_average ?? 0}
        releaseDate={movieData.releaseDate?.date || movieData.details.first_air_date || ""}
        officialTrailer={movieData.officialTrailer || null}
        genres={movieData.details.genres}
        overview={movieData.details.overview ?? ""}
        credits={movieData.credits}
        country={movieData.releaseDate?.iso_3166_1 || null}
        certification={movieData.releaseDate?.certification ?? ""}
        runtime={movieData.details.runtime}
        tvrating={movieData.ratings?.rating ?? ""}
        status={movieData.details.status}
        networks={movieData.details.networks}
        creators={movieData.details.created_by}
      />

      <DetailsMore
        mediaType={mediaType}
        details={movieData.details}
        releaseDate={movieData.releaseDate}
        tvratings={movieData.ratings}
        originCountry={movieData.originCountry}
        videos={movieData.media.videos}
        posters={movieData.media.posters}
        backdrops={movieData.media.backdrops}
        credits={movieData.credits}
        externalIds={movieData.externalIds}
        reviews={movieData.reviews}
        recommendations={movieData.recommendations}
      />
    </>
  );

  const renderPerson = (personData: IGetPersonDetailsResponse) => (
    <>
      <DetailsPersonMain
        details={personData.details}
        externalIds={personData.externalIds}
      />
      <DetailsPersonMore
        details={personData.details}
        credits={personData.credits}
        images={personData.images}
      />
    </>
  );

  return (
    <section className="relative mt-16 max-lg:mt-14">
      {mediaType === "movie" || mediaType === "tv"
        ? renderMovieOrTV(data as IGetMovieDetailsResponse)
        : mediaType === "person"
        ? renderPerson(data as IGetPersonDetailsResponse)
        : null}
    </section>
  );
};

export default ContentDetails;
