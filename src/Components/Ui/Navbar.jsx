import React from "react";
import { Link } from "react-router-dom";
import UseAuth from "../../Hooks/UseAuth";

function Navbar() {
  const { user, logOut } = UseAuth();
  // handlelogout
  const handlelogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error.message);
        // An error happened.
      });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-white shadow-md`}
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
          {user ? (
            <div className="dropdown dropdown-end space-y-3">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-2 border-teal-600">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="User Avatar"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-4 shadow border-accent space-y-4"
              >
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow"
                    onClick={handlelogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-3">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
