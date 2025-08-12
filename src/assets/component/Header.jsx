import React from "react";
import { FaMapMarkerAlt, FaSearch, FaMicrophone } from "react-icons/fa";
import Logo from "../component/Logo.png";

export default function JDHeader() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm py-2 px-4 flex items-center justify-between z-50">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <img
          src={Logo} 
          alt="Justdial Logo"
          className="h-16"
        />
        {/* Location Input */}
        <div className="flex items-center border rounded-lg px-2 bg-white">
          <FaMapMarkerAlt className="text-gray-500 mr-1" />
          <input
            type="text"
            defaultValue="Mumbai"
            className="px-1 py-1 outline-none text-sm"
          />
        </div>

        {/* Search Input */}
        <div className="flex items-center border rounded-lg overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Doctors"
            className="px-2 py-1 outline-none text-sm w-48"
          />
          <button className="px-2">
            <FaMicrophone className="text-blue-500" />
          </button>
          <button className="bg-orange-500 px-3 py-2 text-white">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Right Menu */}
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-1 cursor-pointer">
          <span>EN</span>
        </div>
        <a href="#" className="hover:underline">
          Advertise
        </a>
        <a href="#" className="flex items-center hover:underline">
          <span className="bg-red-600 text-white text-[10px] px-1 py-0.5 rounded mr-1">
            BUSINESS
          </span>
          Free Listing
        </a>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Login / Sign Up
        </button>
      </div>
    </header>
  );
}
