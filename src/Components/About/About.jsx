import React from 'react';
import { FaHospital, FaHeartbeat, FaStethoscope, FaUsers, FaStar, FaCheckCircle } from 'react-icons/fa';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-16 text-gray-800 font-sans">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-teal-700 mb-3 bg-gradient-to-r from-teal-600 bg-clip-text ">
          About Seva Hospital
        </h1>
        <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full"></div>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          A journey of care, compassion, and commitment — built for the people, by the people.
        </p>
      </div>

      {/* History & Vision */}
      <section className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-blue-50 opacity-60"></div>
        <div className="relative flex flex-col md:flex-row items-start gap-8 p-8">
          <div className="bg-teal-100 p-4 rounded-full">
            <FaHospital className="text-4xl text-teal-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-teal-100 text-teal-700 p-2 rounded-lg">🏥</span>
              <span>Our Story & Vision</span>
            </h2>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4">
              Founded in <strong className="text-teal-700">2005</strong>, Seva Hospital began with a bold dream — to make quality healthcare a right, not a privilege.
              Over the years, we've touched thousands of lives with a single promise: <em className="text-teal-600 font-medium">"You matter, your health matters."</em>
            </p>
            <ul className="space-y-3">
              {[
                "We empower people through compassionate, affordable treatment",
                "Our vision spans across villages, towns, and every heart in need",
                "We embrace innovation, but never forget the human touch"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <FaCheckCircle className="text-teal-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-pink-50 opacity-60"></div>
        <div className="relative flex flex-col md:flex-row items-start gap-8 p-8">
          <div className="bg-red-100 p-4 rounded-full">
            <FaHeartbeat className="text-4xl text-red-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-red-100 text-red-600 p-2 rounded-lg">💉</span>
              <span>What We Offer</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "24/7 Emergency Services",
                "Specialist Doctors & Surgeons",
                "Modern Diagnostic Labs",
                "Clean Cabins & General Wards",
                "In-house Pharmacy & Physiotherapy",
                "Dental, Eye, and Child Care Units",
                "Online Appointment & Health Records",
                "Personalized & Preventive Care"
              ].map((service, index) => (
                <div key={index} className="flex items-start gap-2 bg-white/70 p-3 rounded-lg">
                  <FaStar className="text-yellow-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-60"></div>
        <div className="relative flex flex-col md:flex-row items-start gap-8 p-8">
          <div className="bg-blue-100 p-4 rounded-full">
            <FaUsers className="text-4xl text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">👨‍⚕️</span>
              <span>Meet the Team</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "Dr. Md. Habibur Rahman",
                  role: "Managing Director & CMO",
                  bio: "20+ years healing hearts and guiding surgical excellence.",
                  icon: "🧑‍⚕️"
                },
                {
                  name: "Nazmun Nahar",
                  role: "Hospital Administrator",
                  bio: "Leading operations with empathy, precision, and a smile.",
                  icon: "👩‍💼"
                },
                {
                  name: "Engr. Rajib Hasan",
                  role: "Technical Director",
                  bio: "Innovating patient systems to connect people with care.",
                  icon: "👨‍💻"
                }
              ].map((member, index) => (
                <div key={index} className="bg-white/80 p-4 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{member.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-800">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 pl-11">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing Note */}
      <div className="text-center max-w-3xl mx-auto bg-gradient-to-r from-teal-50 to-blue-50 p-8 rounded-2xl shadow-sm border border-gray-200">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Your Health, Our Mission <span className="text-blue-500">💙</span>
        </h3>
        <div className="w-16 h-1 bg-teal-400 mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600 text-lg leading-relaxed">
          At Seva Hospital, you're not just a patient — you're family. Thank you for trusting us with your care.
        </p>
      </div>
    </div>
  );
};

export default About;