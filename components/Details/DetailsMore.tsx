"use client"

import dynamic from "next/dynamic";

import { Spinner } from "@components";

import type { IDetailsMore, IDetailsProps } from "@types";

const Seasons = dynamic(() => import("@components/Details/Sections/Seasons"), {
  ssr: false,
  loading: () => <Spinner /> 
});
const Videos = dynamic(() => import("@components/Details/Sections/Videos"), {
  ssr: false,
  loading: () => <Spinner />
});
const MoviePhotos = dynamic(() => import("@components/Details/Sections/MoviePhotos"), {
  ssr: false,
  loading: () => <Spinner />
});
const TvPhotos = dynamic(() => import("@components/Details/Sections/TvPhotos"), {
  ssr: false,
  loading: () => <Spinner />
});
const Credits = dynamic(() => import("@components/Details/Sections/Credits"), {
  ssr: false,
  loading: () => <Spinner />
});
const Reviews = dynamic(() => import("@components/Details/Sections/Reviews"), {
  ssr: false,
  loading: () => <Spinner />
});
const Details = dynamic(() => import("@components/Details/Sections/Details"), {
  ssr: false,
  loading: () => <Spinner />
});
const BoxOffice = dynamic(() => import("@components/Details/Sections/BoxOffice"), {
  ssr: false,
  loading: () => <Spinner />
});
const Recommendations = dynamic(() => import("@components/Details/Sections/Recommendations"), {
  ssr: false,
  loading: () => <Spinner />
});

const DetailsMore = ({mediaType, details, releaseDate, tvratings, originCountry, videos, 
      posters, backdrops, credits, externalIds, reviews, recommendations}: IDetailsMore) => {
  
  return (
    <section className="py-12 px-5 max-md:px-3">
        {(mediaType === "tv" && (details.number_of_seasons && details.number_of_seasons > 0)) &&
            <div className="pb-16 max-sm:pb-12">
              <Seasons 
                id={details.id}
                mediaType={mediaType} 
                name={details.name ?? ""}
                seasons={details.number_of_seasons}
                seasonList={details.seasons}
              />
            </div>
        }

        {videos.length > 0 &&
          <div className="pb-16 max-sm:pb-12">
            <Videos 
              id={details.id}
              mediaType={mediaType} 
              title={details.title || details.name || "Untitled"}
              videos={videos} 
            />
          </div>
        }

        {(posters.length > 0 || backdrops.length > 0) &&
          <div className="pb-16 max-sm:pb-12">
            {mediaType === "movie" ?
              <MoviePhotos 
              id={details.id}
              mediaType={mediaType} 
              title={details.title ?? "Untitled"}
              posters={posters} 
              backdrops={backdrops} 
            />
            :
              <TvPhotos 
                id={details.id}
                mediaType={mediaType} 
                name={details.name ?? "Untitled"}
                posters={posters} 
                backdrops={backdrops} 
              />
            }
          </div>
        }

        {credits.cast.length > 0 &&
          <div className="pb-16 max-sm:pb-12">
            <Credits
              id={details.id}
              mediaType={mediaType} 
              title={details.title || details.name || "Untitled"}
              casts={credits.cast} 
              crews={credits.crew}
              creators={details.created_by ?? []}
            />
          </div>
        }

        {reviews.length > 0 && 
          <div className="pb-16 max-sm:pb-12">
            <Reviews 
              id={details.id}
              mediaType={mediaType} 
              title={details.title || details.name || "Untitled"}
              reviews={reviews}
            />
          </div>
        }

        <div className="pb-16 max-sm:pb-12">
          <Details
            mediaType={mediaType}
            details={details as IDetailsProps["details"]}
            releaseDate={releaseDate}
            tvratings={tvratings}
            originCountry={originCountry}
            externalIds={externalIds}
          />
        </div>
        
        {mediaType === "movie" &&
            <div className="pb-16 max-sm:pb-12">
              <BoxOffice details={{
                budget: details.budget,
                revenue: details.revenue
              }} />
            </div>
        }
        
        {recommendations.length > 0 &&
          <div className="pb-16 max-sm:pb-12">
            <Recommendations 
              recommendations={recommendations}
            />
          </div>
        }

        <div className="mb-[-2rem]"></div>
    </section>
  )
}

export default DetailsMore;