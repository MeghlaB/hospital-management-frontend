import React from 'react'

import Appointment from '../Ui/Home-journal/createAppoinment'
import BannerWithNavbar from '../Ui/BannerWithNavbar'
import Testimonials from '../Testimonials/Testimonilas'

function Home() {
  return (
    <div>
      {/* <BannerWithNavbar/> */}
      <Appointment/>
      <Testimonials/>
    </div>
  )
}

export default Home
