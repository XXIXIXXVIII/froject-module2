import { Link, NavLink, useNavigate } from "react-router-dom";
import Netflix_logo from "../../assets/img/Netflix_logo.svg.png";
import { BsBell, BsPencil } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiArrowDownSFill } from "react-icons/ri";
import { FiHelpCircle } from "react-icons/fi";
import "./header.css";
import imgUserDefault from "../../assets/img/pig.jpeg";
import {AiOutlineSetting} from "react-icons/ai"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import Search from "../Search";
import instance from "../../api/axios.client";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isTop, setIsTop] = useState(true);
  // const [dataUser, setDataUser] = useState([])

  const handleScoll = () => {
    const scrollTop = document.documentElement.scrollTop;
    scrollTop !== 0 ? setIsTop(false) : setIsTop(true);
  };
  const {username,avarta} = useSelector((state) => state.user);

  useEffect(() => {
    window.addEventListener("scroll", handleScoll);
    return () => {
      window.addEventListener("scroll", handleScoll);
    };
  }, []);


  const handleLogout = () => {
    dispatch(logout({}));
    navigate("/login");
  };

  return (
    <div
      style={{ backgroundColor: isTop ? "transparent" : "rgb(14,14,14)" }}
      className="flex fixed z-50  w-[100%] { scrollTop ? 'text-white' : 'text-gray-500' } mx-auto  justify-between py-3"
    >
      <div className="flex items-center ml-[3%]">
        <div className="w-[93px] mr-10">
          <Link to="/">
            <img className="w-full" src={Netflix_logo}></img>
          </Link>
        </div>
        <div>
          <ul className="flex gap-5 items-center text-sm ">
            <li className="hover:text-[#e5e5e5cf] hover:duration-300">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="hover:text-[#e5e5e5cf] hover:duration-300">
              <NavLink to="/tv">TV Shows</NavLink>
            </li>
            <li className="hover:text-[#e5e5e5cf] hover:duration-300">
              <NavLink to="/movie">Movies</NavLink>
            </li>
            <li className="hover:text-[#e5e5e5cf] hover:duration-300">
              <NavLink to="/">New & Popular</NavLink>
            </li>
            <li className="hover:text-[#e5e5e5cf] hover:duration-300">
              <NavLink to="/mylist">My List</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex mr-[3%]">
        <Search />

        <ul className="flex gap-5 items-center">
          <li>Kids</li>
          <li>
            <BsBell />
          </li>
          <li>
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

              <div className="hidden peer-hover:flex text-[13px] hover:flex w-[200px] flex-col bg-[rgba(0,0,0,.9)] border-[1px] border-[hsla(0,0%,100%,.15)] drop-shadow-lg absolute top-[50px] right-[4%]">
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
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
