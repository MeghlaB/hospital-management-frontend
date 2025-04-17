import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Components/Home/Home";
import Appoinment from "../Components/Appoinmnet/Appoinment";
import DoctorList from "../Components/AllDocotrList/DoctorList";
import Contacts from "../Components/Contacts/Contacts";
import About from "../Components/About/About";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import Privetroutes from "./Privetroutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contacts />,
      },
      {
        path: "/doctor-list",
        element: <DoctorList />,
      },
      {
        path: "/doctor-appointment-booking",
        element: <Privetroutes><Appoinment /></Privetroutes>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default router;
