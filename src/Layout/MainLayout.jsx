import React from "react";

import { Outlet} from "react-router-dom";
import BannerWithNavbar from "../Components/Ui/BannerWithNavbar";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Ui/Navbar";


function MainLayout() {
  // const location = useLocation();
  // const isHome = location.pathname === "/";
  // const noheaderFooter = ["/login", "/register"].some((path) =>
  //   location.pathname.includes(path)
  // );
 
  return (
    <div>
    <Navbar/>
      {/* {!noheaderFooter && (isHome ?<BannerWithNavbar/> :<Navbar/>)} */}
      <div className="min-h-[calc(100vh-288px)] mb-15 ">
        <Outlet />
      </div>
      <Footer/>
      {/* {!noheaderFooter && <Footer />} */}
    </div>
  );
}

export default MainLayout;
