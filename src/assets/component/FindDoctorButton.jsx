// src/assets/component/FindDoctorButton.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaStethoscope } from 'react-icons/fa';

const FindDoctorButton = () => {
  return (
    // Link component for navigation
    <Link
      to="/find-doctor" // Aapke doctor page ka route
      className="fixed top-28 right-8 z-50 group" // Thoda neeche kar diya hai header se bachne ke liye
    >
      <div className="relative">
        {/* Ring wala animation jo failta rahega */}
        <div className="absolute -inset-2 bg-red-500 rounded-full opacity-75 animate-ping group-hover:animate-none"></div>

        {/* Asli button jo upar rahega */}
        <button
          className="relative flex flex-col items-center justify-center w-32 h-32 
                     bg-red-600 text-white rounded-full shadow-2xl 
                     transition-transform duration-300 transform group-hover:scale-110"
        >
          <FaStethoscope className="h-10 w-10 mb-1" />
          <span className="text-sm font-bold text-center leading-tight">
            Find Your <br /> Doctor
          </span>
        </button>
      </div>
    </Link>
  );
};

export default FindDoctorButton;