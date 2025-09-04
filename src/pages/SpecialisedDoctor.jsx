import React from "react";
import { Link } from "react-router-dom";
import Header from "../assets/component/Header";
import Footer from "../assets/component/Footer";

const doctors = [
  { title: "Orthopedic", img: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-orthopedic-web.png?w=256&q=75" },
  { title: "Neurology", img: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-neurology-web.png?w=256&q=75" },
  { title: "Pediatric", img: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-pediatric-web.png?w=256&q=75" },
  { title: "Gynic", img: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-gynic-web.png?w=256&q=75" },
  { title: "Cardiology", img: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-cardiology-web.png?w=256&q=75" },
  { title: "Psychiatric", img: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-psychiatric-web.png?w=256&q=75" },
  { title: "Gastrology", img: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-gastrology-web.png?w=256&q=75" },
  { title: "Oncology", img: "https://akam.cdn.jdmagicbox.com/images/icons/iphone/newfilter/ip-oncologist-web.png?w=256&q=75" },
];

const SpecialisedDoctor = () => {
  return (
    <>
      <Header />
      <div className="py-20 px-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-screen">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 tracking-tight">
          Specialised Healthcare Support
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
          {doctors.map((doc, index) => (
            <Link to="/find-doctor" key={index}>
              <div
                className="relative bg-white rounded-3xl shadow-md border border-gray-100
                           hover:shadow-2xl hover:border-blue-300/60 transform hover:-translate-y-4 hover:scale-105 
                           transition-all duration-300 ease-out flex flex-col items-center cursor-pointer"
              >
                {/* Glow overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-200/30 to-cyan-200/30 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

                <div className="p-10 flex flex-col items-center relative z-10">
                  <img
                    src={doc.img}
                    alt={doc.title}
                    className="w-36 h-36 object-contain mb-6"
                  />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 tracking-wide">
                    {doc.title}
                  </h3>
                  <span className="block w-14 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mb-3"></span>
                  <p className="text-sm text-gray-600 text-center">
                    Expert care in {doc.title.toLowerCase()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SpecialisedDoctor;
