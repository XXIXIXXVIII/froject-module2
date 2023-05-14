import { useEffect, useState } from "react"
import instance from "./axios.client.jsx"
import axios from "axios"

const useAxios = (dataUrl) =>{
  const [isLoading, setIsloading] = useState(false)
  const [err, setErr] = useState(null)
  const [data, setData]= useState([])

  useEffect(()=>{
      let isMounted = true
      const source = axios.CancelToken.source()

    const AxiosData = async(url)=>{
      setIsloading(true)
      
      try {
        const result = await instance.get(url)
        if(isMounted){
        setData(result.data.results||result.data)
        setErr(null)
      }
      } catch (error) {
        if(isMounted){
        setErr(error.message)
        setData([])}

      }finally {
        isMounted&&setTimeout(()=>setIsloading(false),2000)
      }
    }
    AxiosData(dataUrl)

    const clearUp=()=>{
      isMounted=false
      source.cancel()
    }

    return clearUp
  },[dataUrl])
  return {data, err, isLoading}
}

export default useAxios