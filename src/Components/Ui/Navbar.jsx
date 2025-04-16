import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300"bg-white shadow-md`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold text-teal-600">I-Health</div>
        <div className="space-x-6 text-gray-800 font-medium">
          <Link
            to={"/"}
            className="hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className="hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            className="hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300"
          >
            Contact
          </Link>
          <Link
            to={"/doctor-list"}
            className="hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300"
          >
            Doctor List
          </Link>
          <Link
            to={"/doctor-appointment-booking"}
            className="hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300"
          >
             Appointment 
          </Link>
          <Link to={"/login"}  className=
                      "px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow"> Login </Link>
                      <Link to={"/register"}  className=
                      "px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow"> Register </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
