"use client"

import { useEffect } from "react";

import { DetailsMovieMain, DetailsMovieMainMobile, DetailsMovieMore, DetailsPersonMain, 
    DetailsPersonMore, DetailsTvMain, DetailsTvMore } from "@components";

import { useMenu } from "@contexts/MenuContext";

const ContentDetails = ({data, mediaType}: {data: any, mediaType: string}) => {
  const { handleChangeMediaType, handleChangeCategory } = useMenu();

  useEffect(() => {
    handleChangeMediaType("");
    handleChangeCategory("");
  }, [])

  return (
    <section className="relative z-20 mt-16 max-lg:mt-14">
        {mediaType === "movie" ?
            <div>
                <DetailsMovieMain
                    id={data.details.id}
                    mediaType={mediaType}
                    backdrop={data.details.backdrop_path}
                    poster={data.details.poster_path}
                    title={data.details.title}
                    rating={data.details.vote_average}
                    releaseDate={data.releaseDate.date}
                    country={data.releaseDate.iso_3166_1}
                    certification={data.releaseDate.certification}
                    runtime={data.details.runtime}
                    genres={data.details.genres}
                    tagline={data.details.tagline}
                    overview={data.details.overview}
                    credits={data.credits}
                />

                <DetailsMovieMainMobile 
                    id={data.details.id}
                    mediaType={mediaType}
                    backdrop={data.details.backdrop_path}
                    poster={data.details.poster_path}
                    title={data.details.title}
                    rating={data.details.vote_average}
                    releaseDate={data.releaseDate.date}
                    country={data.releaseDate.iso_3166_1}
                    certification={data.releaseDate.certification}
                    runtime={data.details.runtime}
                    genres={data.details.genres}
                    tagline={data.details.tagline}
                    overview={data.details.overview}
                    credits={data.credits}
                />

                <DetailsMovieMore
                    mediaType={mediaType} 
                    details={data.details}
                    releaseDate={data.releaseDate}
                    originCountry={data.originCountry}
                    videos={data.media.videos}
                    posters={data.media.posters}
                    backdrops={data.media.backdrops}
                    credits={data.credits}
                    externalIds={data.externalIds}
                    reviews={data.reviews}
                    recommendations={data.recommendations}
                />
            </div>
        : mediaType === "tv" ?
            <>
                <DetailsTvMain 
                    id={data.details.id}
                    mediaType={mediaType}
                    backdrop={data.details.backdrop_path}
                    poster={data.details.poster_path}
                    name={data.details.name}
                    rating={data.details.vote_average}
                    releaseDate={data.details.first_air_date}
                    tvrating={data.ratings.rating}
                    status={data.details.status}
                    networks={data.details.networks}
                    genres={data.details.genres}
                    tagline={data.details.tagline}
                    overview={data.details.overview}
                    creators={data.details.created_by}
                    stars={data.credits.cast}
                />

                <DetailsTvMore 
                    mediaType={mediaType} 
                    details={data.details}
                    ratings={data.ratings}
                    videos={data.media.videos}
                    posters={data.media.posters}
                    backdrops={data.media.backdrops}
                    credits={data.credits}
                    externalIds={data.externalIds}
                    reviews={data.reviews}
                    recommendations={data.recommendations}
                />
            </>
        : mediaType === "person" &&
            <>
                <DetailsPersonMain 
                    details={data.details}
                    externalIds={data.externalIds}
                />
        
                <DetailsPersonMore 
                    details={data.details}
                    credits={data.credits}
                    images={data.images}
                />
            </>
        }
    </section>
  )
}

export default ContentDetails;