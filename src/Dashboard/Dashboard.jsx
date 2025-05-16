import React, { useState } from 'react'
import UserDashboard from '../Components/Ui/UserDashboard';
import AdminDashboard from '../Components/Ui/AdminDashboard';
import { Outlet } from 'react-router-dom';
import UseAdmin from '../Hooks/UseAdmin';
import { ImCross, ImMenu } from 'react-icons/im';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAdmin,loading] = UseAdmin()
    console.log(isAdmin)

if (loading) {
  return <div>Loading...</div>;
}

     const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className={`flex h-screen `}>
      {/* Sidebar */}
      <div
        className={`fixed top-0 bg-gray-800 text-white left-0 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 w-80 min-h-screen p-4 `}
      >
        {/* Close Button */}
        <button
          onClick={toggleSidebar}
          className={`btn bg-red-950 text-white btn-sm absolute top-2 right-4`}
        >
          <ImCross />
        </button>

        {/* Sidebar Content */}
          {isAdmin ? <AdminDashboard/>:<UserDashboard/>}
      </div>

      {/* Main Content */}
      <div className={`flex-1 `}>
        {/* Drawer Toggle Button */}
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="btn bg-red-950 text-white drawer-button"
          >
            <ImMenu />
          </button>
        </div>

        {/* Outlet for Nested Routes */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
