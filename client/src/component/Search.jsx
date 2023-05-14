import { BsSearch } from "react-icons/bs";
import {  useEffect, useRef, useState } from "react";
import {   useNavigate,  } from "react-router";
import tmdbConfigClient from "../api/tmdbConfigClient";
import { useDispatch, useSelector } from "react-redux";
import { searchData } from "../redux/searchSlice";


function Search() {
  const [search, setSearch] = useState("")
  const [goback, setGoBack] = useState(true)
  const [mediaType, setMediaType] = useState(tmdbConfigClient.mediaType.movie)
  const inputSearch =useRef()
  const dispatch = useDispatch()
  const handleSearch=()=>{
    inputSearch.current.focus()
  }
  const mediaTypeSlice = useSelector(state=>state.search.mediaType)
  const navigate=useNavigate()

  // const debounce = useDebounce(search,500)
  useEffect(()=>{
    setMediaType(mediaTypeSlice)

  }, [mediaTypeSlice])


  useEffect(()=>{
    if(search.trim()&&goback){
      navigate(`/search/${mediaType}`)   
      setGoBack(false)
    }else if(!search.trim()&&!goback){
      navigate("/") 
      setGoBack(true)
    }else{
      setGoBack(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[search])


useEffect(()=>{
  dispatch(searchData({search, mediaType}))
},[mediaType, search])

 
  return ( 
    <form className="relative mr-12">
          <input
            type="text"
            name="search"
            placeholder="Search"
            ref={inputSearch}
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className=" focus:h-5/6 mt-1 text-white w-0 
            focus:outline-0 focus:py-1 focus:w-[250px] focus:duration-500 focus:pl-9 bg-[rgb(20,20,20)] focus:border-[1px]  focus:border-white"
          ></input>
          <div className="absolute top-1/2 translate-y-[-50%] text-white left-2 cursor-pointer" onClick={handleSearch}>
            <BsSearch />
          </div>
        </form>
   );
}

export default Search;