import Input from "../component/input";
import background from "../assets/img/backgoundSign.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClearState, LoginUser } from "../redux/userSlice";
import {  useEffect, useState } from "react";
import Alert from "../component/Notification/Alert";
import LoadingUI from "../component/Notification/LoadingUI";

function Login() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(()=>{
    dispatch(ClearState())
  },[])

  let {status, error} = useSelector(state=>state.user)
  let navigate=useNavigate()
  const handleSubmit =(e)=>{
    e.preventDefault()
    dispatch(LoginUser({username, password}))
  }
  if(status&&status==="succeeded"){navigate("/")} 
  

  return ( <>
  {status==="loading"&&<LoadingUI className=""/>}
  {status==="succeeded"&&<Alert title={"Logged in successfully"} success={true}/>}
  {error&&<Alert title={error}/>}
    <div className="absolute w-full h-full bg-black opacity-50"></div>
    <div className=""> <img src={background} /></div>
    <div className="w-2/6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%] text-white bg-[rgba(0,0,0,.75)]">
      <form className="flex w-7/12 mx-auto flex-col py-10 px-6] ">
        <h1 className="text-[32px] font-medium mb-7">Login</h1>
        <Input data={username} setData={setUsername} type="text" name="username" title="User Name" />
        <Input data={password} setData={setPassword} type="password" name="password" title="Password" />
        <button className="bg-[#e50914] py-2 my-5" onClick={(e)=>handleSubmit(e)}> Login </button>
        <div className="flex my-2 text-[#b3b3b3] justify-between">
          <div><input className="mr-1" type="checkbox" /><span>Remember me</span> </div>
          <span>Do you need help?</span>
        </div>
        <span className="text-base text-[#737373] my-2">
        You are new to Netflix? <Link to="/signup" className="text-white">Sign Up now</Link>
        </span>
        <span className="text-xs text-[#8c8c8c] my-2">
        This page is protected by Google reCAPTCHA to make sure you are not
          robot. <a className="text-[#0071eb]">Find out more.</a>
        </span>
      </form>
    </div>
    </> );
}

export default Login;