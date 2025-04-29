import { KnownFor, Photos, Credits } from "@components/DetailsPerson/sections";

import { IDetailsPersonMore } from "@types";

const DetailsPersonMore = ({details, credits, images}: IDetailsPersonMore) => {
  return (
    <section className="py-12 px-5 max-md:px-3">
      {credits.cast.length > 0 &&
        <div className="pt-5 pb-16 max-sm:pb-12">
          <KnownFor 
            works={credits.cast}
          />
        </div>
      }
      
      {images.length > 0 &&
        <div className="pb-16 max-sm:pb-12">
          <Photos 
            personId={details.id}
            name={details.name}
            images={images}
          />
        </div>
      }
      
      <div className="pb-16 max-sm:pb-12">
        <Credits 
          credits={credits}
        />
      </div>
      
      <div className="mb-[-2rem]"></div>
    </section>
  )
}

export default DetailsPersonMore;