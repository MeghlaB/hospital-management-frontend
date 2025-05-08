import React from "react";

import Appointment from "../Ui/Home-journal/createAppoinment";
import BannerWithNavbar from "../Ui/BannerWithNavbar";
import Testimonials from "../Testimonials/Testimonilas";
import { Banner } from "../Header/Banner";
import UseAuth from "../../Hooks/UseAuth";
function Home() {
  return (
    <div>
          <Banner />
          <Appointment />
          <Testimonials />

    </div>
  );
}

export default Home;