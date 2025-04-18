"use client"

import Link from "next/link";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { IoMdPlay } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";

const getVideos = (videos: any) => {
  return videos.slice(0, 10).map((video: any) => (
    <div
      key={video.id}
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('https://i.ytimg.com/vi/${video.key}/hqdefault.jpg')`,
      }}
      className="keen-slider__slide rounded-xl" 
    >
      <div className="">
        <Link
          href={`/video/play?key=${video.key}`}
          className="group"
          data-site={video.site}
          data-id={video.key}
          data-title={video.name}
        >
          <div className="w-[67px] h-[67px] flex items-center justify-center rounded-full 
              bg-dark bg-opacity-70 group-hover:bg-opacity-100 transition-[background] duration-200">
            <IoMdPlay className="text-white text-4xl"/>
          </div>
        </Link>
      </div>
    </div>
  ));
};

const Videos = ({movieId, mediaType, title, videos}: 
      {movieId: number, mediaType: string, title: string, videos: any}) => {
  
  const [sliderRef] = useKeenSlider({
    loop: false,
    slides: {
      perView: 3,
      spacing: 15
    },
    mode: "free-snap"
  })

  return (
    <div>
      <Link 
        href={`/title/${mediaType}/${movieId + "-" 
          + title.toLowerCase().replace(/[^A-Z0-9]+/ig, "-")}/videogallery`} 
        className="group flex items-center w-fit"
      >
        <h3 className="text-2xl max-sm:text-xl font-semibold">Videos</h3>
        <span className="pl-3 text-xs text-gray-600">{videos.length}</span>

        <MdArrowForwardIos 
          className="text-3xl max-sm:text-2xl font-semibold 
              transition-colors duration-200 group-hover:text-tale"
        />
      </Link>
      
      <div className="pt-7">
        <div style={{
          maxWidth: "100%",
          margin: "auto"
        }}>
        </div>
        <div ref={sliderRef} className="keen-slider">
          {getVideos(videos)}
        </div>
      </div>
    </div>
  )
}

export default Videos;