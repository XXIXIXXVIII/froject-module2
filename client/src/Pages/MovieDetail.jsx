import { useParams } from "react-router";
import useAxios from "../api/useAxios";
import tmdbConfigClient from "../api/tmdbConfigClient";
import LoadingUI from "../component/Notification/LoadingUI.jsx";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import "./index.css";
import { BsFillPlayFill } from "react-icons/bs";
import { FiShare, FiDownload } from "react-icons/fi";
import TextTruncate from "react-text-truncate";
import { useEffect, useState } from "react";


import Cmt from "../component/Cmt";
import TopBilledCast from "../component/TopBilledCast";
import Recommendations from "../component/Recommendations";
import Trailer from "../component/Trailer";
import { Link } from "react-router-dom";
import instance from "../api/axios.client";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike } from "../redux/likeSlice";

function MovieDetail() {
  const params = useParams();
  let { mediaType, mediaId } = params;
  const [readMore, setReadMore] = useState(4);
  const [numberNav, setNumberNav] =useState(1)
  const [datalike, setDatalike] = useState([]);
  const [checkLike, setCheckLike] = useState(false);

  const { data, err, isLoading } = useAxios(`${mediaType}/detail/${mediaId}`);
  const cast = data?.credits?.cast?.slice(0, 5);
  const username = useSelector(state=>state.user.username)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    const fetchData = async()=>{
      const data = await instance.post(`/like/get`, {username})
      setDatalike(data?.data?.map(item=>+item.movieId))
    }
    fetchData()
  },[username, data])

  useEffect(()=>{
    let check = datalike.some(item=>item===+mediaId)
    setCheckLike(check)
    if(check){setCheckLike(true)}else{setCheckLike(false)}
  },[datalike, mediaId])

  const handleLike=()=>{
    if(checkLike){dispatch(removeLike({username:username, mediaId:mediaId}))}else{
      dispatch(addLike({mediaType:mediaType, mediaId:mediaId, username:username, mediaImg:data.poster_path}))
    }
    setCheckLike(!checkLike)
  }


  return (
    <div>
      {err ? <h1>{err}</h1> : <></>}
      {isLoading ? <LoadingUI /> : <></>}
      <div className="w-[90vw] mx-auto">
        <div className="">
          <div className="flex overflow-hidden">
            <div className="w-[40%] mt-28 relative z-40 flex flex-col mb-[50px] gap-6">
              <h1 className="text-5xl mb-8">{data.original_title||data.original_name}</h1>
              <div className="flex gap-8 ">
                <div className="text-[rgb(0,214,57)] flex items-center ">
                  <AiFillStar className="mr-1" />
                  <span>{data.vote_average}</span>
                </div>
                <span className="releaseDate">{data.release_date?data.release_date:data.first_air_date  }</span>
                <span className="runtime">{data.runtime? `${data.runtime} phút`:`${data?.seasons?.length} season`  }</span>
              </div>
              <div className="flex gap-4">
                {data?.genres?.map((item,index)=><div key={index} className="bg-[rgba(255,255,255,0.15)] rounded-sm text-sm p-1">{item.name}</div>)}
              </div>
              <div>
                <span className="text-[rgb(169,169,172)]">
                  Diễn Viên Chính:
                </span>
                {cast ? cast.map((item,id) => <Link className="hover:underline hover:text-[rgb(0,194,52)]" key={id}>{item.name},  </Link>) : <></>}
              </div>
              <div>
                <span className="text-[rgb(169,169,172)]">Miêu tả : </span>
                <TextTruncate
                  line={readMore}
                  element="span"
                  truncateText="…"
                  text={`${data.overview}`}
                  textTruncateChild={
                    <button
                      onClick={() => setReadMore(0)}
                      className="text-[rgb(28,199,73)]"
                    >
                      Read More
                    </button>
                  }
                />
              </div>
              <div className="flex gap-5">
                <button className="bg-[rgb(28,199,73)] hover:bg-[rgb(73,210,109)] items-center px-4 flex rounded font-semibold h-9 text-lg">
                  <BsFillPlayFill className="inline mr-2" /> Play
                </button>
                <button className="bg-[rgb(45,47,52)] hover:bg-[rgb(86,87,91)] items-center px-4 flex rounded font-semibold h-9 text-lg">
                  <FiShare className="inline mr-2" /> Share
                </button>
                <button className="bg-[rgb(45,47,52)] hover:bg-[rgb(86,87,91)] items-center px-4 flex rounded font-semibold h-9 text-lg">
                  <FiDownload className="inline mr-2" /> App
                </button>
                <div className="bg-[rgb(45,47,52)] cursor-pointer hover:bg-[rgb(86,87,91)] items-center px-4 flex rounded font-semibold h-9 text-lg">
                <span onClick={handleLike} className="mr-2">Collection</span>
                {checkLike?  
                <AiFillHeart className=" text-red-700" />:
                <AiFillHeart className=" hover:text-red-500" />}
                </div>
              </div>
            </div>
            <div className="w-[70%] overflow-hidden absolute right-0 ">
              <img
                className="w-full right-0"
                src={tmdbConfigClient.backdrop(data.backdrop_path)}
              />
              <div className="bgrmovieDetail w-[52%] top-0 left-0 h-full absolute"></div>
              <div className="bgrmovieDetailBot w-[95%] right-0 h-[30%]  bottom-0 absolute"></div>
            </div>
          </div>
        </div>
    
        <div>
         <div className="navBar flex gap-10 font-normal my-4">
            <div className="navItem pb-4" style={numberNav===1?{borderBottom:"4px solid green", opacity:"1", fontWeight:"700", fontSize:"18px"}:{borderBottom:"0px"}} onClick={()=>setNumberNav(1)}>Comment</div>
            <div className="navItem pb-4" style={numberNav===2?{borderBottom:"4px solid green", opacity:"1", fontWeight:"700", fontSize:"18px"}:{borderBottom:"0px"}} onClick={()=>setNumberNav(2)}>Top Billed Cast</div>
            <div className="navItem pb-4" style={numberNav===3?{borderBottom:"4px solid green", opacity:"1", fontWeight:"700", fontSize:"18px"}:{borderBottom:"0px"}} onClick={()=>setNumberNav(3)}>Recommendations</div>
            <div className="navItem pb-4" style={numberNav===4?{borderBottom:"4px solid green", opacity:"1", fontWeight:"700", fontSize:"18px"}:{borderBottom:"0px"}} onClick={()=>setNumberNav(4)}>Trailer</div>
         </div>
         <div>
            {numberNav===1&&<Cmt mediaId={mediaId}/>}
            {numberNav===2&&<TopBilledCast prop={data?.credits?.cast}/>}
            {numberNav===3&&<Recommendations prop={data?.recommendations.results}/>}
            {numberNav===4&&<Trailer trailer={data.video.results}/>}
         </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
