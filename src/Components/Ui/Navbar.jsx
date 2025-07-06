import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import UseAdmin from "../../Hooks/UseAdmin";

function Navbar() {
  const { user, logOut } = useAuth();

  const [isAdmin] = UseAdmin();
  const dashboardLink = isAdmin ? "/dashboard/adminhome" : "/dashboard/my-appoinments";
  const getDashboardLink = useCallback(() => {
    if (isAdmin) {
      return "/dashboard/adminhome";
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

  const menuItems = (
    <>
      <li>
        <Link
          to="/"
          className="hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/about"
          className="hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300"
        >
          About
        </Link>
      </li>
      <li>
        <Link
          to="/contact"
          className="hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300"
        >
          Contact
        </Link>
      </li>
      <li>
        <Link
          to="/doctor-list"
          className="hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300"
        >
          Doctor List
        </Link>
      </li>
      <li>
        <Link
          to="/doctor-appointment-booking"
          className="hover:underline hover:underline-offset-6 hover:decoration-teal-600 transition-all duration-300"
        >
          Appointment
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm  lg:px-9">
      <div className="navbar-start ">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[999] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
            {user && (
              <>
                <li>
                  {/* <Link to={getDashboardLink()}>Dashboard</Link> */}
                    <Link to={dashboardLink}>Dashboard</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {!user && (
              <>
                <li>
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl text-teal-600 lg:text-2xl  font-bold" to="/">
          In Health
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-3">{menuItems}</ul>
      </div>

      <div className="navbar-end hidden lg:flex">
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
