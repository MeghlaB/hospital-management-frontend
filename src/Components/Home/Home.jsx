import React from "react";

import Appointment from "../Ui/Home-journal/createAppoinment";
import BannerWithNavbar from "../Ui/BannerWithNavbar";
import Testimonials from "../Testimonials/Testimonilas";
import Banner from '../Header/Banner'
import UseAuth from "../../Hooks/UseAuth";
import Search from "../Searches/Search";
import DoctorSearchSection from "../Searches/Search";
import ChairmanMessage from "../Message/Message";
import FeaturedDoctors from "../FeaturedDoctors/FeaturedDoctors";
import OurServices from "../ourServices/ourServices";
import Testimonial from "../Testimonial/Testimonial";
function Home() {
  return (
    <div>
          <Banner/>
          <DoctorSearchSection/>
          <ChairmanMessage/>
          <FeaturedDoctors/>
          <OurServices/>
          <Testimonial/>
          {/* <Appointment />
          <Testimonials /> */}

    </div>
  );
}

export default Home;