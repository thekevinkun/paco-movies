import { Videos, Photos, Credits, Reviews, 
        Details, BoxOffice, Recommendations } from "@components/DetailsMovie/sections";

import { IDetailsMovieMore } from "@types";

const DetailsMovieMore = ({mediaType, details, releaseDate, originCountry, videos, 
      posters, backdrops, credits, externalIds, reviews, recommendations}: IDetailsMovieMore) => {
  
  return (
    <section className="py-12 px-5 max-md:px-3">
        {videos.length > 0 &&
          <div className="pb-16 max-sm:pb-12">
            <Videos 
              movieId={details.id}
              mediaType={mediaType} 
              title={details.title}
              videos={videos} 
            />
          </div>
        }

        {(posters.length > 0 || backdrops.length > 0) &&
          <div className="pb-16 max-sm:pb-12">
            <Photos 
              movieId={details.id}
              mediaType={mediaType} 
              title={details.title}
              posters={posters} 
              backdrops={backdrops} 
            />
          </div>
        }

        <div className="pb-16 max-sm:pb-12">
          <Credits
            movieId={details.id}
            mediaType={mediaType} 
            title={details.title}
            casts={credits.cast} 
            crews={credits.crew}
          />
        </div>

        {reviews.length > 0 && 
          <div className="pb-16 max-sm:pb-12">
            <Reviews 
              movieId={details.id}
              mediaType={mediaType} 
              title={details.title}
              reviews={reviews}
            />
          </div>
        }

        <div className="pb-16 max-sm:pb-12">
          <Details
            details={details}
            releaseDate={releaseDate}
            originCountry={originCountry}
            externalIds={externalIds}
          />
        </div>

        <div className="pb-16 max-sm:pb-12">
          <BoxOffice 
            details={details}
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

export default DetailsMovieMore;