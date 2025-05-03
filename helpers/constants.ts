const MEDIA_TYPE = [
    {
      id: "movie",
      title: "Movies",
      icon: "/icons/movie.svg",
      categories: [
        {id: "now-playing", title: "Now Playing", icon: "/images/now playing.svg"}, 
        {id: "popular", title: "Popular", icon: "/images/popular.svg"},
        {id: "top-rated", title: "Top Rated", icon: "/images/top rated.svg"},
        {id: "upcoming", title: "Upcoming", icon: "/images/upcoming.svg"}
      ]
    },
    {
      id: "tv",
      title: "Tv Shows",
      icon: "/icons/tv.svg",
      categories: [
        {id: "airing-today", title: "Airing Today", icon: "/images/airing today.svg"}, 
        {id: "on-the-air", title: "On The Air", icon: "/images/on the air.svg"},
        {id: "popular", title: "Popular", icon: "/images/popular.svg"},
        {id: "top-rated", title: "Top Rated", icon: "/images/top rated.svg"}
      ]
    },
    {
      id: "stars",
      title: "Stars",
      icon: "/icons/people.svg",
      categories: []
    },
];

export {
    MEDIA_TYPE
}