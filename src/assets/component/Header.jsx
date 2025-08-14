import React from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import Logo1 from "../component/Logo1.png";
import Logo2 from "../component/Logo2.png";

export default function JDHeader() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white text-gray-800 py-4 flex items-center justify-center z-50">
      <div className="w-11/12 max-w-7xl flex items-center justify-between">
        {/* Logo Section - Left Side, but aligned centrally */}
        <div className="flex items-center justify-center space-x-2 cursor-pointer">
          <img src={Logo2} alt="Justdial Logo" className="h-10 " />
          <img src={Logo1} alt="Justdial Logo" className="h-10 mt-1" />
        </div>

        {/* Navigation and Icons Section - Right Side, but aligned centrally */}
        
        <nav className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-orange-500 transition-colors duration-200 p-2 rounded-full hover:bg-orange-100 cursor-pointer">
              <FaSearch className="text-xl" />
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-blue-100 cursor-pointer">
              <FaMapMarkerAlt className="text-xl" />
            </button>
          </div>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 relative group hidden md:inline cursor-pointer"
          >
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
          <span
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 relative group hidden md:inline cursor-pointer"
          >
            EN
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </span>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 relative group hidden md:inline cursor-pointer"
          >
            Login / Sign Up
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
          
          
        </nav>
      </div>
    </header>
  );
}