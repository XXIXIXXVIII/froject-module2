import { useEffect, useState } from "react";

function useDebounce(value, timeout) {
  const [debounce, setDebounce] = useState(value)
  useEffect(()=>{
    let time = setTimeout(()=>{
      setDebounce(value)
    },timeout)
    return ()=>clearTimeout(time)
  },[timeout, value])

  return debounce;
}

export default useDebounce;