// LandingPage.jsx
import React, { useRef } from "react";
import Header from "../assets/component/Header.jsx"; // Import your header component
import { Link } from "react-router-dom";
import bg from "../assets/component/bg.png";
import Footer from "../assets/component/Footer.jsx"; // Import your footer component
import Chatbot from "./Chatbot.jsx";
import {
  HeartIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { FaStethoscope } from "react-icons/fa";
import LandingVdo from "../assets/component/landingvdo.jsx";

const symptoms = [
  {
    title: "Fever",
    description: "High body temperature and related symptoms",
    specialist: "General",
    iconColor: "bg-blue-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: "Gastric / Colic Pain",
    description: "Abdominal discomfort and digestive issues",
    specialist: "Gastroenterologists",
    iconColor: "bg-green-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Body Aches",
    description: "General muscle and joint pain/discomfort",
    specialist: "General",
    iconColor: "bg-purple-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-purple-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17.294c-.218.06-2.126-.403-2.126-.403-.648-.28-1.574-.535-2.222-.816.321-1.096.398-1.854.444-2.26.24-.316.536-.59.851-.837.283-.22.569-.414.851-.59a2.38 2.38 0 001.077-.923 2.14 2.14 0 00.124-2.31c.214-.427.524-.803.9-1.121.376-.32.793-.574 1.25-.765.457-.19.928-.278 1.41-.26.482.017.953.118 1.41.309.457.19.874.463 1.25.795.376.332.686.732.9 1.189a2.14 2.14 0 00.124 2.311c.148.163.31.332.48.513.29.317.587.616.851.905.315.315.591.667.83 1.05.239.382.433.79.582 1.22.148.428.24 1.02.26 1.76l.01.27c-.012.44-.04.877-.087 1.314-.046.438-.11.875-.19 1.312a2.44 2.44 0 01-1.157 1.944c-.218.156-.475.29-.757.404-.282.115-.595.208-.92.278-.325.07-.665.11-1.01.125l-.32.01c-.345-.015-.685-.055-1.01-.125-.325-.07-.64-.163-.92-.278a2.44 2.44 0 01-1.157-1.944z"
        />
      </svg>
    ),
    isHighlighted: true,
  },
  {
    title: "Dust Allergy",
    description: "Respiratory reactions to environmental allergens",
    specialist: "Doctors",
    iconColor: "bg-yellow-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-yellow-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: "Migraine",
    description: "Severe headaches with additional symptoms",
    specialist: "Migraine",
    iconColor: "bg-purple-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-purple-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17.43A8.001 8.001 0 0112 15c2.21 0 4.218.895 5.66 2.364M9.663 17.43A8.001 8.001 0 0012 17a8.001 8.001 0 002.337-.57M9.663 17.43c-2.42-2.38-3.663-5.32-3.663-8.43C6 4.67 8.686 2 12 2s6 2.67 6 6.91a8.001 8.001 0 01-3.663-1.07M12 17v2m-2-2v-2m4 2v-2m-2 2v2"
        />
      </svg>
    ),
  },
  {
    title: "Cough",
    description: "Persistent or acute coughing symptoms",
    specialist: "General",
    iconColor: "bg-green-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    ),
  },
  {
    title: "Skin Allergy",
    description: "Skin irritation and mild allergic reactions",
    specialist: "Dermatologists",
    iconColor: "bg-indigo-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-indigo-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Eye Infections",
    description: "Various eye conditions and common infections",
    specialist: "Ophthalmologists",
    iconColor: "bg-yellow-100",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-yellow-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
  },
];

const careOptions = [
  {
    type: "Digital Care",
    title: "Telemedicine",
    description: "Virtual consultations from the comfort of your home with certified healthcare professionals.",
    brief: "Connect instantly with doctors through secure video calls, get prescriptions, and receive medical advice without leaving home.",
    image: "/images/telemedicine.jpg",
    link: "/telemedicine",
    buttonText: "Explore Telemedicine",
    stats: "Available 24/7"
  },
  {
    type: "Primary Care",
    title: "Local Clinics",
    description: "Find nearby medical clinics for routine checkups and comprehensive healthcare services.",
    brief: "Discover trusted local healthcare providers in your area for regular health maintenance, preventive care, and family medicine.",
    image: "/images/clinic.jpg",
    link: "/clinics",
    buttonText: "Find Clinics",
    stats: "500+ Locations"
  },
  {
    type: "Specialized Care",
    title: "Specialist Doctors",
    description: "Connect with specialized healthcare professionals for expert medical care and treatment.",
    brief: "Access board-certified specialists across various medical fields including cardiology, dermatology, orthopedics, and more.",
    image: "/images/doctor.jpg",
    link: "/specialists",
    buttonText: "View Specialists",
    stats: "200+ Specialists"
  },
  {
    type: "Immediate Care",
    title: "Urgent Care",
    description: "Immediate medical attention for non-emergency situations when you need care now.",
    brief: "Fast-track medical services for injuries, illnesses, and health concerns that require prompt attention but aren't life-threatening.",
    image: "/images/urgent.jpg",
    link: "/urgent-care",
    buttonText: "Get Urgent Care",
    stats: "Average 15min wait"
  },
];


const Rating = ({ score }) => {
  return (
    <div className="flex items-center text-yellow-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 mr-1 fill-current"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.161c.969 0 1.371 1.24.588 1.81l-3.374 2.454a1 1 0 00-.364 1.118l1.287 3.961c.3.921-.755 1.688-1.54 1.118l-3.374-2.454a1 1 0 00-1.176 0l-3.374 2.454c-.785.57-1.84-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.119L2.83 9.395c-.783-.57-.38-1.81.588-1.81h4.16a1 1 0 00.951-.69l1.286-3.96z" />
      </svg>
      <span className="text-gray-700 font-semibold text-sm">{score}</span>
    </div>
  );
};

// Helper component for the bullet points
const BulletPoint = ({ text }) => {
  return (
    <li className="flex items-start space-x-2">
      <div className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0"></div>
      <span className="text-gray-600">{text}</span>
    </li>
  );
};

export default function LandingPage({user}) {
  return (
    <>
    <Chatbot/>
      <Header user={user} />
      <main className="bg-gradient-to-br from-white to-blue-50 ">
        <LandingVdo/>

      </main>


      <div className="bg-white py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="inline-flex items-center bg-green-500 text-white rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              Your Health Care Options
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
              Find the <span className="text-blue-500">Perfect Care</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              Discover healthcare solutions tailored to your specific needs and
              preferences
            </p>
          </div>

{/* Cards Grid */}
<div className="space-y-16">
  {careOptions.map((option, index) => (
    <div
      key={index}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
    >
      {/* Content Side */}
      <div className={`space-y-5 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
{/* Type Badge */}
<div className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-full">
  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
    {option.type}
  </p>
</div>
        
        {/* Title */}
        <h3 className="text-3xl font-bold text-gray-900 leading-tight">
          {option.title}
        </h3>
        
        {/* Description */}
        <p className="text-lg text-gray-600 leading-relaxed">
          {option.description}
        </p>

{/* Button */}
<div className="pt-4 p-5">
  <button className="btn btn-primary gap-2 shadow-lg hover:scale-105 transition-transform duration-200 p-2">
    <a href={option.link} className="flex items-center gap-2">
      {option.buttonText}
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </a>
  </button>
</div>




      </div>

      {/* Image Side */}
      <div className={`flex justify-center ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
        <div className="relative group w-full max-w-lg">
          {/* Background decoration */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-slate-600/10 rounded-3xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
          
          {/* Image container */}
          <div className="relative bg-white p-2 rounded-2xl shadow-xl">
            <img
              src={option.image}
              alt={option.title}
              className="w-full h-80 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  ))}
</div>



        </div>
      </div>
            <div className="bg-white py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="inline-flex items-center bg-green-500 text-white rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              Most Common Symptoms
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
              Quick Symptom Guide
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              Understand your symptoms and find the right specialist for your
              needs
            </p>
          </div>

          {/* Symptom Cards with Horizontal Scroll */}
          <div className="flex space-x-6 overflow-x-scroll pb-4 -mx-4 px-4 sm:px-0 scrollbar-hide">
            {symptoms.map((symptom, index) => (
              <div
                key={index}
                className={`flex-none w-72 bg-white rounded-2xl p-6 shadow-md border ${
                  symptom.isHighlighted
                    ? "border-purple-500"
                    : "border-gray-200"
                }
  hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
              >
                <div
                  className={`p-3 rounded-xl mb-4 inline-block ${symptom.iconColor}`}
                >
                  {symptom.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {symptom.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {symptom.description}
                </p>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    {symptom.specialist}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
