import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Left Section: Logo and Brand */}
      <div className="flex items-center">
        <div className="bg-blue-400 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="text-xl font-semibold text-green-500">SANCTUA</span>
      </div>

      {/* Center Section: Navigation */}
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-700 hover:text-blue-500">
          Home
        </Link>
        <Link to="/Gym" className="text-gray-700 hover:text-blue-500">
          Fitness
        </Link>
        <Link to="/type-input" className="text-gray-700 hover:text-blue-500">
          Symptoms
        </Link>
        <Link to="/chatbot" className="text-gray-700 hover:text-blue-500">
          Healthcare
        </Link>
      </nav>

      {/* Right Section: Icons and Buttons */}
      <div className="flex items-center space-x-4">
        {/* Search Icon */}
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-6a7 7 0 10-14 0 7 7 0 0014 0z"
            />
          </svg>
        </button>
        {/* Pin Icon */}
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
        {/* Language Dropdown (Simplified) */}
        <div className="relative">
          <button className="border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none">
            EN
          </button>
          {/* Add dropdown functionality here if needed */}
        </div>
        {/* Login / Sign Up Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none">
          Login / Sign Up
        </button>
      </div>

      {/* Mobile Menu Button (Hidden on larger screens) */}
      <div className="md:hidden">
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
