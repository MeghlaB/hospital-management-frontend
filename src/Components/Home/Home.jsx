import React from "react";

import Appointment from "../Ui/Home-journal/createAppoinment";
import BannerWithNavbar from "../Ui/BannerWithNavbar";
import Testimonials from "../Testimonials/Testimonilas";
import { Banner } from "../Header/Banner";
import UseAuth from "../../Hooks/UseAuth";
import Search from "../Searches/Search";
import DoctorSearchSection from "../Searches/Search";
import ChairmanMessage from "../Message/Message";
function Home() {
  return (
    <div>
          <Banner />
          <DoctorSearchSection/>
          <ChairmanMessage/>
          <Appointment />
          <Testimonials />

    </div>
  );
}

export default Home;