import React, { useState } from "react";
import logo from "@/assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import {
  RouteBlogAdd,
  RouteIndex,
  RouteProfile,
  RouteSignIn,
} from "@/helpers/RouteName";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usericon from "@/assets/images/user.png";
import { FaPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/showToast";

import { IoMenu } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { useSidebar } from "./ui/sidebar";
const Topbar = () => {
  const {toggleSidebar} = useSidebar()
  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispatch(removeUser(data.user));
      navigate(RouteIndex);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b ">
      <div className="flex items-center gap-5">
        <button type="button" onClick={toggleSidebar}
          className="md:hidden block">

        <IoMenu size={25}/>
        </button>
        <Link to={RouteIndex} className="cursor-pointer">
        <img src={logo} alt="Logo here" className="md:h-10 w-44" />
        
        </Link>
      </div>
      <div className="w-[500px]">
        <div
          className={`md:relative  md:block absolute bg-white
    left-0 w-full md:top-0 top-16 md:p-0 p-5 ${
      showSearch ? "block" : "hidden"
    }`}
        >
          <SearchBox />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={toggleSearch}
          type="button"
          className="md:hidden block"
        >
          <IoSearchSharp size={25} />
        </button>

        {!user.isLoggedIn ? (
          <Button className="rounded-full" asChild>
            <Link to={RouteSignIn}>
              <MdLogin />
              Sign In
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <Avatar>
                <AvatarImage src={user?.user?.avatar || usericon} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p className="">{user?.user?.name}</p>
                <p className="text-sm">{user?.user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouteProfile}>
                  <FaRegUser />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={RouteBlogAdd}>
                  <FaPlus />
                  Create Blog
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                <BiLogOut color="red" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Topbar;
