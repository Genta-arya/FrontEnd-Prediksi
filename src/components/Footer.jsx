import React from "react";

const Footer = () => {
  return (
    <footer className=" dark:bg-black bg-[#092306] transition-colors duration-500  mt-4">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <p className=" md:text-sm text-xs lg:text-sm text-center text-white">
          &copy; {new Date().getFullYear()} Sistem Pengukuran Luas Daun Selada
          Otomatis. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
