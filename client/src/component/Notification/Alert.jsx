import { useEffect, useState } from "react";

function Alert(props) {
    const [isShow,setIsShow] = useState(true)
    useEffect(()=>{
        const timeShow=setTimeout(()=>{
            setIsShow(false)
        },2000)
    return ()=>{
        clearTimeout(timeShow)
    }
    },[isShow])
  return (
    <>{isShow===true&&
        <div
        style={props.success===true?{background:"#DFF2BF", color:"#270"}:{background:"#FFBABA", color:"#D8000C"}}
      className="mb-3 z-50 inline-flex w-1/4 top-1/3 -translate-y-1/2 items-center rounded-lg px-6 py-5 text-base absolute left-1/2 -translate-x-1/2"
      role="alert">
      <span className="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd" />
        </svg>
      </span>
      {props.title}
    </div>}
    </>
  );
}

export default Alert;
