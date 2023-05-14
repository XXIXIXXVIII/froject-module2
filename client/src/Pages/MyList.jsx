import { useDispatch, useSelector } from "react-redux";
import { getLike, removeLike } from "../redux/likeSlice.jsx";
import { useEffect, useState } from "react";
import tmdbConfigClient from "../api/tmdbConfigClient.jsx";
import { Link } from "react-router-dom";
import "./index.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import ModelAlertCheck from "../component/ModelAlertCheck.jsx";
import instance from "../api/axios.client.jsx";

function MyList() {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [onModel, setOnModel] = useState(false);
  const [toggleSelectAll, setToggleSelectAll] = useState(false);
  const [checked, setChecked] = useState([]);
  const [listLikeMovie, setListLikeMovie] = useState([]);
  const [mediaId, setMediaId] = useState([]);
  const [dataList, setDataList] = useState([]);
  const username = useSelector((state) => state.user.username);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLike({ username }));
  }, [dispatch, username]);
  // const dataList = useSelector((state) => state.like.dataList);

  useEffect(()=>{
    let fetchDataListLike = async()=>{
      try {
      const data = await instance.post(`/like/get`, {username})
        setDataList(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDataListLike()
  },[username])
  
  useEffect(()=>{
    setListLikeMovie(dataList)
  },[dataList])

  const handleCheckall = (e) => {
    if (e.target.checked) {
      const indexData = dataList.map((item) => item.id);
      setChecked(indexData);
    } else {
      setChecked([]);
    }
  };

  const handleCheckItem = (item) => {
    if (checked.some((data) => data === item.id)) {
      setChecked(checked.filter((data) => data !== item.id));
    } else {
      setChecked([...checked, item.id]);
    }
  };
  const handleShowModel=()=>{
    setOnModel(!onModel)
  }
  const handleRemove = ()=>{
    let newListLikeMovie = listLikeMovie.filter(item=>!checked.includes(item.id))
    let listDelete = listLikeMovie.filter(item=>checked.includes(item.id))
    setListLikeMovie(newListLikeMovie)
    setChecked([])
    setOnModel(false)
    setMediaId(listDelete.map(item=>+item.movieId))
  }
  useEffect(()=>{
    dispatch(removeLike({username:username, mediaId:mediaId}))
  },[dispatch, mediaId, username])

  return (
    <div className="relative" >
      {onModel&&<ModelAlertCheck handleShowModel={handleShowModel} onModel={onModel} handleRemove={handleRemove} checked={checked} dataList={dataList}/>}
      <div style={{opacity:onModel?"0.3":"1", pointerEvents:onModel?"none":"auto" }} className="my-32 w-[90%] min-h-screen mx-auto">
        <div className="w-1/3 mx-auto flex justify-center ">
          <h1 className="font-semibold text-4xl">My list</h1>
        </div>
        <div className="flex justify-end py-5 border-b border-gray-600">
          {!toggleEdit ? (
            <button
              onClick={() => setToggleEdit(!toggleEdit)}
              className="bg-[rgb(0,204,54)] hover:bg-[rgb(19,91,38)] rounded text-base px-7 py-3"
            >
              Edit My List
            </button>
          ) : (
            <div>
              <button
                className=" border-2 border-[rgb(0,204,54)] hover:border-[rgb(19,91,38)] mr-6 rounded text-base px-7 py-[10px]"
                onClick={() => setToggleEdit(!toggleEdit)}
              >
                Cancel
              </button>
              <button
              onClick={()=>handleShowModel()}
                style={{
                  opacity: checked.length > 0 ? "1" : "0.3",
                  pointerEvents: checked.length > 0 ? "auto" : "none",
                }}
                className="bg-[rgb(0,204,54)] hover:bg-[rgb(19,91,38)] rounded text-base px-7 py-3"
              >
                Remove
              </button>
            </div>
          )}
        </div>
  
        {toggleEdit ? (
          <div className="flex relative justify-end z-40 w-full h-full">
            <label
              htmlFor="checkboxLabelFour"
              className="flex z-30 select-none absolute top-2 right-2 items-center"
            >
              <div>
                <input
                  onChange={(e) => handleCheckall(e)}
                  onClick={() => setToggleSelectAll(!toggleSelectAll)}
                  type="checkbox"
                  id="checkboxLabelFour"
                  className="sr-only"
                />
                <div className="box cursor-pointer mr-2 flex h-6 w-6 items-center justify-center border outline-none rounded-full relative">
                  {toggleSelectAll && checked.length === dataList.length && (
                    <BsFillCheckCircleFill className="text-[rgb(0,204,54)] absolute top-0 left-0  w-full h-full" />
                  )}
                  <span className="h-[10px] w-[10px] rounded-full bg-transparent"></span>
                </div>
              </div>
              Select All
            </label>
          </div>
        ) : (
          <></>
        )}
  
        <div
          style={{ marginTop: toggleEdit ? "60px" : "30px" }}
          className="myList  grid grid-cols-6 my-10 gap-5"
        >
          {listLikeMovie?.map((item, index) => (
            <div
              id={index}
              key={index}
              className="rounded-md relative overflow-hidden"
            >
              {toggleEdit && (
                <label
                  htmlFor={index}
                  className="flex z-30 select-none absolute top-2 right-2 items-center"
                >
                  <div onClick={() => handleCheckItem(item)}>
                    <input type="checkbox" id={index} className="sr-only" />
                    <div className="box cursor-pointer mr-2 flex h-6 w-6 items-center justify-center border outline-none rounded-full relative">
                      {checked.includes(item.id) && (
                        <BsFillCheckCircleFill className="text-[rgb(0,204,54)] absolute top-0 left-0  w-full h-full" />
                      )}
                      <span className="h-[10px] w-[10px] rounded-full bg-transparent"></span>
                    </div>
                  </div>
                </label>
              )}
              <Link
                style={{ pointerEvents: toggleEdit ? "none" : "auto" }}
                to={tmdbConfigClient.urlClient(
                  `${item.mediaType}/detail/${item.movieId}`
                )}
              >
                <img
                  style={{ opacity: toggleEdit ? "0.4" : "1" }}
                  src={tmdbConfigClient.poster(item.mediaImg)}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyList;
