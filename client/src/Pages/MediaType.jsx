import useAxios from "../api/useAxios";
import tmdbConfigClient from "../api/tmdbConfigClient";
import { useLocation, useParams } from "react-router";
import { AiFillCaretDown } from "react-icons/ai";
import { MdOutlineSort } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import loading from "../assets/img/loading.gif";

function MediaType() {
  const mediaType = useParams().mediaType;
  const [page, setPage] = useState(1);
  const [showGenres, setShowGenres] = useState(false);
  const [idGenres, setIdGenres] = useState();
  const [dataMovie, setDataMovie] = useState([]);
  const [sortBy, setSortby] = useState("vote_count.desc");


  let { data, err, isLoading } = useAxios(
    `/discover/${mediaType}?with_genres=${idGenres}&sort_by=${sortBy}&page=${page}`
  );
  let genres = useAxios("/movie/genre").data.genres;


  const handleLoading = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((page) => page + 1);
    }
  };
  useEffect(() => {
    if(window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight){
        setDataMovie((prev) => [...prev, ...data])
      }
  }, [data]);

  useEffect(() => {
    window.addEventListener("scroll", handleLoading);
  }, []);

  const handleGenre = (id,e) => {
    e.stopPropagation()
    setIdGenres(id);
  };
  useEffect(()=>{
    setDataMovie(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ idGenres, sortBy])

  const handleOption=(e)=>{
    e.stopPropagation()
    setSortby(e.target.value)
  }
  const handleParen=(e)=>{
    if(e.target===e.currentTarget){
      setShowGenres(false)
    }
  }

  return (
    <div className="mt-20 w-[95%] mx-auto" >
      {err ? (
        <h1>{err}</h1>
      ) : (
        <div>
          <div className="flex my-20 justify-between" onClick={(e)=>handleParen(e)}>
            <div className="flex gap-14 items-center justify-between w-2/12 ">
              <h2 className="text-4xl font-medium ">Movies</h2>
              <div className="relative">
                <div className="bg-black border-[1px] w-full border-white hover:bg-[hsla(0,20%,100%,.1)] outline-none">
                  <div
                    onClick={() => setShowGenres(!showGenres)}
                    className="w-[90%] z-10  px-3 py-1 flex justify-between mx-auto items-center cursor-pointer"
                  >
                    <span>Genres</span>
                    <AiFillCaretDown className="ml-2 text-2xl" />
                  </div>
                </div>
                {genres && showGenres ? (
                  <ul className="grid duration-300 grid-cols-3 justify-items-center gap-2 py-3 mt-2 outline-none absolute w-[30vw] bg-[rgba(0,0,0,.9)] border-[1px] border-[hsla(0,0%,100%,.15)]">
                    {genres.map((genre) => (
                      <li key={genre.id}>
                        <Link
                          onClick={(e) => handleGenre(genre.id,e)}
                          className="hover:underline"
                        >
                          {genre.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <MdOutlineSort className="text-3xl mr-4" />
              </div>
              <div className="flex ">
                <select onChange={(e)=>handleOption(e)} className="bg-black border flex px-8 border-white text-white text-sm p-2.5">
                  <option value="vote_count.desc">Vote Count </option>
                  <option value="revenue.desc">Revenue</option>
                  <option value="popularity.desc">popularity</option>
                  <option value="release_date.desc">Release Date</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-x-2 gap-y-20 mb-20">
            {dataMovie.map((item, index) => (
              item.poster_path?
                <Link to={`detail/${item.id}`} key={index}>
                  <img
                    className="rounded-md"
                    src={tmdbConfigClient.poster(item.poster_path)}
                  />
                </Link>:<></>
              
            ))}
          </div>
          {isLoading ? (
            <div>
              <img className="z-30 w-[5vw] mx-auto" src={loading} />
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}
export default MediaType;
