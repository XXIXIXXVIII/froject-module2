/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick.css";
import INSIDIOUS5 from "../../assets/video/INSIDIOUS5.mp4";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingUI from "../Notification/LoadingUI";
import tmdbConfigClient from "../../api/tmdbConfigClient";
import TextTruncate from "react-text-truncate";
import {
  AiFillPlayCircle,
  AiFillStar,
  AiOutlineEye,
  AiFillHeart,
} from "react-icons/ai";
import { IoEnter } from "react-icons/io5";
import { BsCalendar2Date } from "react-icons/bs";
import mediaEndpoint from "../../api/mediaEndpoint";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike } from "../../redux/likeSlice";
import instance from "../../api/axios.client";


function Slick(prop) {
  let { data, title, isLoading, err, mediaType } = prop;
  const [number, setNumber] = useState();
  const [datalike, setDatalike] = useState([]);
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch()
  const username = useSelector(state=>state.user.username)

  useEffect(()=>{
    const fetchData = async()=>{
      const data = await instance.post(`/like/get`, {username})
      setDatalike(data?.data?.map(item=>+item.movieId))
    }
    fetchData()

  },[username])

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "1000px",
    slidesToShow: 5,
    swipeToSlide: true,
  };
  
  const hoverImg = (index) => {
    setToggle(true);
    setNumber(index);
  };
  const outImg = (index) => {
    setNumber(index);
    setToggle(false);
  };

  const handleLike = (item) => {
    if(datalike?.includes(item.id)){
      let newlike=datalike?.filter(like=>like!==item.id)
      setDatalike(newlike)
      dispatch(removeLike({username:username, mediaId:item.id}))
    }else{
      dispatch(addLike({mediaType:mediaType, mediaId:item.id, username:username, mediaImg:item.poster_path}))
      setDatalike([...datalike,item.id])
    }
  };
  
  return (
    <>
      {isLoading ?? <LoadingUI />}
      {data.length > 0 && err === null ? (
        <div className="wrap mb-20">
          <h2 className="text-3xl mb-5 font-semibold">{title}</h2>
          <Slider {...settings}>
            {data.map((item, index) => (
              <div key={item.id} className="center video-container rounded-md ">
                <div>
                  <div
                    onMouseLeave={(e) => outImg(index, e)}
                    onMouseEnter={(e) => hoverImg(index, e)}
                    className="movieSlick rounded-md overflow-hidden h-full duration-500 w-full absolute hover:z-40 hover:scale-125 bg-[#181818]"
                  >
                    {number === index && toggle ? (
                      <div className="relative">
                        <Link to={`${mediaType}/detail/${item.id}`}>
                          <img
                            className=" opacity-10 z-0 absolute w-full h-fit"
                            src={tmdbConfigClient.poster(item.poster_path)}
                            style={{ display: toggle ? "block" : "none" }}
                          />
                        </Link>

                        <div className="flex w-10/12 mx-auto flex-col absolute z-10 left-1/2 -translate-x-1/2 top-1 text-xs font-light gap-4">
                          <Link className="my-4" to={`${mediaType}/detail/${item.id}`}>
                            <h3 className="text-2xl hover:text-[rgb(28,199,73)] font-medium p-5 -mb-5 text-center">
                              {item.original_title||item.original_name}
                            </h3>
                          </Link>
                          <div className="flex justify-between  text-4xl">
                            <div className="flex gap-2">
                              <AiFillPlayCircle className="cursor-pointer text-[rgb(28,199,73)] hover:text-[rgba(28,199,74,0.64)]" />{" "}
                              <div onClick={() => handleLike(item,index)}>
                                 {datalike?.includes(item.id)?(
                                  <AiFillHeart className="cursor-pointer text-red-700" />
                                ) : (
                                  <AiFillHeart className="cursor-pointer hover:text-red-500" />
                                )}
                              </div>
                            </div>
                            <Link to={`${mediaType}/detail/${item.id}`}><IoEnter className="cursor-pointer hover:text-gray-400" /></Link>
                          </div>
                          <div className="flex justify-between ">
                            <span className="text-[rgb(28,199,73)]">
                              <AiFillStar className="inline mr-1 text-base  " />{" "}
                              Điểm : {item.vote_average}
                            </span>
                            <span>Lượt đánh giá : {item.vote_count}</span>
                          </div>
                          <span>
                            <AiOutlineEye className="inline mr-1 text-base " />{" "}
                            Lượt xem : {item.popularity}
                          </span>
                          <div className="mb-5">
                            <BsCalendar2Date className="inline mr-1 text-base " />{" "}
                            Ngày sản xuất : {item.release_date}
                          </div>
                          <TextTruncate
                            line={6}
                            element="span"
                            truncateText="…"
                            text={item.overview}
                            textTruncateChild={<Link to={`${mediaType}/detail/${item.id}`} className="text-[rgb(28,199,73)]">Read on</Link>}
                          />
                        
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={mediaEndpoint.detail({
                          mediaType,
                          mediaId: item.id,
                        })}
                      >
                        <img
                          className="duration-500 "
                          src={tmdbConfigClient.poster(item.poster_path)}
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Slick;
