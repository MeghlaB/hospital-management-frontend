import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import UseAdmin from "../../Hooks/UseAdmin";

function Navbar() {
  const { user, logOut } = useAuth();
  const [isAdmin] = UseAdmin();

  const getDashboardLink = useCallback(() => {
    if (isAdmin) {
      return "/dashboard";
    }
    return "/dashboard/my-appoinments";
  }, [isAdmin]);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="navbar bg-white shadow-md sticky top-0 z-50">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/doctor-list">Doctor List</Link></li>
            <li><Link to="/doctor-appointment-booking">Appointment</Link></li>
            {user ? (
              <>
                <li><Link to={getDashboardLink()}>Dashboard</Link></li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="text-2xl font-bold text-teal-600 ml-2">
          I-Health
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/doctor-list">Doctor List</Link></li>
          <li><Link to="/doctor-appointment-booking">Appointment</Link></li>
        </ul>
      </div>

      <div className="navbar-end hidden lg:flex items-center space-x-4">
        {user ? (
          <div className="dropdown dropdown-end">
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
              className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-52 space-y-3 z-[999]"
            >
              <li>
                <Link to={getDashboardLink()}>Dashboard</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow"
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
  );
}

export default Navbar;
