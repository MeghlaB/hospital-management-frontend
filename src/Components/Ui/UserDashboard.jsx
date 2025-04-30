import { BookIcon, Home, LayoutDashboard, Bell, CalendarCheck2, Timer } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function UserDashboard() {
  return (
    <aside className="h-screen w-[250px] bg-gray-800 text-white px-4 py-6 hidden md:flex flex-col justify-between fixed top-0 left-0 z-40">
      {/* Header */}
      <div>
        <div className="text-2xl font-bold mb-10">UserDashboard</div>

        {/* Dashboard Links */}
        <nav className="space-y-4">
          <Link
            to="/dashboard/overview"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <LayoutDashboard size={20} />
            Overview
          </Link>

          <Link
            to="/dashboard/my-appoinments"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <BookIcon size={20} />
            My-Appoinments
          </Link>

          <Link
            to="/dashboard/quick-booking"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <CalendarCheck2 size={20} />
            Quick Booking
          </Link>

          <Link
            to="/dashboard/notifications"
            className="flex items-center gap-3 hover:text-gray-300"
          >
            <Bell size={20} />
            Notifications
          </Link>
        </nav>
      </div>

      {/* Home Link at Bottom */}
      <div>
        <Link
          to="/"
          className="flex items-center gap-3 hover:text-gray-300"
        >
          <Home size={20} />
      Home
        </Link>
      </div>
    </aside>
  );
}

export default UserDashboard;
