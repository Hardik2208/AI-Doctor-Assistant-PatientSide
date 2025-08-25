import {
  Users,
  Heart,
  Stethoscope,
  Star,
  Search,
  Filter,
  MapPin,
  Clock,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function FindDoctor() {
  const doctors = [
    {
      id: 1,
      name: "Dr. Michael Chen",
      specialty: "Cardiologist",
      rating: 4.8,
      experience: "15 years",
      location: "Heart Care Center, Medical District, Downtown",
      time: "9:00 AM - 5:00 PM",
      days: ["Mon", "Tue", "Wed", "Thu", "+1"],
      fees: "₹1500 consultation",
      img: "https://i.pravatar.cc/100?img=11",
    },
    {
      id: 2,
      name: "Dr. Sarah Williams",
      specialty: "Pediatrician",
      rating: 4.9,
      experience: "12 years",
      location: "Children's Medical Center, Pediatric Wing, Central Hospital",
      time: "8:00 AM - 6:00 PM",
      days: ["Mon", "Tue", "Wed", "Thu", "+2"],
      fees: "₹800 consultation",
      img: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: 3,
      name: "Dr. Rajesh Gupta",
      specialty: "Orthopedic Surgeon",
      rating: 4.7,
      experience: "10 years",
      location: "City Orthopedic Center, Block A, Metro Hospital",
      time: "10:00 AM - 7:00 PM",
      days: ["Mon", "Wed", "Fri", "Sat", "+1"],
      fees: "₹1200 consultation",
      img: "https://i.pravatar.cc/100?img=13",
    },
    {
      id: 4,
      name: "Dr. Neha Sharma",
      specialty: "Dermatologist",
      rating: 4.6,
      experience: "8 years",
      location: "Skin Care Clinic, Central Plaza, Sector 18",
      time: "11:00 AM - 4:00 PM",
      days: ["Tue", "Thu", "Sat"],
      fees: "₹1000 consultation",
      img: "https://i.pravatar.cc/100?img=14",
    },
  ];

  return (
    <>
      {/* Gradient Section (Heading + Stats) */}
      <section className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-500 text-white py-16">
        <div className="max-w-6xl mx-auto text-center px-4">
          <Stethoscope className="mx-auto mb-4 w-10 h-10" />
          <h2 className="text-3xl md:text-4xl font-bold">
            Find Your Perfect Doctor
          </h2>
          <p className="mt-2 text-lg">
            Connect with experienced healthcare professionals for personalized
            medical care
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div>
              <Users className="mx-auto w-8 h-8 mb-2" />
              <p className="text-2xl font-semibold">500+</p>
              <p className="mt-1">Expert Doctors</p>
            </div>

            <div>
              <Heart className="mx-auto w-8 h-8 mb-2" />
              <p className="text-2xl font-semibold">50k+</p>
              <p className="mt-1">Happy Patients</p>
            </div>

            <div>
              <Stethoscope className="mx-auto w-8 h-8 mb-2" />
              <p className="text-2xl font-semibold">25+</p>
              <p className="mt-1">Specializations</p>
            </div>

            <div>
              <Star className="mx-auto w-8 h-8 mb-2" />
              <p className="text-2xl font-semibold">4.8</p>
              <p className="mt-1">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* White Background Section (Search + Doctors) */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Search & Filter */}
          {/* <div className="bg-gradient-to-r from-cyan-50 to-white border rounded-2xl shadow-md p-6 text-gray-800 -mt-12 relative z-10"> */}
          <div className="bg-gradient-to-r from-cyan-50 to-white border border-white rounded-2xl shadow-md p-6 text-gray-800 -mt-12 relative z-10">

            {/* Search Box */}
            <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-white shadow-sm">
              <Search className="w-5 h-5 text-cyan-600" />
              <input
                type="text"
                placeholder="Search doctors by name, specialty, or location..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
              />
              <div className="flex items-center gap-1 text-gray-600 text-sm cursor-pointer hover:text-cyan-600 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter by:</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="px-4 py-2 rounded-full bg-cyan-500 text-white text-sm cursor-pointer shadow-sm">
                All Doctors
              </span>
              <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm cursor-pointer hover:bg-gray-200">
                Cardiologist
              </span>
              <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm cursor-pointer hover:bg-gray-200">
                Pediatrician
              </span>
              <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm cursor-pointer hover:bg-gray-200">
                Orthopedic Surgeon
              </span>
              <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm cursor-pointer hover:bg-gray-200">
                Dermatologist
              </span>
            </div>
          </div>


          {/* Doctors Section */}
          <div className="mt-16 text-left">
            <h3 className="text-2xl font-semibold text-gray-900">
              Available Doctors
            </h3>
            <p className="text-sm mt-1 text-gray-500">
              {doctors.length} doctors found
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {doctors.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-xl shadow-md p-5 flex flex-col"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={doc.img}
                      alt={doc.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      {/* ✅ Doctor name clickable */}
                      <Link
                        to={`/doctor/${doc.id}`}
                        className="text-lg font-semibold text-blue-600 hover:underline"
                      >
                        {doc.name}
                      </Link>
                      <p className="text-cyan-600 font-medium">
                        {doc.specialty}
                      </p>
                      <p className="text-yellow-500 flex items-center">
                        ⭐ {doc.rating} • {doc.experience}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 text-gray-600 text-sm space-y-1">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyan-500" />
                      {doc.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-500" />
                      {doc.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-500" />
                      {doc.days.map((d, i) => (
                        <span
                          key={i}
                          className="bg-teal-500 text-white px-2 py-0.5 rounded-md text-xs font-medium ml-1"
                        >
                          {d}
                        </span>
                      ))}
                    </p>
                    <p className="text-green-600 font-semibold">{doc.fees}</p>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 bg-gradient-to-r from-cyan-400 to-teal-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 font-medium hover:opacity-90">
                      <Calendar className="w-4 h-4" /> Book Appointment
                    </button>
                    <button className="border border-gray-300 py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 
    transition-all duration-300 hover:text-white hover:border-transparent hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700">
                      📄 Generate Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
