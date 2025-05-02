"use client"

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useMenu } from "@contexts/MenuContext";

import { Spinner } from "@components";

const DetailsMain = dynamic(() => import("@components/Details/DetailsMain"), {
    ssr: false,
    loading: () => <Spinner />
});
const DetailsMainMobile = dynamic(() => import("@components/Details/DetailsMainMobile"), {
    ssr: false,
    loading: () => <Spinner />
});
const DetailsMore = dynamic(() => import("@components/Details/DetailsMore"), {
    ssr: false,
    loading: () => <Spinner />
});
const DetailsPersonMain = dynamic(() => import("@components/Details/DetailsPersonMain"), {
    ssr: false,
    loading: () => <Spinner />
});
const DetailsPersonMore = dynamic(() => import("@components/Details/DetailsPersonMore"), {
    ssr: false,
    loading: () => <Spinner />
});

const ContentDetails = ({data, mediaType}: {data: any, mediaType: string}) => {
  const { handleChangeMediaType, handleChangeCategory } = useMenu();

  useEffect(() => {
    handleChangeMediaType("");
    handleChangeCategory("");
  }, [])

  return (
    <section className="relative mt-16 max-lg:mt-14">
        {mediaType === "movie" || mediaType === "tv" ?
            <div>
                <DetailsMain
                    id={data.details.id}
                    mediaType={mediaType}
                    backdrop={data.details.backdrop_path}
                    poster={data.details.poster_path}
                    title={data?.details?.title || data?.details?.name}
                    rating={data.details.vote_average}
                    releaseDate={data?.releaseDate?.date || data.details?.first_air_date}
                    genres={data.details.genres}
                    tagline={data.details.tagline}
                    overview={data.details.overview}
                    credits={data.credits}
                    country={data?.releaseDate?.iso_3166_1 || undefined}
                    certification={data?.releaseDate?.certification || undefined}
                    runtime={data?.details?.runtime || undefined}
                    tvrating={data?.ratings?.rating || undefined}
                    status={data?.details?.status || undefined}
                    networks={data?.details?.networks || undefined}
                    creators={data?.details?.created_by || undefined}
                />

                <DetailsMainMobile
                    id={data.details.id}
                    mediaType={mediaType}
                    backdrop={data.details.backdrop_path}
                    poster={data.details.poster_path}
                    title={data?.details?.title || data?.details?.name}
                    rating={data.details.vote_average}
                    releaseDate={data?.releaseDate?.date || data?.details?.first_air_date}
                    genres={data.details.genres}
                    tagline={data.details.tagline}
                    overview={data.details.overview}
                    credits={data.credits}
                    country={data?.releaseDate?.iso_3166_1 || undefined}
                    certification={data?.releaseDate?.certification || undefined}
                    runtime={data?.details?.runtime || undefined}
                    tvrating={data?.ratings?.rating || undefined}
                    status={data?.details?.status || undefined}
                    networks={data?.details?.networks || undefined}
                    creators={data?.details?.created_by || undefined}
                />

                <DetailsMore
                    mediaType={mediaType} 
                    details={data.details}
                    releaseDate={data?.releaseDate || undefined}
                    tvratings={data?.ratings || undefined}
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
        : mediaType === "person" &&
            <div>
                <DetailsPersonMain 
                    details={data.details}
                    externalIds={data.externalIds}
                />
        
                <DetailsPersonMore 
                    details={data.details}
                    credits={data.credits}
                    images={data.images}
                />
            </div>
        }
    </section>
  )
}

export default ContentDetails;