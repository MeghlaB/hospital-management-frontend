import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import banner from "/src/assets/hospital-banner.jpg";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import UseAdmin from "../../Hooks/UseAdmin";

function BannerWithNavbar() {
  const { user, logOut } = UseAuth();
  const [isAdmin] = UseAdmin()

  const [isScrolled, setIsScrolled] = useState(false);
 

  // Function to determine dashboard link based on user role
  const getDashboardLink = useCallback(() => {
    if (isAdmin) {
      return '/dashboard';
    }
  
    return '/dashboard/my-appoinments';
  }, [isAdmin]);



  // handle logout
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire("Logged out!", "Sign-out successful.", "success");
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    });
  };

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
          <div className="space-x-6 text-gray-800 font-medium flex items-center">
            <Link
              to="/"
              className="hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300"
            >
              Contact
            </Link>
            <Link
              to="/doctor-list"
              className="hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300"
            >
              Doctor List
            </Link>
            <Link
              to="/doctor-appointment-booking"
              className="hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300"
            >
              Appointment
            </Link>

            {user ? (
              <div className="dropdown dropdown-end space-y-3">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full border-2 border-teal-600">
                    <img
                      src={user?.photoURL || "/default-avatar.png"}
                      alt="User Avatar"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-4 shadow border-accent space-y-4"
                >
                  <li>
                    <Link to={getDashboardLink()}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="bg-gradient-to-r from-orange-300 to-orange-100 min-h-screen flex items-center px-6 md:px-12 pt-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
              I-Health Hospital <br /> Management System
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Customizable to care providers of all sizes, this workflow-enabled
              management solution seamlessly supports your hospital in carrying
              out its entire range of functions.
            </p>
            <button className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow">
              View Demo
            </button>
          </div>

          {/* Image */}
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
