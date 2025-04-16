
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import banner from '/src/assets/hospital-banner.jpg'


function BannerWithNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          isScrolled
            ? "bg-white shadow-md"
            : "bg-gradient-to-r from-orange-300 to-orange-100 bg-opacity-20"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold text-teal-600">I-Health</div>
          <div className="space-x-6 text-gray-800 font-medium">
            <Link to={"/"} className='hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300'>Home</Link>
            <Link to={"/about"}  className='hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300'>About</Link>
            <Link to={"/contact"}  className='hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300'>Contact</Link>
            <Link to={"/doctor-list"}  className='hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300'>Doctor List</Link>
            <Link to={"/doctor-appointment-booking"}  className='hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300'>Doctor Appointment Booking</Link>
          </div>
        </div>
      </div>

      {/* Spacer for sticky navbar */}
      {/* <div className="h-[72px]" /> */}

      {/* Banner Section */}
      <div className="bg-gradient-to-r from-orange-300 to-orange-100 min-h-screen flex items-center px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
              I-Health Hospital <br /> Management System
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Customizable to care providers of all sizes, this workflow enabled
              management solution seamlessly supports your hospital in carrying
              out its entire range of functions.
            </p>
            <button className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow">
              View Demo
            </button>
          </div>

          {/* Image / Dashboard Preview */}
          <div>
            <img
              src={banner}
              alt="Dashboard preview"
              className="rounded-lg shadow-xl"
              width={750}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerWithNavbar;

