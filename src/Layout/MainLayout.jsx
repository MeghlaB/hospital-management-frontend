import React from 'react'

import Home from '../Components/Home/Home'
import { Outlet, useLocation } from 'react-router-dom'
import BannerWithNavbar from '../Components/Ui/BannerWithNavbar'
import Navbar from '../Components/Ui/navbar'


function MainLayout() {
    const location = useLocation()
    const isHome = location.pathname === '/'
  return (
    <div>

{isHome ?<BannerWithNavbar/> :<Navbar/>}
    <Outlet/>
    
    </div>
  )
}

export default MainLayout
