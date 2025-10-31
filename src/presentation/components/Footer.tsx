// import React from 'react';
import { DiReact } from 'react-icons/di';

const Footer = () => {
  return (
    <div className="flex justify-between w-full gap-2 px-5 py-5 mt-5 font-semibold xl:m-0 xl:text-sm">
      <span className="hidden text-sm xl:inline-flex">
        Admin Dashboard
      </span>
       <div className="flex gap-1 items-center">
        <span className="text-sm"> DevTech Managment</span>
        <img
            src="/logo.png"
            alt="Logo"
            className="ml-3 w-4 sm:w-6 xl:w-8 2xl:w-8"
          />

      </div>

      
    </div>
  );
};

export default Footer;
