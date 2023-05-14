import { useEffect, useState } from "react";
import background from "../assets/img/backgoundSign.jpg";
import Input from "../component/input";
import {useDispatch, useSelector,  } from "react-redux" 
import { AxiosAddUser, ClearState } from "../redux/UserSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {IoMdArrowRoundBack} from "react-icons/io"
import Alert from "../component/Notification/Alert";

function Signup() {
  const [username, setUsername] = useState("")
  const [gmail, setGmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isDisabled, seIisDisabled] = useState(true)

  const [isValid_gmail,setIsValid_gmail ]= useState(false)
  const [isValid_username,setIsValid_username ]= useState(false)
  const [isValid_password,setIsValid_password ]= useState(false)
  const [isValid_confirmPassword,setIsValid_confirmPassword ]= useState(false)
  const {error, status} = useSelector(state=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(ClearState())
  },[])

  useEffect(()=>{
    status==="succeeded"&&navigate("/")
  },[navigate, status])
  
  useEffect(()=>{
    const REGEX_gmail = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/;
    setIsValid_gmail(REGEX_gmail.test(gmail))
  },[gmail])

  useEffect(()=>{
    const REGEX_username = /^[a-zA-Z0-9]{8,20}$/;
    setIsValid_username(REGEX_username.test(username))
  },[username])

  useEffect(()=>{
    const REGEX_password = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+-=])[A-Za-z\d!@#$%^&*()_+-=]{8,}$/;
    setIsValid_password(REGEX_password.test(password))
  },[password])

  useEffect(()=>{
    let matchPassword = password===confirmPassword
    setIsValid_confirmPassword(matchPassword)
  },[password, confirmPassword])

  useEffect(()=>{
    isValid_gmail&&isValid_username&&isValid_password&&isValid_confirmPassword?seIisDisabled(false):seIisDisabled(true)
  },[isValid_gmail, isValid_username, isValid_password, isValid_confirmPassword])

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(AxiosAddUser({username, gmail, password, confirmPassword}))
  }


  return (
    <>  
    {error&&<Alert title={error}/>}
      <div className=" lg:absolute w-full h-full bg-black  opacity-50"></div>
      <div className=" lg:w-full lg:h-full"><img src={background} /></div>
      <div className=" md:w-3/5 w-4/5 mt-7 md:mt-5 xl:w-1/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] text-white bg-[rgba(0,0,0,.75)]">
        <form  className="flex w-4/5 lg:w-3/5 xl:w-7/12 items-center mx-auto flex-col pt-1 pb-1 px-1 xl:pt-10 xl:pb-6 xl:px-6] ">
          <h1 className="md:text-[16px] lg:text-[25px] xl:text-[32px] font-medium  md:mb-3 lg:mb-6 xl:mb-7">Sign Up</h1>

          <Input type="gmail" name="gmail" title="Gmail" data={gmail} setData={setGmail} />
          {!isValid_gmail&&gmail.trim().split("").length>0?<span className="text-xs text-[#e87c03] mb-3">Please enter a gmail VD: abc@gmail.com </span>:<></>}

          <Input type="text" name="username" title="Username" data={username} setData={setUsername}/>
          {!isValid_username&&username.trim().split("").length>0?<span className="text-xs text-[#e87c03] mb-3">Please enter a display Username between 8 and 32 characters</span>:<></>}

          <Input type="password" name="password" title="Password" data={password} setData={setPassword} />
          {!isValid_password&&password.trim().split("").length>0?<span className="text-xs text-[#e87c03] mb-3">Password must contain at least one uppercase letter, lowercase letter, and number. </span>:<></>}

          <Input type="password" name="confirmPassword" title="Confirm Password" data={confirmPassword} setData={setConfirmPassword} />
          {!isValid_confirmPassword&&confirmPassword.trim().split("").length>0?<span className="text-xs text-[#e87c03] mb-3">Password does not match</span>:<></>}

          <button style={{opacity: isDisabled?"0.5":"1"}} disabled={isDisabled} onClick={(e)=>handleSubmit(e)} className="bg-[#e50914] w-2/3 rounded-sm xl:py-2 xl:my-3"> Sign Up </button>
          <div className="flex w-full my-2 text-[#b3b3b3] justify-between">
          <Link to="/login"><IoMdArrowRoundBack className="inline mr-1"/><span>Login</span></Link>
          <a href="https://www.netflix.com/vn/LoginHelp">Do you need help?</a>
          </div>
          <span className=" xl:text-xs xl:text-[#8c8c8c] xl:my-4 ">
          This page is protected by Google reCAPTCHA to make sure you are not
            robot. <Link to="/" className="text-[#0071eb]">Find out more.</Link>
          </span>
        </form>
      </div>
      </>
  );
}

export default Signup;
