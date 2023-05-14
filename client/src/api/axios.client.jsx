import axios from "axios";
import queryString from "query-string";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  paramsSerializer: {
    encode: params => queryString.stringify(params)
  },
  timeout: 5000, // Thời gian timeout
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*", 
  },
});


export default instance

