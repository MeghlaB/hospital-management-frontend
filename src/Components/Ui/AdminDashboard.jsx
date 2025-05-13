import {
  BarChart2,
  BookImageIcon,
  Boxes,
  Home,
  User,
  UserPlus,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <aside className="h-full w-full bg-gray-800 text-white px-4 py-6">
      <div className="text-2xl font-bold mb-10">Admin</div>

      <div className="pb-4">
        <Link to="/dashboard" className="flex items-center gap-3 hover:text-gray-300">
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
    </aside>
  );
}

export default AdminDashboard;
