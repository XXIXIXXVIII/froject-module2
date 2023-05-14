import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

const PrivateRouter1 = ()=>{
  let username = useSelector(state => state.user.username)

  return (
    username?<Outlet/>:<Navigate to="/login"/>
 )
}

export default PrivateRouter1