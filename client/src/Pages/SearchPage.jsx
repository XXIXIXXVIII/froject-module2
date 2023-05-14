import { useDispatch, useSelector } from "react-redux";
import tmdbConfigClient from "../api/tmdbConfigClient";
import searchLoading from "../assets/img/loading.gif";
import "./index.css";
import { useState } from "react";
import { searchData } from "../redux/searchSlice";

function SearchPage() {
  const { data, err, status } = useSelector((state) => state.search);
  const [focus, setFocus] = useState("movie");
  const [imgErr, setImgErr] = useState(false);

  const search = useSelector((state) => state.search.searchkey);
  const dispatch = useDispatch();

  const handleFocusMovie = () => {
    dispatch(searchData({ search: search, mediaType: "movie" }));
    setFocus("movie");
  };

  const handleFocusTv = () => {
    setFocus("tv");
    dispatch(searchData({ search: search, mediaType: "tv" }));
  };

  const handleFocusPerson = () => {
    setFocus("Person");
    dispatch(searchData({ search: search, mediaType: "person" }));
  };

  return (
    <div className="my-36 w-[90%] mx-auto min-h-screen">
      <div className="w-[60%] mx-auto flex items-center justify-around mb-8">
        <button
          onClick={() => handleFocusMovie()}
          style={{ background: focus === "movie" ? "#e50914" : "none" }}
          className="text-gray-300 font-bold text-base hover:text-white border border-red-700 hover:bg-[#e50914] focus:outline-none rounded-lg px-9 py-4 text-center mr-2 mb-2 "
        >
          Movie
        </button>
        <button
          onClick={() => handleFocusTv()}
          style={{ background: focus === "tv" ? "#e50914" : "none" }}
          className="text-gray-300 font-bold text-base hover:text-white border border-red-700 hover:bg-[#e50914] focus:outline-none rounded-lg px-9 py-4 text-center mr-2 mb-2 "
        >
          Tv
        </button>
        <button
          onClick={() => handleFocusPerson()}
          style={{ background: focus === "Person" ? "#e50914" : "none" }}
          className="text-gray-300 font-bold text-base hover:text-white border border-red-700 hover:bg-[#e50914] focus:outline-none rounded-lg px-9 py-4 text-center mr-2 mb-2 "
        >
          Person
        </button>
      </div>

      {err ? <h1>Lỗi {err}</h1> : <></>}
      {status === "loading" && (
        <img
          className="fixed top-[30vh] left-1/2 -translate-x-1/2  w-[6vw]"
          src={searchLoading}
        />
      )}
      <div className="flex gap-6 mb-6 flex-wrap">
        <span className="text-gray-400 pointer-events-none">
          Explore titles related to:
        </span>
        <ul className="list-keySearch flex  text-base">
          {data?.key?.results?.slice(0, 10).map((item, index) => (
            <li
              className="px-4 hover:text-[#e50914] cursor-pointer whitespace-nowrap"
              key={index}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className=" grid  grid-cols-4 gap-8 ">
        {data.results && data.results.length > 0 ? (
          data.results.map((item, index) => (
            <div key={index}>
              {focus === "Person" ? (
                <div>
                  <img onLoad={()=>setImgErr(false)} onError={()=>setImgErr(true)} src={tmdbConfigClient.poster(item.profile_path)} />
                  <div className="text-2xl my-4">{item.name}</div>
                </div>
              ) : (
                <img src={tmdbConfigClient.backdrop(item.poster_path)} alt="" />
              )}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
