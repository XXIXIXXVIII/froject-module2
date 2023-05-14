import { Link } from "react-router-dom";
import tmdbConfigClient from "../api/tmdbConfigClient";
import "../Pages/index.css"
import {AiFillPlayCircle} from "react-icons/ai"
import { useState } from "react";

function Recommendations(prop) {
  let data = prop.prop;
  let [isPlay, setIsplay] = useState(false)
  let [numberHover, setNumberHover] = useState()

  const handleHover =(index)=>{
    setNumberHover(index)
    setIsplay(true)
  }
  const handleLeave =(index)=>{
    setNumberHover(index)
    setIsplay(false)
  }

  return (
    <div className="grid grid-cols-4 gap-14 w-[90%] mx-auto mt-20 ">
      {data && data.length > 0 ? (
        data.map((item, index) => (
            <Link to={tmdbConfigClient.urlClient(`${item.media_type}/detail/${item.id}`)} onMouseEnter={()=>handleHover(index)} onMouseLeave={()=>handleLeave(index)} className="Recomment hover:text-[rgb(28,199,73)] hover:scale-110" key={index}>
              <div className="relative"><img src={tmdbConfigClient.poster(item.poster_path)} />
              {isPlay&&numberHover===index?<AiFillPlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl"/>:<></>}
              </div>
              <span className="block text-lg ml-1 mt-5">{item.original_title || item.title}</span>
            </Link>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default Recommendations;
