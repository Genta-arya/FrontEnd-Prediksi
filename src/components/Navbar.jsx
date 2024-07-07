import React, { useState } from "react";
import logo from "../assets/image/logo.jpg";

const Navbar = () => {
  return (
    <nav
      className={` bg-[#092306] dark:bg-black border-b lg:px-32 p-4 text-white transition-colors duration-500 z-10`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center  gap-4 lg:gap-6">
          <img src={logo} className="lg:w-14 w-8 md:w-10 bg-white p-1 rounded-md "/>

          <h1 className="lg:text-xl md:text-lg text-sm font-bold  max-w-52 lg:max-w-xs md:max-w-xs">
            Sistem Pengukuran Luas Daun Selada Otomatis
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
