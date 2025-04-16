import React from "react";
import appointment from "/src/assets/appoinments.png";

function Appointment() {
  return (
    <div className="container mx-auto rounded-md bg-[#625fff] my-16 px-6 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text Section */}
        <div className="text-center md:text-left md:w-1/2 space-y-6 ">
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-snug px-4">
            Book Appointment  <br /> With 100+ Trusted Doctors
          </h1>
         
         <button className="bg-white text-[#625fff] font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition duration-300 mx-4">
            Create Account
          </button>
      
        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={appointment}
            alt="Doctors"
            className="w-full h-auto max-h-[450px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Appointment;
