// import React from 'react';
import { DiReact } from 'react-icons/di';

const Footer = () => {
  return (
    <div className="flex justify-between w-full gap-2 px-5 py-5 mt-5 font-semibold xl:m-0 xl:text-sm">
      <span className="hidden text-sm xl:inline-flex">
        PRESSING PRO
      </span>
      <div className="flex items-center gap-1">
        <span className="text-sm">© PRESSING PRO</span>
        <DiReact className="text-2xl xl:text-xl 2xl:text-2xl text-primary animate-spin-slow" />
      </div>
    </div>
  );
};

export default Footer;
