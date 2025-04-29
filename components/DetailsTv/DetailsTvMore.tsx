import { Seasons, Videos, Photos, Credits, Reviews, 
        Details, Recommendations } from "@components/DetailsTv/sections";

import { IDetailsTvMore } from "@types";

const DetailsTvMore = ({mediaType, details, ratings, originCountry, videos, posters, 
        backdrops, credits, externalIds, reviews, recommendations}: IDetailsTvMore) => {
  
  return (
    <section className="py-12 px-5 max-md:px-3">
      {videos.length > 0 &&
        <div className="pb-16 max-sm:pb-12">
          <Seasons 
            tvId={details.id}
            mediaType={mediaType} 
            name={details.name}
            seasons={details.number_of_seasons}
            seasonList={details.seasons}
          />
        </div>
      }

      {videos.length > 0 &&
        <div className="pb-16 max-sm:pb-12">
          <Videos 
            tvId={details.id}
            mediaType={mediaType} 
            name={details.name}
            videos={videos} 
          />
        </div>
      }

      {(posters.length > 0 || backdrops.length > 0) &&
        <div className="pb-16 max-sm:pb-12">
          <Photos 
            tvId={details.id}
            mediaType={mediaType} 
            name={details.name}
            posters={posters} 
            backdrops={backdrops} 
          />
        </div>
      }

      <div className="pb-16 max-sm:pb-12">
        <Credits
          tvId={details.id}
          mediaType={mediaType} 
          name={details.name}
          casts={credits.cast} 
          creators={details.created_by}
        />
      </div>
        
      {reviews.length > 0 && 
        <div className="pb-16 max-sm:pb-12">
          <Reviews 
            tvId={details.id}
            mediaType={mediaType} 
            name={details.name}
            reviews={reviews}
          />
        </div>
      }

      <div className="pb-16 max-sm:pb-12">
        <Details
          details={details}
          ratings={ratings}
          originCountry={originCountry}
          externalIds={externalIds}
        />
      </div>

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

export default DetailsTvMore;