// landingPage.jsx
import React from "react";

const fitnessOptions = [
    {
        title: "Yoga",
        image:
            "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-yoga-web.png",
    },
    {
        title: "Gym",
        image:
            "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-gym-web.png",
    },
    {
        title: "Diet Generation",
        image:
            "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-diet-fit-web.png",
    },
];

const symptoms = [
    {
        name: "Fever",
        doctor: "General Physician Doctors",
        icon: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-fever-web.png",
    },
    {
        name: "Gastric / colic Pain",
        doctor: "Gastroenterologists",
        icon: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-gastric-colin-pain-web.png",
    },
    {
        name: "Body Aches",
        doctor: "General Physician Doctors",
        icon: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-body-aches-web.png",
    },
    {
        name: "Dust Allergy",
        doctor: "Doctors For Allergy",
        icon: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-dust-allergy-web.png",
    },
    {
        name: "Migraine",
        doctor: "Migraine Doctors",
        icon: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-migraine-web.png",
    },
    {
        name: "Cough",
        doctor: "General Physician Doctors",
        icon: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-cough-web.png",
    },
    {
        name: "Skin Allergy",
        doctor: "Dermatologists",
        icon: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-skin-allergy-web.png",
    },
    {
        name: "Eye Infections",
        doctor: "Ophthalmologists",
        icon: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-eye-infections-web.png",
    },
];


// Add this array above your LandingPage component
const healthCareOptions = [
    {
        name: "Allopathy",
        image: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-allopathy-web.png",
    },
    {
        name: "Homeopathy",
        image: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-homeopathy-web.png",
    },
    {
        name: "Naturopathy",
        image: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-naturopathy-web.png",
    },
    {
        name: "Ayurvedic",
        image: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-ayurvedic-web.png ",
    },
];
// Add this array above your LandingPage component (just like fitnessOptions & symptoms)
const healthcareSupport = [
    {
        name: "Orthopedic",
        image: "/Mumbai/Orthopaedic-Hospitals/nct-10345065",
    },
    {
        name: "Neurology",
        image: "http",
    },
    {
        name: "Pediatric",
        image: "http",
    },
    {
        name: "Gynic",
        image: "",
    },
    {
        name: "Cardiology",
        image: "https",
    },
    {
        name: "Psychiatric",
        image: "https:",
    },
];

const comprehensiveCare = [
    { name: "Skin Care", image: "https://www.google.com/imgres?q=hair%20care%20doctor%20png&imgurl=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20250327%2Fourlarge%2Fpngtree-a-confident-and-poised-young-female-doctor-with-dark-hair-png-image_15886840.png&imgrefurl=https%3A%2F%2Fpngtree.com%2Ffreepng%2Fa-confident-and-poised-young-female-doctor-with-dark-hair_20762685.html&docid=cjHAO6z3YNd_KM&tbnid=1m5renvQ7zwo-M&vet=12ahUKEwjiwduE5YSPAxWu1TgGHQKyOpQQM3oECEUQAA..i&w=640&h=640&hcb=2&ved=2ahUKEwjiwduE5YSPAxWu1TgGHQKyOpQQM3oECEUQAA" },
    { name: "Oral Care", image: "https://your-image-link.com/oralcare.jpg" },
    { name: "Eye Care", image: "https://your-image-link.com/eyecare.jpg" },
    { name: "Nutritional Care", image: "https://your-image-link.com/nutritioncare.jpg" },
    { name: "Weight Care", image: "https://your-image-link.com/weightcare.jpg" },
];

export default function LandingPage() {
    return (
        <>
            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
                <div className="flex items-center justify-between px-4 py-2">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <img
                            src="https://akam.cdn.jdmagicbox.com/images/icontent/jdrwd/jdlogosvg.svg"
                            alt="Logo"
                            className="h-8"
                        />
                    </div>

                    {/* Location & Search */}
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="📍 Mumbai"
                            className="px-3 py-2 border rounded-lg bg-gray-100 focus:outline-none"
                        />
                        <div className="flex border rounded-lg overflow-hidden">
                            <input
                                type="text"
                                placeholder="Doctors"
                                className="px-3 py-2 bg-gray-100 focus:outline-none"
                            />
                            <button className="bg-orange-500 px-3 text-white">🔍</button>
                        </div>
                    </div>

                    {/* Right Menu */}
                    <div className="flex items-center space-x-4 text-sm">
                        <a href="#">Advertise</a>
                        <a href="#">Free Listing</a>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                            Login / Sign Up
                        </button>
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <div className="w-full py-10 space-y-16 mt-20">
                {/* Fitness Section */}
                <section>
                    <h2 className="text-center text-2xl font-bold mb-8">
                        For Your Fitness
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {fitnessOptions.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center hover:scale-105 transition-transform"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="rounded-xl w-full h-56 object-cover shadow-md"
                                />
                                <h3 className="mt-3 font-semibold">{item.title}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Symptoms Section */}
                <section>
                    <h2 className="text-center text-2xl font-bold mb-8">
                        Most Common Symptoms
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {symptoms.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center hover:scale-105 transition-transform"
                            >
                                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                                    <img src={item.icon} alt={item.name} className="w-12 h-12" />
                                </div>
                                <h3 className="mt-3 font-semibold">{item.name}</h3>
                                <p className="text-gray-500 text-sm">{item.doctor}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Inside return(), where you want this section to appear */}
                <section>
                    <h2 className="text-center text-2xl font-bold mb-8">
                        Find Your Health Care Options
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {healthCareOptions.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center hover:scale-105 transition-transform"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="rounded-xl w-full h-48 object-cover shadow-md"
                                />
                                <h3 className="mt-3 font-semibold">{item.name}</h3>
                            </div>
                        ))}
                    </div>
                </section>


                {/* // Inside return(), just below Symptoms section */}
                <section>
                    <h2 className="text-center text-2xl font-bold mb-8">
                        Specialised Healthcare Support
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-6xl mx-auto">
                        {healthcareSupport.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center hover:scale-105 transition-transform"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="rounded-xl w-full h-40 object-cover shadow-md"
                                />
                                <h3 className="mt-3 font-semibold">{item.name}</h3>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="py-10 bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">

                        {/* Doctor Image */}
                        <div className="md:col-span-2 flex justify-center">
                            <img
                                src="https://your-image-link.com/doctor.jpg"
                                alt="Doctor"
                                className="w-full max-w-sm object-contain"
                            />
                        </div>

                        {/* Care Cards */}
                        <div className="md:col-span-3">
                            <h2 className="text-center text-2xl font-bold mb-6">
                                Comprehensive Care
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {comprehensiveCare.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-40 object-cover"
                                        />
                                        <h3 className="p-4 font-semibold text-center">{item.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
