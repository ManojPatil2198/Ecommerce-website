import React from "react";
import Logo from "../../assets/logo.png";
import { IoSearch } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { HiShoppingBag } from "react-icons/hi2";

const Navbar = () => {
  return (
    <header className='bg-white fixed top-0 left-0 right-0'>
      <nav className="max-w-[1300px] px-12 mx-auto h-[14vh] flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex w-16 h-16 bg-zinc-100 rounded-full p-2">
          <img src={Logo} className="w-full h-full object-contain" />
        </a>

        {/* Nav Actions */}
        <div className="flex items-center gap-x-5">

          {/* Search Bar */}
          <div className="flex items-center p-1 rounded-full border-2 border-blue-600">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
              autoComplete="off"
              className="h-[5vh] pl-4 bg-transparent outline-none"
            />
            <button className="text-xl px-2">
              <IoSearch />
            </button>
          </div>

          {/* Icons */}
          <button className="text-[1.7rem] text-zinc-800 relative">
            <GoHeartFill />
            <span className="flex bg-red-600 justify-center items-center  text-white w-5 h-5 rounded-full text-[14px] absolute top-4 right-3 border-2 border-white">1</span>
          </button>

          <button className="text-[1.7rem] text-zinc-800 relative">
            <HiShoppingBag />
            <span className="flex bg-red-600 justify-center items-center  text-white w-5 h-5 rounded-full text-[14px] absolute top-4 right-4 border-2 border-white">1</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
