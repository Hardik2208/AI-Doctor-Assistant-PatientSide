import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../assets/component/Header.jsx';

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
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="relative">
                <img src={images[currentIndex].fullImage} alt={`Step ${currentIndex + 1}`} className="max-w-full max-h-[90vh] rounded-lg" onClick={(e) => e.stopPropagation()} />
                <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75" onClick={prevImage}>&larr;</button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75" onClick={nextImage}>&rarr;</button>
            </div>
            <button className="absolute top-4 right-4 text-white text-5xl font-bold hover:scale-110" onClick={onClose}>&times;</button>
        </div>
    );
};

const YogaCard = ({ pose }) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [initialImageIndex, setInitialImageIndex] = useState(0);

    const openLightbox = (index) => {
        setInitialImageIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };

    const formattedName = pose.name.toLowerCase().replace(/\s/g, '-');

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <Link to={`/yoga/${formattedName}`} className="w-full md:w-1/3 flex-shrink-0">
                    <img src={pose.mainImage} alt={pose.name} className="rounded-lg object-cover w-full h-52 md:h-64 cursor-pointer" />
                </Link>
                <div className="flex-1 text-center md:text-left">
                    <Link to={`/yoga/${formattedName}`}>
                        <h3 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors cursor-pointer">{pose.name}</h3>
                    </Link>
                    <div className="mt-4">
                        <h4 className="text-lg font-medium text-gray-700">Benefits:</h4>
                        <ul className="list-disc list-inside text-gray-600">
                            {pose.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                        {pose.steps.map((step, index) => (
                            <img key={index} src={step.fullImage} alt={`Step ${index + 1}`} className="w-20 h-20 rounded-md cursor-pointer border-2 border-gray-300 hover:border-blue-500 object-cover" onClick={() => openLightbox(index)} />
                        ))}
                    </div>
                </div>
            </div>
            {isLightboxOpen && <Lightbox images={pose.steps} initialIndex={initialImageIndex} onClose={closeLightbox} />}
        </div>
    );
};

const Yoga = ({ yogaPoses }) => {
    return (
        <>
            <Header />
            <div className="bg-gray-50 py-4 min-h-screen font-sans mt-20">
                <div className="max-w-8xl px-4">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Yoga Guide</h1>
                    {yogaPoses.map((pose, index) => (
                        <YogaCard key={index} pose={pose} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Yoga;
