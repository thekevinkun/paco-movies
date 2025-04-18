import { Videos, Photos, Credits, Reviews, 
        Details, BoxOffice, Recommendations } from "./sections";

import { IDetailsMovieMore } from "@types";

const DetailsMovieMore = ({mediaType, details, releaseDate, videos, 
      posters, backdrops, credits, externalIds, reviews, recommendations}: IDetailsMovieMore) => {
  
  return (
    <section className="py-12 px-5 max-md:px-3">
        <Videos 
          movieId={details.id}
          mediaType={mediaType} 
          title={details.title}
          videos={videos} 
        />
        <Photos 
          movieId={details.id}
          mediaType={mediaType} 
          title={details.title}
          posters={posters} 
          backdrops={backdrops} 
        />
        <Credits
          movieId={details.id}
          mediaType={mediaType} 
          title={details.title}
          casts={credits.cast} 
          crews={credits.crew}
        />
        <Reviews 
          movieId={details.id}
          mediaType={mediaType} 
          title={details.title}
          reviews={reviews}
        />
        <Details
          details={details}
          releaseDate={releaseDate}
          externaIds={externalIds}
        />
        <BoxOffice 
          details={details}
        />
        <Recommendations 
          recommendations={recommendations}
        />
    </section>
  )
}

export default DetailsMovieMore;