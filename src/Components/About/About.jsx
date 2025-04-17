import React from 'react';
import { FaHospital, FaHeartbeat, FaStethoscope, FaUsers } from 'react-icons/fa';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-20 text-gray-800 font-sans">
      
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-3"> About Seva Hospital</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A journey of care, compassion, and commitment — built for the people, by the people.
        </p>
      </div>

      {/* History & Vision */}
      <section className="flex flex-col md:flex-row items-start gap-10 bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl shadow-lg">
        <FaHospital className="text-6xl text-blue-600 shrink-0" />
        <div>
          <h2 className="text-3xl font-bold text-blue-700 mb-4">🏥 Our Story & Vision</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Founded in <strong>2005</strong>, Seva Hospital began with a bold dream — to make quality healthcare a right, not a privilege.
            Over the years, we’ve touched thousands of lives with a single promise: <em>“You matter, your health matters.”</em>
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-700 text-lg">
            <li>We empower people through compassionate, affordable treatment</li>
            <li>Our vision spans across villages, towns, and every heart in need</li>
            <li>We embrace innovation, but never forget the human touch</li>
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="flex flex-col md:flex-row items-start gap-10 bg-white border-l-8 border-blue-600 p-8 rounded-3xl shadow-md">
        <FaHeartbeat className="text-6xl text-red-500 shrink-0" />
        <div>
          <h2 className="text-3xl font-bold text-blue-700 mb-4">💉 What We Offer</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-lg">
            <li>✅ 24/7 Emergency Services</li>
            <li>✅ Specialist Doctors & Surgeons</li>
            <li>✅ Modern Diagnostic Labs</li>
            <li>✅ Clean Cabins & General Wards</li>
            <li>✅ In-house Pharmacy & Physiotherapy</li>
            <li>✅ Dental, Eye, and Child Care Units</li>
            <li>✅ Online Appointment & Health Records</li>
            <li>✅ Personalized & Preventive Care</li>
          </ul>
        </div>
      </section>

      {/* Management Team */}
      <section className="flex flex-col md:flex-row items-start gap-10 bg-gradient-to-br from-white to-blue-50 p-8 rounded-3xl shadow-lg">
        <FaUsers className="text-6xl text-blue-600 shrink-0" />
        <div>
          <h2 className="text-3xl font-bold text-blue-700 mb-4">👨‍⚕️ Meet the Team</h2>
          <div className="space-y-5 text-lg text-gray-700">
            <div>
              <strong>🧑‍⚕️ Dr. Md. Habibur Rahman</strong><br />
              <span className="text-sm text-gray-500">Managing Director & CMO</span><br />
              20+ years healing hearts and guiding surgical excellence.
            </div>
            <div>
              <strong>👩‍💼 Nazmun Nahar</strong><br />
              <span className="text-sm text-gray-500">Hospital Administrator</span><br />
              Leading operations with empathy, precision, and a smile.
            </div>
            <div>
              <strong>👨‍💻 Engr. Rajib Hasan</strong><br />
              <span className="text-sm text-gray-500">Technical Director</span><br />
              Innovating patient systems to connect people with care.
            </div>
          </div>
        </div>
      </section>

      {/* Closing Note */}
      <div className="text-center max-w-2xl mx-auto mt-10">
        <h3 className="text-2xl font-semibold text-blue-700 mb-2">Your Health, Our Mission 💙</h3>
        <p className="text-gray-600">
          At Seva Hospital, you're not just a patient — you're family. Thank you for trusting us with your care.
        </p>
      </div>
    </div>
  );
};

export default About;
