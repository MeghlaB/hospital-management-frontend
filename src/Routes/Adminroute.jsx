import React from "react";
import UseAdmin from "../Hooks/UseAdmin";
import UseAuth from "../Hooks/UseAuth";
import { Navigate } from "react-router-dom";

function Adminroute({ children }) {
  const { user, isloading } = UseAuth();
  const [isAdmin, isAdminPending] = UseAdmin();

  if (isloading || isAdminPending) {
    return (
      <div className="flex items-center justify-center mt-24">
        <span className=" loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to={"/login"}></Navigate>;
}

export default Adminroute;
