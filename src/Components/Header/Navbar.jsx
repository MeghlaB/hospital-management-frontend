import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import UseAdmin from "../../Hooks/UseAdmin";

function Navbar() {
  const { user, logOut } = useAuth();
 
    const [isAdmin] = UseAdmin()
  


 // Function to determine dashboard link based on user role
  const getDashboardLink = useCallback(() => {
    if (isAdmin) {
      return '/dashboard';
    }
  
    return '/dashboard/my-appoinments';
  }, [isAdmin]);



  const handleLogout = () => {
    logOut()
      .then(() => {
        // Logout successful
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="text-2xl font-bold text-teal-600">I-Health</div>

        <div className="flex items-center space-x-6 text-gray-800 font-medium">
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
                  <Link to={getDashboardLink ()}>Dashboard</Link>
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
    </nav>
  );
}

export default Navbar;
