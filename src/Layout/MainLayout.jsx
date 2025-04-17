import React from 'react'

import Home from '../Components/Home/Home'
import { Outlet, useLocation } from 'react-router-dom'
import BannerWithNavbar from '../Components/Ui/BannerWithNavbar'
import Navbar from '../Components/Ui/navbar'
import Footer from '../Components/Footer/Footer'


function MainLayout() {
    const location = useLocation()
    const isHome = location.pathname === '/'
    const noheaderFooter = ['/login','/register'].some(path=>location.pathname.includes(path))
    console.log(isHome ,noheaderFooter)
  return (
    <div>

{!noheaderFooter && (isHome ?<BannerWithNavbar/> :<Navbar/>)}
    <Outlet/>
 {!noheaderFooter &&    <Footer/>}
    </div>
  )
}

export default MainLayout
