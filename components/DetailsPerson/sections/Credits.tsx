"use client"

import { useState } from "react";
import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";

import { CardPersonCredits } from "@components";


const getCredits = (creditsType: string, credits: any, endIndexNumber: number) => {
  let filtered = [];

  if (creditsType === "Actor") {
    filtered = credits.cast;
  } else if (creditsType === "Producer") {
    filtered = credits.crew.filter(
      (item: any) => item.job === "Producer" || item.job === "Executive Producer"
    );
  } else {
    filtered = credits.crew.filter((item: any) => item.job === creditsType);
  }

  return filtered.slice(0, endIndexNumber).map((item: any) => (
    <CardPersonCredits 
      key={item.id}
      id={item.id}
      mediaType={item.media_type}
      title={item.title || item.name}
      character={item.character} 
      releaseDate={item.release_date}
      poster={item.poster_path}
      vote={item.vote_average}
    />
  ))
}
  
const Credits = ({credits}: any) => {
  
  const [creditsType, setCreditsType] = useState("Actor");
  const [seeAllCredits, setSeeAllCredits] = useState(false);
  
  const listOfCredits = credits.crew.map(({ job }: any) => job);

  const jobsMap: Record<string, number> = {};

  if (credits.cast) {
    jobsMap["Actor"] = credits.cast.length;
  }

  listOfCredits.forEach((job: string) => {
    const normalizedJob = job === "Executive Producer" ? "Producer" : job;
    jobsMap[normalizedJob] = (jobsMap[normalizedJob] || 0) + 1;
  });

  const jobs = Object.entries(jobsMap)
    .map(([job, total]) => ({ job, total }))
    .sort((a, b) => b.total - a.total);
        
  return (
    <>
      <h3 className="text-main text-2xl max-sm:text-xl font-semibold">
         Credits
      </h3>

      <div className="pt-5">
        <div className="flex flex-wrap items-center gap-5 max-md:gap-3">
          {jobs.map((item: any) => (
              <button 
                key={item.job}
                type="button"
                className={`btn-person-credits 
                  ${creditsType === item.job && "btn-person-credits-active"}`
                }
                onClick={() => setCreditsType(item.job)}
              >
                {item.job}
                <span> &#8226; {item.total}</span>
              </button>
          ))}
        </div>

        <div className="pt-7 flex flex-col">
          {!seeAllCredits && jobs[jobs.findIndex(x => x.job === creditsType)].total > 15 ?
            <>
              {getCredits(creditsType, credits, 15)}
              
              <div className="w-fit px-3 py-4">
                <div 
                  className="px-3 py-1 text-tale font-medium bg-transparent rounded-full 
                      flex items-center gap-2 cursor-pointer transition-all duration-150 
                      hover:bg-tale/20"
                  onClick={() => setSeeAllCredits(true)}
                >
                  See all
                  <PiCaretDownBold 
                    className="text-lg"
                  />
                </div>
              </div>
            </>
            :
            <>
              {getCredits(creditsType, credits, credits.length)}

              { jobs[jobs.findIndex(x => x.job === creditsType)].total > 15 &&
                <div className="w-fit px-3 py-4">
                  <div 
                    className="px-3 py-1 text-tale font-medium bg-transparent rounded-full 
                        flex items-center gap-2 cursor-pointer transition-all duration-150
                        hover:bg-tale/20"
                    onClick={() => setSeeAllCredits(false)}
                  >
                    Hide
                    <PiCaretUpBold 
                      className="text-lg"
                    />
                  </div>
                </div>
              }
            </>
          }
        </div>
      </div>
    </>
  )
}

export default Credits;