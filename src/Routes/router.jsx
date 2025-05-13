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
import UserManagement from "../Dashboard/Admin/UserManagement";
import MyAppoinment from "../Dashboard/User/MyAppoinment";
import QucikBooking from "../Dashboard/User/QucikBooking";
import Overview from "../Dashboard/User/Overview";
import AllApoinments from "../Dashboard/Admin/AllApoinments";
import UserProfile from "../Dashboard/UserProfile";
import Edit from "../Dashboard/Edit";
import AppoinmentDetails from "../Dashboard/Admin/AppoinmentDetails";

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
      // admin dashboard
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
      {
        path: "user-management",
        element: <UserManagement />,
      },
      {
        path: "all-appoinments",
        element: <AllApoinments />,
      },
      {
        path:'all-appoinments/appointments/:id',
        
        element:<AppoinmentDetails/>,
        loader: ({ params }) => fetch(`https://hospital-server-peach.vercel.app/${params.id}`)
      },








      // user dashboard
      // {
      //   path: "overview",
      //   element: <Overview />,
      // },
      {
        path: "my-appoinments",
        element: <MyAppoinment></MyAppoinment>,
      },
      {
        path: "quick-booking",
        element: <QucikBooking />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "user-profile/update/:id",
        element: <Edit></Edit>,
        loader: ({ params }) =>
          fetch(`https://hospital-server-peach.vercel.app/users/${params.id}`),
      },

    ],
  },
]);

export default router;
