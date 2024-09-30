import React from "react";
import biomatelogo from "../assets/biomatelogo.jpg";
const Footer = () => {
  return (
    <div className="pt-10 p-5 sm:p-0 bg-slate-900   border-t border-slate-500 ">
      <div className="py-5 flex flex-col sm:flex-row justify-evenly">
        <div>
          <img alt="footerlogo" src={biomatelogo} className="max-w-[128px]" />
        </div>

        <div>
          <h6 className="text-gray-300 text-xl">Social</h6>
        </div>

        <div>
          <h6 className="text-gray-300 text-xl">Contact Us</h6>
          <ul className="pt-5">
            <li className="text-gray-400 py-2">
              Mobile:{" "}
              <span className="text-green-500">
                +880 13007 40933 ( 8 A.M - 10 P.M )
              </span>
            </li>
            <li className="text-gray-400 py-2">
              Whatsapp:{" "}
              <span className="text-green-500">+880 13007 40933 (24*7) </span>
            </li>
            <li className="text-gray-400 py-2">
              Gmail: <span className="text-green-500">biomate@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className=" py-3 flex flex-col sm:flex-row justify-between mx-10 px-10">
        <p className="text-sm text-gray-500 text-center">
          @ all rights reserved by BioMate ...
        </p>
        <p className="text-gray-500 pt-5 sm:pt-0">
          Developed by <span className="text-gray-400">Shiku</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
