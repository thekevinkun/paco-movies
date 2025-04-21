import Link from "next/link";
import Image from "next/image";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { FaPlay } from "react-icons/fa";
import { AiOutlineExclamationCircle } from "react-icons/ai";

import { roundedToFixed } from "@helpers/helpers";

const getRecommendations = (data: any) => {
  return data.map((item: any) => (
    <div key={item.id} className="keen-slider__slide">
      <div className="flex flex-col">
        <Link
          href={`/title/${item.media_type}/${item.id + "-" + 
              (item.title || item.name)?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}
          className="bg-dark w-full h-[346px]"
        >
          <Image
            priority
            unoptimized
            loader={() => item.poster_path && `https://image.tmdb.org/t/p/w500${item.poster_path}`}
            src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 
                item.media_type === "person" ? "/images/not-found-person.png" : 
                "/images/not-found-poster.jpg"
            }
            alt="Poster"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover opacity-90"
          />
        </Link>

        <div className="px-2 py-3 w-auto h-auto bg-light rounded-b-lg">
          <div className="flex items-center gap-1">
            <Image
              src="/icons/star.svg"
              alt="Rating Star"
              width={18}
              height={18}
              className="relative object-contain bottom-[1px]"
            />

            <span 
              className={`text-dark-1
                ${item.vote_average > 0 ? "font-medium" : "font-normal italic"}`}
            >
              {item.vote_average > 0 ? roundedToFixed(item.vote_average, 1) : "NaN"}
            </span>
          </div>

          <Link 
            href={`/title/${item.media_type}/${item.id + "-" + 
                (item.title || item.name)?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}
            title={item.title || item.name} 
            className="pt-3 inline-block w-fit"
          >
            <h2 className="title-line-clamp text-dark 
                max-md:text-sm font-semibold hover:text-tale"
            >
                {item.title || item.name}
            </h2>
          </Link>
                    
          <div className="pt-5 pb-3 px-7 flex items-center justify-between">
            <Link
              href={`/title/${item.media_type}/${item.id + "-" + 
                  (item.title || item.name)?.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}`}
              className="flex items-center gap-2 text-dark hover:text-light-2"
            >
              <FaPlay/>
              <span className="font-medium">Trailer</span>
            </Link>

            <AiOutlineExclamationCircle
              className="text-2xl text-dark-1 hover:text-gray-700 cursor-pointer"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  ))
}

const Recommendations = ({recommendations}: any) => {
  const [sliderRef, slider] = useKeenSlider({
    loop: false,
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 2.25, spacing: 12 },
      }
    },
    slides: {
      perView: 4.25,
      spacing: 13
    },
    mode: "free-snap",
    // slideChanged: (s) => setCurrentSlide(s.track.details.rel)
  })

  return (
    <div className="pt-16 max-sm:pt-12">
        <h3 className="text-main text-2xl max-sm:text-xl font-semibold">
            Recommendations
        </h3>

        <div ref={sliderRef} className="pt-7 keen-slider">
          {getRecommendations(recommendations)}
      </div>
    </div>
  )
}

export default Recommendations;