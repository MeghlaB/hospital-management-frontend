import {
  BarChart2,
  BookImageIcon,
  Boxes,
  Home,
  User,
  UserPlus,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    // <aside className="h-full w-full bg-gray-800 text-white px-4 py-6">
    //   <div className="text-2xl font-bold mb-10">Admin</div>

    //   <div className="pb-4">
    //     <Link to="/dashboard/adminhome" className="flex items-center gap-3 hover:text-gray-300">
    //       <Home size={20} />
    //       Admin Home
    //     </Link>
    //   </div>

    //   <nav className="space-y-4">
    //     <Link
    //       to="/dashboard/doctor-management"
    //       className="flex items-center gap-3 hover:text-gray-300"
    //     >
    //       <Boxes size={20} />
    //       Doctor Management
    //     </Link>
    //     <Link
    //       to="/dashboard/add-doctor"
    //       className="flex items-center gap-3 hover:text-gray-300"
    //     >
    //       <UserPlus size={20} />
    //       Add-Doctor
    //     </Link>
    //     <Link
    //       to="/dashboard/user-management"
    //       className="flex items-center gap-3 hover:text-gray-300"
    //     >
    //       <User size={20} />
    //       User Management
    //     </Link>
    //     <Link
    //       to="/dashboard/all-appoinments"
    //       className="flex items-center gap-3 hover:text-gray-300"
    //     >
    //       <BookImageIcon size={20} />
    //       All Appointments
    //     </Link>
    //   </nav>
    // </aside>
    <aside className="h-screen w-full bg-gray-800 text-white px-4 py-6 flex flex-col justify-between">
      {/* Top section */}
      <div>
        <div className="text-2xl font-bold mb-10">Admin Dashboard</div>
      <div className="mb-5">
          <Link
          to="/dashboard/adminhome"
          className="flex items-center gap-3 hover:text-gray-300"
        >
          <Home size={20} />
          Admin Home
        </Link>
      </div>
        <nav className="space-y-4">
          <Link
            to="/dashboard/doctor-management"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <Boxes size={20} />
            Doctor Management
          </Link>
          <Link
            to="/dashboard/add-doctor"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <UserPlus size={20} />
            Add-Doctor
          </Link>
          <Link
            to="/dashboard/user-management"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <User size={20} />
            User Management
          </Link>
          <Link
            to="/dashboard/all-appoinments"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <BookImageIcon size={20} />
            All Appointments
          </Link>
        </nav>
      </div>

      {/* Bottom Home link */}
      <div className="pt-10">
        <Link to="/" className="flex items-center gap-3 hover:text-gray-300">
          <Home size={20} />
          Home
        </Link>
      </div>
    </aside>
  );
}

export default AdminDashboard;
