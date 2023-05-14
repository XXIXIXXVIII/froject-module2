const mediaType ={
  movie: "movie",
  tv: "tv"
}

const urlClient = (url)=>`http://localhost:5173/${url}`

const mediaCategory = {
  popular: "popular",
  topRated:"top_rated",
  upcoming:"upcoming",
  nowPlaying: "now_playing",
  latest:"latest",
  tvOnTheAir:"on_the_air",
  tvAiringToday:"airing_today"
}

const mediaOption ={
  videos:"videos",
  similar:"similar",
  credits: "credits"
}

const poster =(url)=> `https://image.tmdb.org/t/p/w500${url}`
const backdrop =(url)=> `https://image.tmdb.org/t/p/original${url}`
const videos = (key) =>`https://www.youtube.com/embed/${key}?controls=0`

const tmdbConfigClient ={
  mediaType, mediaCategory, mediaOption, poster, backdrop, videos,urlClient
}


export default tmdbConfigClient