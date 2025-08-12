// LandingPage.jsx
import React, { useRef } from "react";
import Header from "../assets/component/Header"; // Import your header component

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

const healthCareOptions = [
  {
    name: "Allopathy",
    image:
      "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-allopathy-web.png",
  },
  {
    name: "Homeopathy",
    image:
      "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-homeopathy-web.png",
  },
  {
    name: "Naturopathy",
    image:
      "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-naturopathy-web.png",
  },
  {
    name: "Ayurvedic",
    image:
      "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-ayurvedic-web.png ",
  },
];

const healthcareSupport = [
  { name: "Orthopedic", image: "/Mumbai/Orthopaedic-Hospitals/nct-10345065" },
  { name: "Neurology", image: "http" },
  { name: "Pediatric", image: "http" },
  { name: "Gynic", image: "" },
  { name: "Cardiology", image: "https" },
  { name: "Psychiatric", image: "https:" },
];

const comprehensiveCare = [
  {
    name: "Skin Care",
    image:
      "https://png.pngtree.com/png-vector/20250327/ourlarge/pngtree-a-confident-and-poised-young-female-doctor-with-dark-hair-png-image_15886840.png",
  },
  { name: "Oral Care", image: "https://your-image-link.com/oralcare.jpg" },
  { name: "Eye Care", image: "https://your-image-link.com/eyecare.jpg" },
  {
    name: "Nutritional Care",
    image: "https://your-image-link.com/nutritioncare.jpg",
  },
  { name: "Weight Care", image: "https://your-image-link.com/weightcare.jpg" },
];

export default function LandingPage() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      (scrollRef.current as HTMLElement).scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      (scrollRef.current as HTMLElement).scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />

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

        {/* Health Care Options */}
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

        {/* Specialized Healthcare Support */}
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

        {/* Comprehensive Care Section with Arrows */}
        <section className="py-10 bg-gradient-to-r from-blue-50 to-blue-100 relative">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-center text-2xl font-bold mb-6">
              Comprehensive Care
            </h2>

            <div className="flex flex-col md:flex-row md:items-center md:space-x-8 relative">
              {/* Doctor Image */}
              <div className="flex-shrink-0 flex justify-center md:w-1/3">
                <img
                  src="https://your-image-link.com/doctor.jpg"
                  alt="Doctor"
                  className="w-full max-w-sm object-contain"
                />
              </div>

              {/* Scrollable Cards */}
              <div className="md:w-2/3 relative">
                {/* Left Arrow */}
                <button
                  onClick={scrollLeft}
                  className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
                >
                  ◀
                </button>

                <div
                  ref={scrollRef}
                  className="flex space-x-6 overflow-x-hidden overflow-y-hidden scrollbar-hide scroll-smooth"
                >
                  {comprehensiveCare.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform w-48 flex-shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-40 object-cover"
                      />
                      <h3 className="p-4 font-semibold text-center">
                        {item.name}
                      </h3>
                    </div>
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={scrollRight}
                  className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
