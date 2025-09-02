import React from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

const LandingVdo = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/landingpage.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        {/* Top Tagline */}
        <div className="inline-flex items-center bg-blue-50 text-blue-500 rounded-full px-3 py-1.5 mb-6">
          <HeartIcon className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">
            Your Complete Healthcare Companion
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
          Your Health, <span className="text-purple-400">Our Priority</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-10">
          Comprehensive healthcare solutions at your fingertips. From symptom
          checking to specialized care, we're here to support your wellness
          journey every step of the way.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mb-8">
          <Link
            to="/choicePage"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-colors duration-300 flex items-center"
          >
            <HeartIcon className="h-5 w-5 mr-2" />
            Check Your Symptoms
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
          <Link
            to="/"
            className="bg-white hover:bg-gray-100 text-blue-500 font-semibold py-3 px-6 rounded-full shadow-md transition-colors duration-300"
          >
            Community Support
          </Link>
        </div>

        {/* Bottom Indicators */}
        <div className="flex items-center justify-center space-x-6 text-gray-300 text-sm">
          <div className="inline-flex items-center">
            <ShieldCheckIcon className="h-4 w-4 mr-1" />
            Secure & Confidential
          </div>
          <div className="inline-flex items-center">
            <CheckBadgeIcon className="h-4 w-4 mr-1" />
            Medically Verified
          </div>
          <div className="inline-flex items-center">
            <UserGroupIcon className="h-4 w-4 mr-1" />
            Expert Care Network
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingVdo;
