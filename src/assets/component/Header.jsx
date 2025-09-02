import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom";
import Logo1 from "./Logo1.png"; // Assuming you have a logo image
import Logo2 from "./Logo2.png"; // Assuming you have a second logo image
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient"; // import supabase client

const Header = ({user}) => {
  const navigate = useNavigate();
  
  const loginPage = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsMobileMenuOpen(false); // Close mobile menu after logout
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Left Section: Logo and Brand */}
      <div className="flex items-center gap-4">
        <img src={Logo2} alt="" className="w-10"/>
        <img src={Logo1} alt="" className="w-20"/>
      </div>

      {/* Center Section: Navigation (Hidden on mobile) */}
      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-700 hover:text-blue-500">
          Home
        </Link>
        <Link to="/WellnessJourneyPage" className="text-gray-700 hover:text-blue-500">
          Fitness
        </Link>
        <Link to="/type-input" className="text-gray-700 hover:text-blue-500">
          Symptoms
        </Link>
        <Link to="/WellnessJourneyPage" className="text-gray-700 hover:text-blue-500">
          Healthcare
        </Link>
      </nav>

      {/* Right Section: Icons and Buttons */}
      <div className="flex items-center space-x-4">
        {/* Search Icon (Hidden on mobile) */}
        <button className="hidden md:block text-gray-500 hover:text-gray-700 focus:outline-none px-3">
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

        {/* Pin Icon (Hidden on mobile) */}
        <button className="hidden md:block text-gray-500 hover:text-gray-700 focus:outline-none px-3">
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

        {/* Language Dropdown (Hidden on mobile) */}
        <div className="relative hidden md:block">
          <button className="px-3 border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 focus:outline-none">
            EN
          </button>
        </div>

        {/* Desktop Login/User Section */}
        {user ? (
          <div className="hidden md:flex items-center space-x-3">
            <span className="font-medium text-gray-700 text-sm">
              {user.user_metadata?.full_name || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={loginPage}
            className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            Get Started
          </button>
        )}

        {/* Mobile User Display - Shows username  */}
        {user && (
  <div className="md:hidden flex items-center space-x-2 max-w-[150px] overflow-hidden">
    <span className="font-medium text-gray-700 text-sm truncate">
      Welcome {user.user_metadata?.full_name || user.email.split('@')[0]}!
    </span>
  </div>
        )}

        {/* Mobile Menu Button (Visible on smaller screens) */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-500 hover:text-gray-700 focus:outline-none">
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
      </div>

      {/* Mobile Menu Dropdown (Conditionally rendered) */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg md:hidden z-40">
          <nav className="flex flex-col space-y-4 p-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-500 py-2 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/Gym" 
              className="text-gray-700 hover:text-blue-500 py-2 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Fitness
            </Link>
            <Link 
              to="/type-input" 
              className="text-gray-700 hover:text-blue-500 py-2 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Symptoms
            </Link>
            <Link 
              to="/chatbot" 
              className="text-gray-700 hover:text-blue-500 py-2 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Healthcare
            </Link>
            
            {/* Mobile Login Section - Only show if not logged in */}
            {!user && (
              <div className="pt-4 border-t border-gray-200">
                <button 
                  onClick={() => {
                    loginPage();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 w-full"
                >
                 Get Started
                </button>
              </div>
            )}
                    {user && (
          <div className="md:hidden justify-center items-center flex items-center space-x-2">

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-2 py-1 rounded-full justify-center items-center flex hover:bg-red-600 text-xs"
            >
              Logout
            </button>
          </div>
        )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;