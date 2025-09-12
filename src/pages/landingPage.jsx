// LandingPage.jsx

import React, { useState } from "react";
import Header from "../assets/component/Header.jsx";
import { Link } from "react-router-dom";
import Footer from "../assets/component/Footer.jsx";
import Chatbot from "./Chatbot.jsx";
import { motion, AnimatePresence } from 'framer-motion';
import { FaStethoscope } from "react-icons/fa";
import LandingVdo from "../assets/component/landingvdo.jsx";
import FindDoctorButton from "../assets/component/FindDoctorButton.jsx"; // Naya button import hua hai

const symptoms = [
  {
    title: "Fever",
    description:
      "Fever is a temporary increase in body temperature, often due to an infection. It can be accompanied by chills, sweating, dehydration, and fatigue. Most fevers resolve on their own, but persistent or high fever may require medical attention.",
    specialist: "General Physician",
    bgImage: "/images/quicksymptom/fever.jpg",
  },
  {
    title: "Gastric / Colic Pain",
    description:
      "Gastric pain can result from indigestion, acid reflux, or more serious gastrointestinal issues. Symptoms may include bloating, nausea, heartburn, or cramping. A gastroenterologist can help diagnose and treat persistent abdominal discomfort.",
    specialist: "Gastroenterologist",
    bgImage: "https://images.pexels.com/photos/4498154/pexels-photo-4498154.jpeg",
  },
  {
    title: "Body Aches",
    description:
      "Body aches are generalized pain in muscles or joints, often linked to viral infections, overexertion, or stress. Rest, hydration, and mild pain relievers may help, but persistent aches could signal an underlying condition.",
    specialist: "General Physician",
    bgImage: "/images/quicksymptom/ache.jpg",
    isHighlighted: true,
  },
  {
    title: "Dust Allergy",
    description:
      "Dust allergy can cause sneezing, coughing, itchy eyes, and difficulty breathing due to exposure to dust mites or particles. Preventive steps include regular cleaning and using air filters. Severe symptoms may require allergy medications.",
    specialist: "Allergist / Immunologist",
    bgImage: "https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg",
  },
  {
    title: "Migraine",
    description:
      "Migraines are severe headaches often accompanied by nausea, sensitivity to light and sound, or visual disturbances. Identifying triggers and lifestyle adjustments, along with prescribed medications, can help manage symptoms.",
    specialist: "Neurologist",
    bgImage: "https://images.pexels.com/photos/5380302/pexels-photo-5380302.jpeg",
  },
  {
    title: "Cough",
    description:
      "A cough may be caused by infections, allergies, or irritants. It can be dry or productive (with phlegm). Persistent cough lasting more than a few weeks should be evaluated by a doctor to rule out chronic conditions.",
    specialist: "Pulmonologist / General Physician",
    bgImage: "/images/quicksymptom/cough.jpg",
  },
  {
    title: "Skin Allergy",
    description:
      "Skin allergies can present as rashes, redness, itching, or swelling. Common causes include food, medications, or environmental triggers. A dermatologist can help diagnose and recommend treatment, including topical creams or antihistamines.",
    specialist: "Dermatologist",
    bgImage: "https://images.pexels.com/photos/674977/pexels-photo-674977.jpeg",
  },
  {
    title: "Eye Infections",
    description:
      "Eye infections like conjunctivitis cause redness, itching, pain, and discharge. Proper hygiene and timely medical care are essential to prevent worsening. An ophthalmologist may prescribe eye drops or other treatment.",
    specialist: "Ophthalmologist",
    bgImage: "https://images.pexels.com/photos/4587971/pexels-photo-4587971.jpeg",
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
    link: "/specialised-doctor",
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
  {
    type: "Personal Health",
    title: "Menstrual Cycle Tracker",
    description: "Track your menstrual health and gain insights into your cycle with personalized data and health tips.",
    brief: "Monitor your cycle, predict fertile windows, and understand your body better with a simple-to-use tracker.",
    image: "https://images.pexels.com/photos/4031780/pexels-photo-4031780.jpeg",
    link: "/cycle-tracker",
    buttonText: "Start Tracking",
    stats: "2.5M+ Users"
  },
  {
    type: "Wellness",
    title: "Common Illnesses",
    description: "Learn about symptoms, causes, and home remedies for everyday ailments to stay informed and healthy.",
    brief: "A comprehensive guide to common health issues like colds, flu, and headaches, with expert advice for care and prevention.",
    image: "https://images.pexels.com/photos/3739198/pexels-photo-3739198.jpeg",
    link: "/common-illnesses",
    buttonText: "Learn More",
    stats: "Expert Verified"
  },
];


export default function LandingPage({user}) {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  return (
    <>
      <FindDoctorButton /> {/* Yahan naya button add ho gaya hai */}
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

          {/* Cards Grid - Updated for premium look and new cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careOptions.map((option, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105
                                ring-1 ring-inset ring-gray-200/50 group-hover:ring-blue-500/50"
              >
                {/* Image background with overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${option.image})` }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300"></div>
                </div>

                {/* Content layer - now fully opaque, text is white for contrast */}
                <div className="relative p-4 h-full flex flex-col justify-end text-white"> {/* Text is now always white */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-200"> {/* Adjusted text color */}
                      {option.type}
                    </p>
                    <h3 className="text-xl font-bold text-white leading-tight"> {/* Adjusted text color */}
                      {option.title}
                    </h3>
                    <p className="text-xs text-gray-100 leading-relaxed"> {/* Adjusted text color */}
                      {option.description}
                    </p>
                  </div>

                  {/* Button at the bottom of the card */}
                  <div className="mt-3">
                    <Link
                      to={option.link}
                      className="inline-flex items-center text-blue-300 hover:text-blue-500 transition-colors duration-200 font-semibold"
                    >
                      {option.buttonText}
                      <svg
                        className="w-4 h-4 ml-2"
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
                    </Link>
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

          {/* Quick Symptom Cards - This section remains with its original horizontal scroll */}
          <div className="flex space-x-6 overflow-x-scroll pb-4 -mx-4 px-4 sm:px-0 scrollbar-hide">
            {symptoms.map((symptom, index) => (
              <motion.div
                key={index}
                layoutId={`symptom-${index}`}
                onClick={() => setSelectedSymptom(symptom)}
                className="flex-none w-72 h-80 bg-white rounded-2xl shadow-md border hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden relative"
                style={{
                  backgroundImage: `url(${symptom.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-colors duration-300"></div>

                {/* Content */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-end text-white">
                  <motion.h3
                    layoutId={`title-${index}`}
                    className="text-xl font-bold mb-2"
                  >
                    {symptom.title}
                  </motion.h3>

                  <div className="border-t border-white/30 pt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">
                      {symptom.specialist}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modal for expanded symptom view */}
          <AnimatePresence>
            {selectedSymptom && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedSymptom(null)}
              >
                <motion.div
                  layoutId={`symptom-${symptoms.indexOf(selectedSymptom)}`}
                  className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Background Image Section */}
                  <div
                    className="relative h-64 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${selectedSymptom.bgImage})`,
                    }}
                  >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Title Overlay */}
                    <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
                      <motion.h3
                        layoutId={`title-${symptoms.indexOf(selectedSymptom)}`}
                        className="text-3xl font-bold mb-2"
                      >
                        {selectedSymptom.title}
                      </motion.h3>
                    </div>
                  </div>

                  {/* Detailed Content Section */}
                  <div className="p-8">
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      {selectedSymptom.description}
                    </p>

                    <div className="flex items-center justify-between border-t pt-4">
                      <span className="text-sm font-medium text-gray-500">
                        Specialist: {selectedSymptom.specialist}
                      </span>
                      <button
                        onClick={() => setSelectedSymptom(null)}
                        className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
}