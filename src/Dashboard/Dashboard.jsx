import React from 'react'
import UserDashboard from '../Components/Ui/UserDashboard';
import AdminDashboard from '../Components/Ui/AdminDashboard';

export default function Dashboard({children}) {
    const isAdmin = 'admin'
  return (
    <div>
      <div>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[250px] fixed h-full bg-gray-100">
        {isAdmin ? <AdminDashboard/>:<UserDashboard/>}
          {/* <SellerSidebar /> */}
        </div>

        {/* Main Content */}
        <div className="md:ml-[250px] w-full">
          
          <main className="pt-6 px-6">{children}</main>
        </div>
      </div>
    </div>
    </div>
  )
}
