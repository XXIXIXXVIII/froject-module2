import { HiDotsHorizontal } from "react-icons/hi";
import { BsChatDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import instance from "../api/axios.client";
import useAxios from "../api/useAxios";

function Cmt(prop) {
  let mediaId = prop.mediaId;
  const {data} = useAxios(`/cmt/getcmt/${mediaId}`)

  let {username, avarta} = useSelector((state) => state.user);
  let [numberCmt,setNumberCmt]= useState(0)

  let [content, setContent] = useState("");
  let [listCmt,setListCmt]=useState([])

  useEffect(()=>{
    setListCmt(data.reverse())
    setNumberCmt(data.length+1)
    setContent("")
  }, [data])



  const handleSubmit = () => {
    let time = new Date().toLocaleString();
    let postCmt = { username, content, mediaId, time,avarta };
    instance.post("cmt/post", postCmt);
    setListCmt(prev=>[postCmt,...prev])
    setNumberCmt(count=>count+1)
  };
  console.log(listCmt)

  return (
    <div className="w-[50vw] mx-auto my-14">
      <div className="my-5">
        <h1 className="text-3xl my-8 font-bold">Discussion ({numberCmt})</h1>
        <div className="border border-gray-600 rounded-lg bg-gray-800 py-2 px-4 ">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a comment..."
            rows={6}
            className="w-full focus:outline-none placeholder:text-gray-600 text-gray-200 px-0 bg-gray-800"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-700 mt-5 py-2 px-4 rounded-xl hover:bg-blue-800"
        >
          Post comment
        </button>
      </div>
      <div className="border-b-[1px] pb-10 border-gray-700">
        {listCmt && listCmt.length > 0 ? (
          listCmt.map((item, index) => {
            return (
              <div key={index} className="mt-16 w-[94%] mx-auto text-gray-400">
                <div className="flex justify-between">
                  <div className="flex gap-5">
                    <div className="w-10 rounded-full h-full overflow-hidden"><img className="object-cover w-full h-full" src={item.avarta}/></div>
                    <span className="text-gray-50">{item.username}</span>
                    <span>{item.time}</span>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-gray-700 text-xl">
                    <HiDotsHorizontal />
                  </button>
                </div>
                <div className="mt-3 ml-2">
                  <span>{item.content}</span>
                </div>
                <div className="my-2 inline-block items-center cursor-pointer hover:underline">
                  <BsChatDots className="mr-2 inline" />
                  <span>Reply</span>
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}


        <div className="mt-16 w-[94%] mx-auto text-gray-400 ">
          <div className="flex justify-between">
            <div className="flex gap-5">
            <div className="w-10 rounded-full h-full overflow-hidden"><img className="object-cover w-full h-full" src={avarta}/></div>
              <span className="text-gray-50">Michael Gough</span>
              <span>Feb. 8, 2022</span>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-700 text-xl">
              <HiDotsHorizontal />
            </button>
          </div>
          <div className="mt-3 ml-2">
            <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cmt;
