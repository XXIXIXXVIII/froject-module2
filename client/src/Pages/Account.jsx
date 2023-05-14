import { MdOutlineSwitchAccount } from "react-icons/md";
import "./index.css";
import {storage} from "../firebase"
import {ref,getDownloadURL, uploadBytes } from "firebase/storage"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../api/axios.client";
import moment from "moment";
import ChangePass from "../component/ChangePass";
import CancelMember from "../component/CancelMember";
import Alert from "../component/Notification/Alert";
import { AddAvarta, ClearState } from "../redux/userSlice";
import LoadingUI from "../component/Notification/LoadingUI";

function Account() {
  let [avarta1, setAvarta1] = useState();
  let [urlImg, setUrlImg] = useState(null);
  let [flag, setFlag] = useState(false);

  let [showMember, setShowMember] = useState(false);
  let [showChangePass, setShowChangePass] = useState(false);
  let [userData, setUserData] = useState();
  let [timeCreateAt, setTimeCreateAt] = useState();
  const dispatch = useDispatch()
  const {username,status}  = useSelector((state) => state.user);

  useEffect(()=>{
    dispatch(ClearState())
  },[])
  useEffect(()=>{
    if(flag===false){setFlag(true)}else{
    dispatch(AddAvarta({urlImg,username}))
  }
  },[urlImg])

  useEffect(() => {
    return () => URL.revokeObjectURL(avarta1?.prevew);
  }, [avarta1]);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await instance.post("/user/getuser", { username });
      try {
        const dbTime = data.data.user.createdAt;
        const utcMoment = moment.utc(dbTime);
        const localMoment = utcMoment.local();
        setTimeCreateAt(localMoment.format("DD/MM/YYYY HH:mm:ss"));
        setUserData(data.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [username]);

  const handleImg = async(e) => {
    const file = e.target.files[0];

    file.prevew = URL.createObjectURL(file);
    setAvarta1(file);
  };
  const handleChangePass = () => {
    setShowChangePass(!showChangePass);
  };

  const handleCanelmember = () => {
    setShowMember(!showMember);
  };

  const handleUpload =()=>{
    if (avarta1 == null) return;
    const imageRef = ref(storage, `images/${avarta1.name}`);
    uploadBytes(imageRef, avarta1).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setUrlImg(url);
      });
    });
  };


  return (
    <>
      {status==="loading"&&<LoadingUI/>}
       {status ==="succeededChangePass"&& (
          <Alert title={"Change password successfully"} success={true} />
        )}
       {status ==="successAddavarta"&& (
          <Alert title={"Change Avarta successfully"} success={true} />
        )}
      <div className="w-full mt-14 bg-gray-100 min-h-[130vh] text-[#333]">
        {showMember && (
          <CancelMember
            handleCanelmember={handleCanelmember}
            username={username}
          />
        )}
        {showChangePass && (
          <ChangePass setShowChangePass={setShowChangePass} username={username} />
        )}
        {showChangePass ||
          showMember && (
            <div className="bg-black z-10 fixed w-full h-full opacity-50"></div>
          )}
        <div className=" w-[67%] mx-auto ">
          <div className="flex items-center gap-5 pt-14">
            <h2 className="text-4xl font-normal">Account</h2>
            <MdOutlineSwitchAccount className="text-red-600 text-2xl" />
            <span className="text-[#555] font-bold text-xs">
              Member Since {timeCreateAt}
            </span>
          </div>
          <div className="border-t-[1px] border-[#999] mt-5">
            <div className="mt-4 flex">
              <div className="w-[25%]">
                <span className="uppercase text-[#737373] text-lg">
                  Membership & Billing
                </span>
                <button
                  onClick={handleCanelmember}
                  className="bg-[#e6e6e6] px-8 py-2 mt-3 text-sm text-black cancelMember"
                >
                  Cancel Membership
                </button>
              </div>
              <div className="flex-1">
                <div className="flex justify-between border-b-[1px] pb-5">
                  <div className="flex flex-col gap-2">
                    <span className="text-black font-medium text-lg">
                      {userData?.gmail}
                    </span>
                    <span className="text-[#737373] font-normal text-lg">
                      Password: ********
                    </span>
                    <span className="text-[#737373] font-normal text-lg">
                      Phone: {userData?.phone || "Not yet set up"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-[9px]">
                    <div className="text-[#0073e6] font-normal cursor-pointer hover:underline text-base">
                      Change account email
                    </div>
                    <div
                      onClick={handleChangePass}
                      className="text-[#0073e6] cursor-pointer font-normal hover:underline text-base"
                    >
                      Change password
                    </div>
                    <div className="text-[#0073e6] font-normal hover:underline cursor-pointer text-base">
                      Change phone number
                    </div>
                    <div className="text-[#0073e6] font-normal hover:underline cursor-pointer text-base">
                      Verify phone number
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-col items-center justify-center gap-8">
                  <span className="text-[#464545] font-normal text-2xl">
                    Change the avatar image
                  </span>
                  <input
                    accept="image/*"
                    type="file"
                    onChange={(e) => handleImg(e)}
                    name="avarta"
                  />
                  <div className="w-60 h-60 rounded-full overflow-hidden mt-6">
                    <img
                      className="w-full h-full object-cover"
                      src={avarta1?.prevew}
                    />
                  </div>
                  <button className="py-2 rounded-lg px-6 mt-5 bg-[rgb(0,204,54)] hover:bg-[rgba(0,204,54,0.76)]" onClick={handleUpload}>Change</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
