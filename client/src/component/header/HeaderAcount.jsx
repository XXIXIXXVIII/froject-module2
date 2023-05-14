import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/Netflix_logo.svg.png";
import { CgProfile } from "react-icons/cg";
import { RiArrowDownSFill } from "react-icons/ri";
import { FiHelpCircle } from "react-icons/fi";
import { BsPencil } from "react-icons/bs";
import imgUserDefault from "../../assets/img/pig.jpeg";
import {AiOutlineSetting} from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";


function HeaderAcount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {username,avarta} = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logout({}));
    navigate("/login");
  };

  return ( 
    <div className="fixed top-0 w-screen bg-black">
      <div className="flex justify-between items-center w-[90vw] mx-auto">
        <Link className="h-16 flex items-center z-10" to="/">
          <img className="h-1/2  " src={logo} />
        </Link>
       
        <div className="">
              <div className="user peer px-5 flex gap-2 items-center mr-6 hover: text-white relative ">
                <div className="imgAvarta w-10 h-10 rounded-full overflow-hidden">
                    <img
                      className="object-cover w-full h-full"
                      src={avarta||imgUserDefault}
                      alt={imgUserDefault}
                    />
                </div>
                {username}
                <RiArrowDownSFill className="arrow inline right-[-4px] top-[35%] text-xl absolute duration-300" />
              </div>

              <div className="hidden text-white peer-hover:flex text-[13px] hover:flex w-[200px] flex-col bg-black border-[1px] border-[hsla(0,0%,100%,.15)]  absolute top-[50px] right-[4%]">
                <a className="px-5 py-3 pr-10 hover:underline" href="#">
                  <BsPencil className="inline mr-1 text-base" /> Manage Profiles
                </a>
                <Link to="/account" className="px-5 py-3 hover:underline" >
                  <CgProfile className="inline mr-1 text-base" /> Account
                </Link>
                <a className="px-5 py-3 hover:underline" href="#">
                  <AiOutlineSetting className="inline mr-1 text-base" /> Settings
                </a>
                <a className="px-5 py-3 hover:underline" href="#">
                  <FiHelpCircle className="inline mr-1 text-base" /> Help
                </a>
                <a
                  onClick={handleLogout}
                  className="px-5 py-3 mt-3 border-t-[1px] border-gray-500 hover:underline"
                  href="#"
                >
                  Sign out of Netflix
                </a>
              </div>
            </div>
        
      </div>
    </div>
   );
}

export default HeaderAcount;