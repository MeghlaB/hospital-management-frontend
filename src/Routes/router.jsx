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
import Dashboard from "../Dashboard/Dashboard";
import AdminHome from "../Dashboard/Admin/AdminHome";
import DoctorManagement from "../Dashboard/Admin/DoctorManagement";
import AddDoctor from "../Dashboard/Admin/AddDoctor";
import DoctorDetails from "../Components/DoctorDetails/DoctorDetails";

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
        element: (
          <Privetroutes>
            <Appoinment />
          </Privetroutes>
        ),
      },
      {
        path: "/doctors/:id",
        element: (
          <Privetroutes>
            <DoctorDetails />
          </Privetroutes>
        ),
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
  {
    path: "/dashboard",
    element: (
      <Privetroutes>
        <Dashboard />
      </Privetroutes>
    ),
    children: [
      {
        path: "",
        element: <AdminHome />,
      },
      {
        path: "doctor-management",
        element: <DoctorManagement />,
      },
      {
        path: "add-doctor",
        element: <AddDoctor />,
      },
    ],
  },
]);

export default router;
