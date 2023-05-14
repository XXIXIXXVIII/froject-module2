import { useEffect, useRef, useState } from "react";
import INSIDIOUS from "../assets/video/INSIDIOUS5.mp4";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slick from "../component/Slick/Slick.jsx";
import useAxios from "../api/useAxios";
import mediaEndpoint from "../api/mediaEndpoint";
import tmdbConfigClient from "../api/tmdbConfigClient.jsx";
import {IoVolumeHighOutline, IoVolumeMuteOutline} from "react-icons/io5"

function Home() {
  const [banner, setBanner] = useState(false);
  const [volume, setVolume] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef()

  let banerBig = {
    transform: "scale(0.7 )",
    top: "55%",
    left: "0%",
  };


  useEffect(() => {
    const handler=setTimeout(() => {
      setBanner(true);
    }, 3000);
    return ()=>clearTimeout(handler)
  }, []);

  const moviePopular = useAxios(
    mediaEndpoint.list({
      mediaType: tmdbConfigClient.mediaType.movie,
      mediaCategory: tmdbConfigClient.mediaCategory.popular,
      page: 1,
    })
  );
  const movieTopRated = useAxios(
    mediaEndpoint.list({
      mediaType: tmdbConfigClient.mediaType.movie,
      mediaCategory: tmdbConfigClient.mediaCategory.topRated,
      page: 1,
    })
  );
  const movieUpcoming = useAxios(
    mediaEndpoint.list({
      mediaType: tmdbConfigClient.mediaType.movie,
      mediaCategory: tmdbConfigClient.mediaCategory.upcoming,
      page: 1,
    })
  );
  const movieNowPlaying = useAxios(
    mediaEndpoint.list({
      mediaType: tmdbConfigClient.mediaType.movie,
      mediaCategory: tmdbConfigClient.mediaCategory.nowPlaying,
      page: 1,
    })
  );


  const tvPopular = useAxios(
    mediaEndpoint.list({
      mediaType: tmdbConfigClient.mediaType.tv,
      mediaCategory: tmdbConfigClient.mediaCategory.popular,
      page: 1,
    })
  );
  const tvTopRated = useAxios(
    mediaEndpoint.list({
      mediaType: tmdbConfigClient.mediaType.tv,
      mediaCategory: tmdbConfigClient.mediaCategory.topRated,
      page: 1,
    })
  );
  const tvOnTheAir = useAxios(
    mediaEndpoint.list({
      mediaType: tmdbConfigClient.mediaType.tv,
      mediaCategory: tmdbConfigClient.mediaCategory.tvOnTheAir,
      page: 1,
    })
  );
  const tvAiringToday = useAxios(
    mediaEndpoint.list({
      mediaType: tmdbConfigClient.mediaType.tv,
      mediaCategory: tmdbConfigClient.mediaCategory.tvAiringToday,
      page: 1,
    })
  );

  useEffect(()=>{
    audioRef.current.muted = muted
  },[muted])
  const handleVolume = ()=>{
    setVolume(!volume)
    setMuted(!muted)
  }

  return (
    <div className="min-h-screen">
      <div className="w-full  ">
        <div className="w-full relative top-[-16px]">
          <video id="myVideo" src={INSIDIOUS} ref={audioRef} autoPlay loop ></video>
          <div
            style={banner ? banerBig : {}}
            className="absolute top-[35%] w-[34%] left-[10%]  duration-300"
          >
            <img src="https://dx35vtwkllhj9.cloudfront.net/sonypictures/insidious-the-red-door/images/regions/us/tt.png"></img>
          </div>
          <div className="absolute top-[87%] w-[40%] left-[8%] duration-300 flex">
            <button className="bg-white hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded inline-flex items-center">
              <BsFillPlayFill className="mr-2 text-2xl " />
              <span>Play</span>
            </button>
            <button className="ml-7 text-white bg-gray-600 hover:bg-[rgba(156,163,175,0.17)] font-bold py-2 px-4 rounded inline-flex items-center">
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              <AiOutlineInfoCircle className="mr-2 text-2xl " />
              <span>More Info</span>
            </button>
          </div>
          <div onClick={()=>handleVolume()} className="absolute text-3xl border-[1px] border-[rgba(255,255,255,0.7)] p-2 cursor-pointer hover:bg-[rgba(255,255,255,0.1)] rounded-full bottom-28 right-24" >
            {volume?
            <IoVolumeMuteOutline className="z-10 rounded-full hover:bg-[rgba(255, 255, 255, 0.1)]"/>
            :<IoVolumeHighOutline className=" z-10 rounded-full hover:bg-[rgba(255, 255, 255, 0.1)]"/>}
          </div>
        </div>
      </div>
      <Slick
        data={moviePopular.data}
        isLoading={moviePopular.isLoading}
        err={moviePopular.err}
        title={"Movie Popular"}
        mediaType={tmdbConfigClient.mediaType.movie}
      />
      <Slick
        data={movieTopRated.data}
        isLoading={movieTopRated.isLoading}
        err={movieTopRated.err}
        title={"Movie Top Rated"}
        mediaType={tmdbConfigClient.mediaType.movie}
      />
      <Slick
        data={movieUpcoming.data}
        isLoading={movieUpcoming.isLoading}
        err={movieUpcoming.err}
        title={"Movie Up Coming"}
        mediaType={tmdbConfigClient.mediaType.movie}
      />
      <Slick
        data={movieNowPlaying.data}
        isLoading={movieNowPlaying.isLoading}
        err={movieNowPlaying.err}
        title={"Movie Now Playing"}
        mediaType={tmdbConfigClient.mediaType.movie}
      />


      <Slick
        data={tvPopular.data}
        isLoading={tvPopular.isLoading}
        err={tvPopular.err}
        title={"TV Popular"}
        mediaType={tmdbConfigClient.mediaType.tv}
      />
      <Slick
        data={tvTopRated.data}
        isLoading={tvTopRated.isLoading}
        err={tvTopRated.err}
        title={"TV Top Rated"}
        mediaType={tmdbConfigClient.mediaType.tv}
      />
      <Slick
        data={tvAiringToday.data}
        isLoading={tvAiringToday.isLoading}
        err={tvAiringToday.err}
        title={"TV Airing Today"}
        mediaType={tmdbConfigClient.mediaType.tv}
      />
      <Slick
        data={tvOnTheAir.data}
        isLoading={tvOnTheAir.isLoading}
        err={tvOnTheAir.err}
        title={"TV On The Air"}
        mediaType={tmdbConfigClient.mediaType.tv}
      />
      
    </div>
  );
}

export default Home;
