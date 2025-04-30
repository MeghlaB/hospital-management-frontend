import React from 'react'
import UserDashboard from '../Components/Ui/UserDashboard';
import AdminDashboard from '../Components/Ui/AdminDashboard';
import { Outlet } from 'react-router-dom';
import UseAdmin from '../Hooks/UseAdmin';

export default function Dashboard() {
    const [isAdmin] = UseAdmin()
    console.log(isAdmin)
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
          
          <main className="pt-6 px-6">

          <Outlet/>
          </main>
        </div>
      </div>
    </div>
    </div>
  )
}
