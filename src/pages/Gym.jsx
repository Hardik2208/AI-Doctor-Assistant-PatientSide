import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pushupMain from './3.png'; // Importing the main image for Push-ups
import pushupStep1Thumb from './1.png'; 
import pushupStep1Full from './1.png';
import pushupStep2Thumb from './2.png';
import pushupStep2Full from './2.png';
import pushupStep3Thumb from './3.png';
import pushupStep3Full from './3.png';
import Header from '../assets/component/Header.jsx'; // Import your header component

// --- Data for the exercises (Updated with imported images) ---
const exercisesData = [
    {
        name: "Push-ups",
        mainImage: "./3.png", // Using the imported main image
        description: "A fundamental bodyweight exercise that works the chest, shoulders, triceps, and core.",
        benefits: [
            "Increases upper body strength",
            "Improves core stability",
            "Requires no equipment"
        ],
        steps: [
            { thumbnail: pushupStep1Thumb, fullImage: pushupStep1Full }, 
            { thumbnail: pushupStep2Thumb, fullImage: pushupStep2Full }, 
            { thumbnail: pushupStep3Thumb, fullImage: pushupStep3Full }
        ]
    },
    {
        name: "Squats",
        mainImage: "https://images.unsplash.com/photo-1579752003714-3c6c06a4b3d7?w=500&auto=format&fit=crop&q=60",
        description: "A full-body exercise that primarily strengthens the legs and glutes.",
        benefits: [
            "Builds lower body strength",
            "Improves mobility and balance",
            "Helps with calorie expenditure"
        ],
        steps: [
            { thumbnail: "https://images.unsplash.com/photo-1579752003714-3c6c06a4b3d7?w=100&auto=format&fit=crop&q=60", fullImage: "https://images.unsplash.com/photo-1579752003714-3c6c06a4b3d7?w=500&auto=format&fit=crop&q=60" },
            { thumbnail: "https://images.unsplash.com/photo-1530964179374-e3f9a7214713?w=100&auto=format&fit=crop&q=60", fullImage: "https://images.unsplash.com/photo-1530964179374-e3f9a7214713?w=500&auto=format&fit=crop&q=60" },
            { thumbnail: "https://images.unsplash.com/photo-1530514107521-b4ed47514300?w=100&auto=format&fit=crop&q=60", fullImage: "https://images.unsplash.com/photo-1530514107521-b4ed47514300?w=500&auto=format&fit=crop&q=60" }
        ]
    }
];

// --- Lightbox Component (unchanged) ---
const Lightbox = ({ images, initialIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div className="relative">
                <img
                    src={images[currentIndex].fullImage}
                    alt={`Step ${currentIndex + 1}`}
                    className="max-w-full max-h-[90vh] rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                />
                <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-opacity"
                    onClick={prevImage}
                >
                    &larr;
                </button>
                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 transition-opacity"
                    onClick={nextImage}
                >
                    &rarr;
                </button>
            </div>
            <button
                className="absolute top-4 right-4 text-white text-5xl font-bold transition-transform transform hover:scale-110"
                onClick={onClose}
            >
                &times;
            </button>
        </div>
    );
};

// --- ExerciseCard Component ---
const ExerciseCard = ({ exercise }) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [initialImageIndex, setInitialImageIndex] = useState(0);

    const openLightbox = (index) => {
        setInitialImageIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };

    const formattedName = exercise.name.toLowerCase().replace(/\s/g, '-');

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                {/* Main Exercise Image (Left Side) */}
                <Link to={`/exercise/${formattedName}`} className="w-full md:w-1/3 flex-shrink-0">
                    <img
                        src={exercise.mainImage}
                        alt={exercise.name}
                        className="rounded-lg object-cover w-full h-52 md:h-64 cursor-pointer"
                    />
                </Link>

                {/* Details Section (Right Side) */}
                <div className="flex-1 text-center md:text-left">
                    <Link to={`/exercise/${formattedName}`}>
                        <h3 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">{exercise.name}</h3>
                    </Link>
                    
                    {/* Advantages/Benefits */}
                    <div className="mt-4">
                        <h4 className="text-lg font-medium text-gray-700">Advantages:</h4>
                        <ul className="list-disc list-inside text-gray-600">
                            {exercise.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Small Photos (Steps) */}
                    <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                        {exercise.steps.map((step, index) => (
                            <img
                                key={index}
                                src={step.thumbnail}
                                alt={`Step ${index + 1}`}
                                className="w-20 h-20 rounded-md cursor-pointer border-2 border-gray-300 hover:border-blue-500 transition-colors duration-200 object-cover"
                                onClick={() => openLightbox(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <Lightbox
                    images={exercise.steps}
                    initialIndex={initialImageIndex}
                    onClose={closeLightbox}
                />
            )}
        </div>
    );
};

// --- Main Gym Page Component ---
const Gym = ({ exercisesData }) => {
    return (
        <>
            <Header />
            <div className="bg-gray-50 py-4 min-h-screen font-sans mt-20">
                <div className="max-w-8xl px-4">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
                        Exercises Guide
                    </h1>
                    {exercisesData.map((exercise, index) => (
                        <ExerciseCard key={index} exercise={exercise} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Gym;