import { useEffect, useRef, useState } from "react";
import Confirm from "./Confirm";
import instance from "../api/axios.client";
import { useDispatch, useSelector } from "react-redux";
import {CancelMemberSlice, ClearState} from "../redux/userSlice"
import Alert from "./Notification/Alert";
import LoadingUI from "./Notification/LoadingUI";
import { useNavigate } from "react-router";

function CancelMember({handleCanelmember, username}) {
const navigate = useNavigate()
const dispatch = useDispatch()
const passRef = useRef()
const [showConfirm, setShowConfirm] = useState(false)


const {status, error} = useSelector(state=>state.user)

useEffect(()=>{
  dispatch(ClearState())
},[])

const handleCancel = ()=>{
  handleCanelmember()
}

const handleshowConfirm = ()=>{
  setShowConfirm(!showConfirm)
}

const handleSubmitPass = async()=>{
  let pass=passRef.current.value
  dispatch(CancelMemberSlice({pass, username}))

  
}

useEffect(()=>{
  status==="succeededCancel"&&navigate("/login")
},[status])



  return (
    <>
    {error&&<Alert title={error} success={"false"}/>}
    {status==="loading"&&<LoadingUI/>}
    {showConfirm&&<Confirm handleshowConfirm={handleshowConfirm} handleSubmitPass={handleSubmitPass}/>}
    {showConfirm&&<div className="w-full h-full fixed z-20 opacity-80"></div>}
    <div className="fixed flex z-[11] flex-col pt-12 items-center gap-5 w-1/3 h-1/2 bg-gray-700 top-1/2 left-1/2 -translate-x-1/2 rounded-md -translate-y-1/2">
      <h3 className="text-white text-3xl mb-5 font-bold">Cancel Member</h3>
      <div className="flex flex-col  gap-4">
            <label
              htmlFor="pass"
              className=" text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
            >
              Nhập mật khẩu
            </label>
            <input
            ref={passRef}
              type="password"
              id="pass"
              autoComplete="off"
              className=" text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2   border-gray-700 bg-gray-800  font-normal w-64 h-10 flex items-center pl-3 text-sm  rounded border shadow"
            />
          </div>
          <div className="flex text-white gap-6 mt-5">
            <button
            onClick={handleCancel}
              className=" border-2 border-[rgb(0,204,54)] hover:border-[rgb(19,91,38)] mr-6 rounded text-base px-7 py-[10px]"
            >
              Cancel
            </button>
            <button
            onClick={handleshowConfirm}
              className="bg-red-500 hover:bg-red-700 rounded text-base px-7 py-3"
            >
              Cancel Member
            </button>
          </div>
    </div>
    </> 
   );
}

export default CancelMember;