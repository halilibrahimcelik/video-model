import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../app/auth/authSlicer";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUrl = window.location.pathname;
  const isVideoModel = currentUrl === "/video-model";
  const isVideoList = currentUrl === "/video-list";
  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/");
  };
  return (
    <nav className=" px-5   mx-auto h-[60px] fixed w-full top-0  bg-gradient-secondary  flex text-white font-bold justify-between items-center">
      <ul className="flex  gap-3">
        <li>
          {" "}
          <Link
            to="/video-model"
            className={`relative after:absolute after:left-[0px] after:transition-all   ${
              isVideoModel
                ? "after:bottom-[-4px] after:scale-100   drop-shadow-[5px_4px_6px_rgba(0,0,0,0.9)]"
                : "after:bottom-[-18px] after:scale-0  drop-shadow-[5px_4px_6px_rgba(0,0,0,0)]"
            } after:w-full after:bg-white after:h-[2px] after:content-'' hover:after:scale-75 hover:after:bottom-[-4px] ease-in duration-300  transition-all`}
          >
            Video Yükleme{" "}
          </Link>
        </li>
        <li>
          {" "}
          <Link
            to="/video-list"
            className={`relative after:absolute after:left-[0px] after:transition-all   ${
              isVideoList
                ? "after:bottom-[-4px] after:scale-100   drop-shadow-[5px_4px_6px_rgba(0,0,0,0.9)]"
                : "after:bottom-[-18px] after:scale-0  drop-shadow-[5px_4px_6px_rgba(0,0,0,0)]"
            } after:w-full after:bg-white after:h-[2px] after:content-'' hover:after:scale-75 hover:after:bottom-[-4px] ease-in duration-300 `}
          >
            Video Listem{" "}
          </Link>
        </li>
      </ul>

      <button
        onClick={handleSignOut}
        className="relative after:absolute after:left-[-12px] after:top-[-18px] after:w-[5px] after:bg-white after:h-[60px] after:content-''"
      >
        Çıkış
      </button>
    </nav>
  );
};

export default Navbar;
