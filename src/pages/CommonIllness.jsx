// CommonIllness.jsx
import React from 'react';
import Header from "../assets/component/Header.jsx";
import Footer from "../assets/component/Footer.jsx";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";

// Data for common illnesses among farmers
const illnesses = [
  {
    title: "Heat Exhaustion",
    symptoms: "Dizziness, heavy sweating, nausea, rapid heartbeat, and headache.",
    prevention: "Stay hydrated, wear light clothing, work during cooler hours, and take frequent breaks in the shade.",
    icon: (
      <img
        src="https://images.pexels.com/photos/17234698/pexels-photo-17234698/free-photo-of-close-up-of-a-person-in-a-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Heat Exhaustion"
        className="w-12 h-12 rounded-xl object-cover"
      />
    ),
  },
  {
    title: "Pesticide Poisoning",
    symptoms: "Nausea, vomiting, skin rashes, muscle cramps, and difficulty breathing.",
    prevention: "Use proper protective equipment (gloves, masks, long sleeves), follow safety instructions, and wash hands thoroughly after use.",
    icon: (
      <img
        src="https://images.pexels.com/photos/6154562/pexels-photo-6154562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Pesticide Poisoning"
        className="w-12 h-12 rounded-xl object-cover"
      />
    ),
  },
  {
    title: "Sunburn and Skin Damage",
    symptoms: "Red, painful skin, blisters, and long-term risk of skin cancer.",
    prevention: "Use broad-spectrum sunscreen with high SPF, wear a wide-brimmed hat and long-sleeved shirts, and seek shade when possible.",
    icon: (
      <img
        src="https://images.pexels.com/photos/8086082/pexels-photo-8086082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Sunburn"
        className="w-12 h-12 rounded-xl object-cover"
      />
    ),
  },
  {
    title: "Musculoskeletal Disorders",
    symptoms: "Chronic back pain, joint stiffness, muscle strain, and carpal tunnel syndrome.",
    prevention: "Use proper lifting techniques, stretch regularly, take breaks to rest muscles, and use ergonomic tools where possible.",
    icon: (
      <img
        src="https://images.pexels.com/photos/4031780/pexels-photo-4031780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Musculoskeletal Disorders"
        className="w-12 h-12 rounded-xl object-cover"
      />
    ),
  },
  {
    title: "Respiratory Illnesses",
    symptoms: "Coughing, wheezing, shortness of breath, and asthma.",
    prevention: "Wear a face mask to avoid inhaling dust, mold, and pollen. Ensure proper ventilation in barns and storage areas.",
    icon: (
      <img
        src="https://images.pexels.com/photos/3739198/pexels-photo-3739198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Respiratory Illnesses"
        className="w-12 h-12 rounded-xl object-cover"
      />
    ),
  },
  {
    title: "Zoonotic Diseases",
    symptoms: "Fever, headaches, and other symptoms depending on the specific animal-transmitted disease (e.g., leptospirosis, brucellosis).",
    prevention: "Practice good hygiene, wear gloves when handling animals, and get vaccinated against diseases like rabies.",
    icon: (
      <img
        src="https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Zoonotic Diseases"
        className="w-12 h-12 rounded-xl object-cover"
      />
    ),
  },
];

export default function CommonIllness() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 via-cyan-50 to-indigo-100 text-gray-800 py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <HeartIcon className="mx-auto h-12 w-12 text-blue-500 mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Common Illnesses in Farmers
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            A guide to the most frequent health issues faced by farmers and how to prevent them.
          </p>
        </div>
      </section>
      
      ---

      {/* Illnesses Grid */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {illnesses.map((illness, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
              >
                <div className="flex items-center space-x-4 mb-4">
                  {illness.icon}
                  <h3 className="text-xl font-bold text-gray-900">
                    {illness.title}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-blue-700">Symptoms:</h4>
                    <p className="text-sm text-blue-900 mt-1">
                      {illness.symptoms}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-green-700">Prevention:</h4>
                    <p className="text-sm text-green-900 mt-1">
                      {illness.prevention}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}