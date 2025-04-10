const CardMovieTop = ({id, poster, backDrop, title, 
      overview, mediaType, releaseDate, rating}: ICardMovieTop) => {
  
  return (
    <>
      {/* Poster on left side */}
      <div className="max-xl:hidden bg-dark rounded-l-md grow shrink-0 basis-auto w-72">
        <Image
          priority
          unoptimized
          loader={() => poster && `https://image.tmdb.org/t/p/original${poster}`}
          src={poster ? `https://image.tmdb.org/t/p/original${poster}` : 
              !poster && mediaType === "person" ? "/images/not-found-person.png" : 
              !poster && mediaType !== "person" && "/images/not-found-poster.jpg"}
          alt="Poster"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover rounded-l-md opacity-90"
        />
      </div>
     
        <div className="relative w-full h-full flex flex-col justify-center z-30">
          {/* Title */}
          <Link 
            href={
                mediaType === "movie" || mediaType === "tv" ? routeMovie
              : mediaType === "person" && routePerson
            } 
            title={title} 
            className="inline-block w-fit"
          >
            <h2 className="text-2xl text-white font-extrabold capitalize hover:text-tale">
              {title}{" "}
          </Link>
        </div>
    </>
  )
}

export default CardMovieTop;